import { Request, Response, NextFunction } from 'express';
import { TrainingService } from '../services/training.service';
import { ApiError } from '../utils/api-error';

export class TrainingController {
  private trainingService: TrainingService;

  constructor() {
    this.trainingService = new TrainingService();
  }

  getCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category, required, limit, offset } = req.query;

      const courses = await this.trainingService.getCourses({
        category: category as string,
        required: required === 'true',
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined
      });

      res.json({ success: true, data: courses });
    } catch (error) {
      next(error);
    }
  };

  getCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const course = await this.trainingService.getCourse(courseId);

      if (!course) {
        throw new ApiError(404, 'Course not found');
      }

      res.json({ success: true, data: course });
    } catch (error) {
      next(error);
    }
  };

  enrollCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Rider authentication required');
      }

      const enrollment = await this.trainingService.enrollRider(riderId, courseId);

      res.status(201).json({
        success: true,
        data: enrollment,
        message: 'Successfully enrolled in course'
      });
    } catch (error) {
      next(error);
    }
  };

  updateProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, lessonId } = req.params;
      const { completed } = req.body;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Rider authentication required');
      }

      const progress = await this.trainingService.updateProgress(riderId, courseId, lessonId, completed);

      res.json({
        success: true,
        data: progress,
        message: completed ? 'Lesson marked as completed' : 'Progress updated'
      });
    } catch (error) {
      next(error);
    }
  };

  submitQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, quizId } = req.params;
      const { answers } = req.body;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Rider authentication required');
      }

      const result = await this.trainingService.submitQuiz(riderId, courseId, quizId, answers);

      res.json({
        success: true,
        data: result,
        message: result.passed ? 'Congratulations! You passed!' : 'Keep trying, you can do it!'
      });
    } catch (error) {
      next(error);
    }
  };

  getProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Rider authentication required');
      }

      const progress = await this.trainingService.getProgress(riderId, courseId);

      res.json({ success: true, data: progress });
    } catch (error) {
      next(error);
    }
  };

  getCertificate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Rider authentication required');
      }

      const certificate = await this.trainingService.generateCertificate(riderId, courseId);

      res.json({
        success: true,
        data: certificate,
        message: 'Certificate generated successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}
