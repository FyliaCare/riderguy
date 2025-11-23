import { Pool } from 'pg';
import Redis from 'ioredis';
import { Kafka } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const kafka = new Kafka({ clientId: 'xp-service', brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',') });
const producer = kafka.producer();

export class XPService {
  async awardXP(riderId: string, amount: number, source: string, reference?: string, metadata?: any) {
    const eventId = uuidv4();

    // Anti-fraud check: limit XP per hour
    const hourKey = `xp:limit:${riderId}:${new Date().getHours()}`;
    const currentHourXP = await redis.get(hourKey);
    const maxXPPerHour = 1000;

    if (currentHourXP && parseInt(currentHourXP) + amount > maxXPPerHour) {
      logger.warn(`XP limit reached for rider ${riderId}`);
      throw new ApiError(429, 'XP earning limit reached. Try again later.');
    }

    // Record XP event
    await pool.query(
      `INSERT INTO xp_events (event_id, rider_id, xp_amount, source, reference, metadata, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [eventId, riderId, amount, source, reference, JSON.stringify(metadata || {})]
    );

    // Update rider XP
    const result = await pool.query(
      `UPDATE riders 
       SET current_xp = current_xp + $2,
           lifetime_xp = lifetime_xp + $2
       WHERE rider_id = $1
       RETURNING current_xp, current_level, lifetime_xp`,
      [riderId, amount]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Rider not found');
    }

    const { current_xp, current_level } = result.rows[0];

    // Update hourly limit
    await redis.incrby(hourKey, amount);
    await redis.expire(hourKey, 3600);

    // Check for level up
    const newLevel = await this.checkLevelUp(riderId, current_xp, current_level);

    logger.info(`XP awarded: ${amount} to rider ${riderId}, source: ${source}`);

    return {
      eventId,
      xpAwarded: amount,
      totalXP: current_xp,
      currentLevel: newLevel || current_level,
      leveledUp: !!newLevel
    };
  }

  async checkLevelUp(riderId: string, currentXP: number, currentLevel: number) {
    // Get next level requirements
    const nextLevelResult = await pool.query(
      'SELECT * FROM levels WHERE level_number = $1',
      [currentLevel + 1]
    );

    if (nextLevelResult.rows.length === 0) {
      return null; // Max level reached
    }

    const nextLevel = nextLevelResult.rows[0];

    if (currentXP >= nextLevel.required_xp) {
      // Level up!
      await pool.query(
        'UPDATE riders SET current_level = $2 WHERE rider_id = $1',
        [riderId, nextLevel.level_number]
      );

      // Award level up rewards
      if (nextLevel.rewards) {
        const rewards = JSON.parse(nextLevel.rewards);
        // Process rewards (bonus XP, badges, etc.)
      }

      // Publish event
      await producer.connect();
      await producer.send({
        topic: 'xp.level_up',
        messages: [{
          key: riderId,
          value: JSON.stringify({
            riderId,
            newLevel: nextLevel.level_number,
            levelName: nextLevel.name,
            rewards: nextLevel.rewards,
            timestamp: new Date()
          })
        }]
      });

      logger.info(`🎉 Level up! Rider ${riderId} reached level ${nextLevel.level_number}`);

      return nextLevel.level_number;
    }

    return null;
  }

  async getRiderXPInfo(riderId: string) {
    const result = await pool.query(
      `SELECT r.current_xp, r.current_level, r.lifetime_xp,
              l.name as level_name, l.badge_icon, l.required_xp,
              (SELECT required_xp FROM levels WHERE level_number = r.current_level + 1) as next_level_xp
       FROM riders r
       JOIN levels l ON r.current_level = l.level_number
       WHERE r.rider_id = $1`,
      [riderId]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Rider not found');
    }

    const data = result.rows[0];
    const xpToNextLevel = data.next_level_xp ? data.next_level_xp - data.current_xp : 0;
    const progressToNextLevel = data.next_level_xp ? (data.current_xp / data.next_level_xp) * 100 : 100;

    return {
      ...data,
      xpToNextLevel,
      progressToNextLevel: Math.min(progressToNextLevel, 100)
    };
  }

  async getXPHistory(riderId: string, limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT * FROM xp_events 
       WHERE rider_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2 OFFSET $3`,
      [riderId, limit, offset]
    );

    return result.rows;
  }

  async getLeaderboard(type: 'global' | 'weekly' | 'monthly' = 'global', limit = 100) {
    let query;

    if (type === 'global') {
      query = `
        SELECT r.rider_id, r.full_name, r.profile_picture_url, r.current_level, r.lifetime_xp,
               l.name as level_name, l.badge_icon
        FROM riders r
        JOIN levels l ON r.current_level = l.level_number
        WHERE r.status = 'active'
        ORDER BY r.lifetime_xp DESC
        LIMIT $1
      `;
    } else if (type === 'weekly') {
      query = `
        SELECT r.rider_id, r.full_name, r.profile_picture_url, r.current_level,
               SUM(xe.xp_amount) as weekly_xp,
               l.name as level_name, l.badge_icon
        FROM riders r
        JOIN xp_events xe ON r.rider_id = xe.rider_id
        JOIN levels l ON r.current_level = l.level_number
        WHERE xe.created_at >= NOW() - INTERVAL '7 days'
        AND r.status = 'active'
        GROUP BY r.rider_id, r.full_name, r.profile_picture_url, r.current_level, l.name, l.badge_icon
        ORDER BY weekly_xp DESC
        LIMIT $1
      `;
    } else {
      query = `
        SELECT r.rider_id, r.full_name, r.profile_picture_url, r.current_level,
               SUM(xe.xp_amount) as monthly_xp,
               l.name as level_name, l.badge_icon
        FROM riders r
        JOIN xp_events xe ON r.rider_id = xe.rider_id
        JOIN levels l ON r.current_level = l.level_number
        WHERE xe.created_at >= NOW() - INTERVAL '30 days'
        AND r.status = 'active'
        GROUP BY r.rider_id, r.full_name, r.profile_picture_url, r.current_level, l.name, l.badge_icon
        ORDER BY monthly_xp DESC
        LIMIT $1
      `;
    }

    const result = await pool.query(query, [limit]);

    return result.rows.map((row, index) => ({
      rank: index + 1,
      ...row
    }));
  }

  async getRiderRank(riderId: string, type: 'global' | 'weekly' = 'global') {
    let query;

    if (type === 'global') {
      query = `
        SELECT COUNT(*) + 1 as rank
        FROM riders
        WHERE lifetime_xp > (SELECT lifetime_xp FROM riders WHERE rider_id = $1)
        AND status = 'active'
      `;
    } else {
      query = `
        WITH weekly_xp AS (
          SELECT rider_id, SUM(xp_amount) as total_xp
          FROM xp_events
          WHERE created_at >= NOW() - INTERVAL '7 days'
          GROUP BY rider_id
        )
        SELECT COUNT(*) + 1 as rank
        FROM weekly_xp
        WHERE total_xp > (SELECT total_xp FROM weekly_xp WHERE rider_id = $1)
      `;
    }

    const result = await pool.query(query, [riderId]);
    return result.rows[0]?.rank || 'Unranked';
  }
}
