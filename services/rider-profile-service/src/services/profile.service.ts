import { Pool } from 'pg';
import Redis from 'ioredis';
import { S3 } from 'aws-sdk';
import { Kafka } from 'kafkajs';
import { Rider } from '@riderguy/shared-types';
import { ApiError } from '../utils/api-error';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const s3 = new S3({ region: process.env.AWS_REGION || 'us-east-1' });

const kafka = new Kafka({
  clientId: 'rider-profile-service',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});
const producer = kafka.producer();

export class ProfileService {
  async getProfile(riderId: string): Promise<Rider | null> {
    // Check cache first
    const cached = await redis.get(`profile:${riderId}`);
    if (cached) {
      return JSON.parse(cached);
    }

    const result = await pool.query(
      `SELECT r.*, 
              json_build_object(
                'totalEarnings', COALESCE(SUM(t.amount), 0),
                'totalTasks', COUNT(DISTINCT ta.task_id),
                'completionRate', 
                  CASE 
                    WHEN COUNT(DISTINCT ta.task_id) > 0 
                    THEN (COUNT(DISTINCT CASE WHEN ta.status = 'completed' THEN ta.task_id END)::float / COUNT(DISTINCT ta.task_id) * 100)
                    ELSE 0 
                  END
              ) as stats
       FROM riders r
       LEFT JOIN transactions t ON r.rider_id = t.rider_id AND t.type = 'earning'
       LEFT JOIN tasks ta ON r.rider_id = ta.rider_id
       WHERE r.rider_id = $1
       GROUP BY r.rider_id`,
      [riderId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const profile = result.rows[0];

    // Cache for 5 minutes
    await redis.setex(`profile:${riderId}`, 300, JSON.stringify(profile));

    return profile;
  }

  async updateProfile(riderId: string, updates: Partial<Rider>): Promise<Rider> {
    const allowedFields = [
      'full_name', 'phone', 'email', 'address', 'city', 'state', 
      'country', 'postal_code', 'date_of_birth', 'gender', 
      'profile_picture_url', 'vehicle_type', 'vehicle_make', 
      'vehicle_model', 'vehicle_year', 'vehicle_plate_number'
    ];

    const setClause = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    if (!setClause) {
      throw new ApiError(400, 'No valid fields to update');
    }

    const values = [
      riderId,
      ...Object.keys(updates)
        .filter(key => allowedFields.includes(key))
        .map(key => updates[key as keyof Rider])
    ];

    const result = await pool.query(
      `UPDATE riders SET ${setClause}, updated_at = NOW() WHERE rider_id = $1 RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Rider not found');
    }

    const profile = result.rows[0];

    // Invalidate cache
    await redis.del(`profile:${riderId}`);

    // Publish event
    await producer.connect();
    await producer.send({
      topic: 'rider.profile.updated',
      messages: [{
        key: riderId,
        value: JSON.stringify({ riderId, updates, timestamp: new Date() })
      }]
    });

    return profile;
  }

  async updateEmergencyContact(
    riderId: string, 
    contact: { name: string; phone: string; relationship: string }
  ): Promise<Rider> {
    const result = await pool.query(
      `UPDATE riders 
       SET emergency_contact = $2, updated_at = NOW() 
       WHERE rider_id = $1 
       RETURNING *`,
      [riderId, JSON.stringify(contact)]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Rider not found');
    }

    await redis.del(`profile:${riderId}`);

    return result.rows[0];
  }

  async updateBankDetails(
    riderId: string,
    bankDetails: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      bankCode: string;
      swiftCode?: string;
    }
  ): Promise<Rider> {
    const result = await pool.query(
      `UPDATE riders 
       SET bank_details = $2, updated_at = NOW() 
       WHERE rider_id = $1 
       RETURNING *`,
      [riderId, JSON.stringify(bankDetails)]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Rider not found');
    }

    await redis.del(`profile:${riderId}`);

    // Publish event for compliance
    await producer.connect();
    await producer.send({
      topic: 'rider.bank.updated',
      messages: [{
        key: riderId,
        value: JSON.stringify({ riderId, timestamp: new Date() })
      }]
    });

    return result.rows[0];
  }

  async getProfileStats(riderId: string) {
    const result = await pool.query(
      `SELECT 
        COUNT(DISTINCT t.task_id) as total_tasks,
        COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.task_id END) as completed_tasks,
        COUNT(DISTINCT CASE WHEN t.status = 'cancelled' THEN t.task_id END) as cancelled_tasks,
        COALESCE(SUM(CASE WHEN tr.type = 'earning' THEN tr.amount ELSE 0 END), 0) as total_earnings,
        COALESCE(AVG(t.rating), 0) as average_rating,
        r.current_level,
        r.current_xp,
        r.total_distance_km
       FROM riders r
       LEFT JOIN tasks t ON r.rider_id = t.rider_id
       LEFT JOIN transactions tr ON r.rider_id = tr.rider_id
       WHERE r.rider_id = $1
       GROUP BY r.rider_id, r.current_level, r.current_xp, r.total_distance_km`,
      [riderId]
    );

    return result.rows[0] || null;
  }
}
