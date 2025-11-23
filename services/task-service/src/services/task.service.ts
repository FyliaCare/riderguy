import { Pool } from 'pg';
import Redis from 'ioredis';
import { Kafka } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { Task, TaskCreateData } from '../types/task.types';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const kafka = new Kafka({
  clientId: 'task-service',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});
const producer = kafka.producer();

export class TaskService {
  async createTask(taskData: TaskCreateData): Promise<Task> {
    const taskId = uuidv4();
    
    const {
      type,
      clientId,
      pickupLocation,
      deliveryLocation,
      packageDetails,
      scheduledPickupTime,
      priority = 'normal',
      metadata
    } = taskData;

    // Calculate SLA based on priority
    const slaMinutes = priority === 'urgent' ? 60 : priority === 'high' ? 120 : 240;
    const slaTime = dayjs().add(slaMinutes, 'minutes').toDate();

    const result = await pool.query(
      `INSERT INTO tasks (
        task_id, type, client_id, pickup_location, delivery_location,
        package_details, scheduled_pickup_time, priority, sla_time,
        status, metadata, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', $10, NOW())
      RETURNING *`,
      [
        taskId,
        type,
        clientId,
        JSON.stringify(pickupLocation),
        JSON.stringify(deliveryLocation),
        JSON.stringify(packageDetails),
        scheduledPickupTime,
        priority,
        slaTime,
        JSON.stringify(metadata || {})
      ]
    );

    const task = result.rows[0];

    // Publish event
    await producer.connect();
    await producer.send({
      topic: 'task.created',
      messages: [{
        key: taskId,
        value: JSON.stringify(task)
      }]
    });

    logger.info(`Task created: ${taskId}, type: ${type}, priority: ${priority}`);

    return task;
  }

  async getTasks(filters: {
    status?: string;
    riderId?: string;
    clientId?: string;
    limit: number;
    offset: number;
  }): Promise<Task[]> {
    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (filters.status) {
      conditions.push(`status = $${paramCount++}`);
      values.push(filters.status);
    }

    if (filters.riderId) {
      conditions.push(`rider_id = $${paramCount++}`);
      values.push(filters.riderId);
    }

    if (filters.clientId) {
      conditions.push(`client_id = $${paramCount++}`);
      values.push(filters.clientId);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    
    values.push(filters.limit, filters.offset);

    const result = await pool.query(
      `SELECT * FROM tasks 
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramCount++} OFFSET $${paramCount}`,
      values
    );

    return result.rows;
  }

  async getTask(taskId: string): Promise<Task | null> {
    const result = await pool.query(
      `SELECT * FROM tasks WHERE task_id = $1`,
      [taskId]
    );

    return result.rows[0] || null;
  }

  async assignTask(taskId: string, riderId: string): Promise<Task> {
    const result = await pool.query(
      `UPDATE tasks 
       SET rider_id = $2, status = 'assigned', assigned_at = NOW()
       WHERE task_id = $1
       RETURNING *`,
      [taskId, riderId]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Task not found');
    }

    const task = result.rows[0];

    await this.addTaskHistory(taskId, 'assigned', `Task assigned to rider ${riderId}`);
    await this.publishTaskEvent('task.assigned', task);

    return task;
  }

  async acceptTask(taskId: string, riderId: string): Promise<Task> {
    const task = await this.getTask(taskId);

    if (!task) {
      throw new ApiError(404, 'Task not found');
    }

    const taskRiderId = task.rider_id || task.riderId;
    if (taskRiderId !== riderId) {
      throw new ApiError(403, 'Task not assigned to this rider');
    }

    if (task.status !== 'assigned') {
      throw new ApiError(400, 'Task cannot be accepted in current status');
    }

    const result = await pool.query(
      `UPDATE tasks 
       SET status = 'accepted', accepted_at = NOW()
       WHERE task_id = $1
       RETURNING *`,
      [taskId]
    );

    const updatedTask = result.rows[0];

    await this.addTaskHistory(taskId, 'accepted', `Task accepted by rider ${riderId}`);
    await this.publishTaskEvent('task.accepted', updatedTask);

    return updatedTask;
  }

  async startTask(taskId: string, riderId: string): Promise<Task> {
    const result = await pool.query(
      `UPDATE tasks 
       SET status = 'in_progress', started_at = NOW()
       WHERE task_id = $1 AND rider_id = $2
       RETURNING *`,
      [taskId, riderId]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Task not found or not assigned to rider');
    }

    const task = result.rows[0];

    await this.addTaskHistory(taskId, 'in_progress', 'Task started');
    await this.publishTaskEvent('task.started', task);

    return task;
  }

  async arriveAtPickup(taskId: string, riderId: string): Promise<Task> {
    const result = await pool.query(
      `UPDATE tasks 
       SET status = 'arrived_pickup', arrived_pickup_at = NOW()
       WHERE task_id = $1 AND rider_id = $2
       RETURNING *`,
      [taskId, riderId]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Task not found');
    }

    const task = result.rows[0];

    await this.addTaskHistory(taskId, 'arrived_pickup', 'Arrived at pickup location');
    await this.publishTaskEvent('task.arrived_pickup', task);

    return task;
  }

  async pickupComplete(taskId: string, riderId: string, data: { notes?: string; photo?: string }): Promise<Task> {
    const result = await pool.query(
      `UPDATE tasks 
       SET status = 'picked_up', 
           picked_up_at = NOW(),
           pickup_notes = $3,
           pickup_photo = $4
       WHERE task_id = $1 AND rider_id = $2
       RETURNING *`,
      [taskId, riderId, data.notes, data.photo]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Task not found');
    }

    const task = result.rows[0];

    await this.addTaskHistory(taskId, 'picked_up', 'Package picked up');
    await this.publishTaskEvent('task.picked_up', task);

    return task;
  }

  async arriveAtDelivery(taskId: string, riderId: string): Promise<Task> {
    const result = await pool.query(
      `UPDATE tasks 
       SET status = 'arrived_delivery', arrived_delivery_at = NOW()
       WHERE task_id = $1 AND rider_id = $2
       RETURNING *`,
      [taskId, riderId]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Task not found');
    }

    const task = result.rows[0];

    await this.addTaskHistory(taskId, 'arrived_delivery', 'Arrived at delivery location');
    await this.publishTaskEvent('task.arrived_delivery', task);

    return task;
  }

  async completeTask(
    taskId: string,
    riderId: string,
    data: { notes?: string; photo?: string; signature?: string; otp?: string }
  ): Promise<Task> {
    const result = await pool.query(
      `UPDATE tasks 
       SET status = 'completed',
           completed_at = NOW(),
           delivery_notes = $3,
           delivery_photo = $4,
           delivery_signature = $5,
           delivery_otp = $6
       WHERE task_id = $1 AND rider_id = $2
       RETURNING *`,
      [taskId, riderId, data.notes, data.photo, data.signature, data.otp]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Task not found');
    }

    const task = result.rows[0];

    // Calculate performance metrics
    const startTime = dayjs(task.started_at);
    const endTime = dayjs(task.completed_at);
    const duration = endTime.diff(startTime, 'minutes');
    const onTime = dayjs(task.completed_at).isBefore(task.sla_time);

    await pool.query(
      `UPDATE tasks 
       SET duration_minutes = $2, completed_on_time = $3
       WHERE task_id = $1`,
      [taskId, duration, onTime]
    );

    await this.addTaskHistory(taskId, 'completed', 'Task completed successfully');
    await this.publishTaskEvent('task.completed', { ...task, duration_minutes: duration, completed_on_time: onTime });

    return task;
  }

  async cancelTask(taskId: string, reason: string, cancelledBy: string): Promise<Task> {
    const result = await pool.query(
      `UPDATE tasks 
       SET status = 'cancelled',
           cancelled_at = NOW(),
           cancellation_reason = $2,
           cancelled_by = $3
       WHERE task_id = $1
       RETURNING *`,
      [taskId, reason, cancelledBy]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Task not found');
    }

    const task = result.rows[0];

    await this.addTaskHistory(taskId, 'cancelled', `Task cancelled: ${reason}`);
    await this.publishTaskEvent('task.cancelled', task);

    return task;
  }

  async rateTask(taskId: string, rating: number, review?: string, ratedBy?: string): Promise<Task> {
    if (rating < 1 || rating > 5) {
      throw new ApiError(400, 'Rating must be between 1 and 5');
    }

    const result = await pool.query(
      `UPDATE tasks 
       SET rating = $2, review = $3, rated_by = $4, rated_at = NOW()
       WHERE task_id = $1
       RETURNING *`,
      [taskId, rating, review, ratedBy]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Task not found');
    }

    const task = result.rows[0];

    await this.publishTaskEvent('task.rated', task);

    return task;
  }

  async getTaskHistory(taskId: string) {
    const result = await pool.query(
      `SELECT * FROM task_history 
       WHERE task_id = $1 
       ORDER BY created_at ASC`,
      [taskId]
    );

    return result.rows;
  }

  private async addTaskHistory(taskId: string, status: string, notes: string) {
    await pool.query(
      `INSERT INTO task_history (task_id, status, notes, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [taskId, status, notes]
    );
  }

  private async publishTaskEvent(topic: string, task: any) {
    try {
      await producer.connect();
      await producer.send({
        topic,
        messages: [{
          key: task.task_id,
          value: JSON.stringify(task)
        }]
      });
    } catch (error) {
      logger.error(`Failed to publish event ${topic}:`, error);
    }
  }
}
