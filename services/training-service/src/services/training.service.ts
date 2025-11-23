import { Pool } from 'pg';
import { Kafka } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '@riderguy/shared-types';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const kafka = new Kafka({ clientId: 'training-service', brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',') });
const producer = kafka.producer();

export class TrainingService {
  async getCourses(filters?: { category?: string; required?: boolean; limit?: number; offset?: number }) {
    const { category, required, limit = 50, offset = 0 } = filters || {};
    
    let query = 'SELECT * FROM courses WHERE 1=1';
    const values: any[] = [];
    let paramCount = 1;

    if (category) {
      query += ` AND category = $${paramCount++}`;
      values.push(category);
    }

    if (required !== undefined) {
      query += ` AND is_required = $${paramCount++}`;
      values.push(required);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount++} OFFSET $${paramCount}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows;
  }

  async getCourse(courseId: string) {
    const result = await pool.query(
      `SELECT c.*, 
              json_agg(
                json_build_object(
                  'lessonId', l.lesson_id,
                  'title', l.title,
                  'type', l.type,
                  'duration', l.duration_minutes,
                  'order', l.order_index
                ) ORDER BY l.order_index
              ) as lessons
       FROM courses c
       LEFT JOIN course_lessons l ON c.course_id = l.course_id
       WHERE c.course_id = $1
       GROUP BY c.course_id`,
      [courseId]
    );

    return result.rows[0] || null;
  }

  async enrollRider(riderId: string, courseId: string) {
    // Check if already enrolled
    const existing = await pool.query(
      'SELECT * FROM training_progress WHERE rider_id = $1 AND course_id = $2',
      [riderId, courseId]
    );

    if (existing.rows.length > 0) {
      return existing.rows[0];
    }

    const result = await pool.query(
      `INSERT INTO training_progress (rider_id, course_id, status, enrolled_at)
       VALUES ($1, $2, 'enrolled', NOW())
       RETURNING *`,
      [riderId, courseId]
    );

    logger.info(`Rider ${riderId} enrolled in course ${courseId}`);

    return result.rows[0];
  }

  async updateProgress(riderId: string, courseId: string, lessonId: string, completed: boolean) {
    // Update lesson completion
    await pool.query(
      `INSERT INTO lesson_progress (rider_id, course_id, lesson_id, completed, completed_at)
       VALUES ($1, $2, $3, $4, CASE WHEN $4 THEN NOW() ELSE NULL END)
       ON CONFLICT (rider_id, course_id, lesson_id)
       DO UPDATE SET completed = $4, completed_at = CASE WHEN $4 THEN NOW() ELSE NULL END`,
      [riderId, courseId, lessonId, completed]
    );

    // Calculate overall progress
    const progressResult = await pool.query(
      `SELECT 
        COUNT(*) as total_lessons,
        COUNT(*) FILTER (WHERE lp.completed = true) as completed_lessons
       FROM course_lessons cl
       LEFT JOIN lesson_progress lp ON cl.lesson_id = lp.lesson_id AND lp.rider_id = $1
       WHERE cl.course_id = $2`,
      [riderId, courseId]
    );

    const { total_lessons, completed_lessons } = progressResult.rows[0];
    const progressPercentage = (parseInt(completed_lessons) / parseInt(total_lessons)) * 100;

    // Update training progress
    await pool.query(
      `UPDATE training_progress 
       SET progress_percentage = $3, 
           status = CASE WHEN $3 >= 100 THEN 'completed' ELSE 'in_progress' END,
           completed_at = CASE WHEN $3 >= 100 THEN NOW() ELSE NULL END
       WHERE rider_id = $1 AND course_id = $2`,
      [riderId, courseId, progressPercentage]
    );

    // If course completed, trigger certificate generation and events
    if (progressPercentage >= 100) {
      await this.handleCourseCompletion(riderId, courseId);
    }

    return { progressPercentage, completedLessons: parseInt(completed_lessons), totalLessons: parseInt(total_lessons) };
  }

  async submitQuiz(riderId: string, courseId: string, quizId: string, answers: any[]) {
    // Get quiz questions
    const quizResult = await pool.query(
      'SELECT * FROM course_quizzes WHERE quiz_id = $1',
      [quizId]
    );

    if (quizResult.rows.length === 0) {
      throw new ApiError(404, 'Quiz not found');
    }

    const quiz = quizResult.rows[0];
    const questions = quiz.questions;

    // Calculate score
    let correctAnswers = 0;
    answers.forEach((answer, index) => {
      if (questions[index] && questions[index].correctAnswer === answer.answer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / questions.length) * 100;
    const passed = score >= (quiz.passing_score || 70);

    // Save quiz attempt
    const attemptResult = await pool.query(
      `INSERT INTO quiz_attempts (rider_id, course_id, quiz_id, score, passed, answers, attempted_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [riderId, courseId, quizId, score, passed, JSON.stringify(answers)]
    );

    logger.info(`Quiz attempt by rider ${riderId}: ${score}% (${passed ? 'PASSED' : 'FAILED'})`);

    return {
      ...attemptResult.rows[0],
      correctAnswers,
      totalQuestions: questions.length
    };
  }

  async getProgress(riderId: string, courseId?: string) {
    let query = `
      SELECT tp.*, c.title as course_title, c.description, c.duration_hours,
             (SELECT COUNT(*) FROM lesson_progress lp 
              WHERE lp.rider_id = tp.rider_id AND lp.course_id = tp.course_id AND lp.completed = true) as completed_lessons,
             (SELECT COUNT(*) FROM course_lessons cl WHERE cl.course_id = tp.course_id) as total_lessons
      FROM training_progress tp
      JOIN courses c ON tp.course_id = c.course_id
      WHERE tp.rider_id = $1
    `;

    const values = [riderId];

    if (courseId) {
      query += ' AND tp.course_id = $2';
      values.push(courseId);
    }

    query += ' ORDER BY tp.enrolled_at DESC';

    const result = await pool.query(query, values);
    return courseId ? result.rows[0] : result.rows;
  }

  async generateCertificate(riderId: string, courseId: string) {
    // Check if course is completed
    const progress = await pool.query(
      'SELECT * FROM training_progress WHERE rider_id = $1 AND course_id = $2 AND status = $3',
      [riderId, courseId, 'completed']
    );

    if (progress.rows.length === 0) {
      throw new ApiError(400, 'Course not completed');
    }

    // Check if certificate already exists
    const existing = await pool.query(
      'SELECT * FROM certificates WHERE rider_id = $1 AND course_id = $2',
      [riderId, courseId]
    );

    if (existing.rows.length > 0) {
      return existing.rows[0];
    }

    const certificateId = uuidv4();
    const certificateNumber = `RG-${Date.now()}-${riderId.substring(0, 8)}`;

    // In production, generate actual PDF certificate and upload to S3
    const certificateUrl = `https://certificates.riderguy.com/${certificateId}.pdf`;

    const result = await pool.query(
      `INSERT INTO certificates (certificate_id, rider_id, course_id, certificate_number, certificate_url, issued_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [certificateId, riderId, courseId, certificateNumber, certificateUrl]
    );

    logger.info(`Certificate generated for rider ${riderId}, course ${courseId}`);

    return result.rows[0];
  }

  private async handleCourseCompletion(riderId: string, courseId: string) {
    // Generate certificate
    await this.generateCertificate(riderId, courseId);

    // Award XP
    const courseResult = await pool.query('SELECT xp_reward FROM courses WHERE course_id = $1', [courseId]);
    const xpReward = courseResult.rows[0]?.xp_reward || 100;

    // Publish event
    await producer.connect();
    await producer.send({
      topic: 'training.completed',
      messages: [{
        key: riderId,
        value: JSON.stringify({
          riderId,
          courseId,
          xpReward,
          timestamp: new Date()
        })
      }]
    });

    logger.info(`Course completed: rider ${riderId}, course ${courseId}, XP: ${xpReward}`);
  }
}
