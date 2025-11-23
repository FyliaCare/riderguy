import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    riderId?: string;
    email: string;
    role: string;
  };
}

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const taskData = req.body;
      const task = await this.taskService.createTask(taskData);

      logger.info(`Task created: ${task.id || task.task_id}`);

      res.status(201).json({
        success: true,
        data: task,
        message: 'Task created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { status, riderId, clientId, limit = 50, offset = 0 } = req.query;

      const tasks = await this.taskService.getTasks({
        status: status as string,
        riderId: riderId as string,
        clientId: clientId as string,
        limit: Number(limit),
        offset: Number(offset)
      });

      res.json({
        success: true,
        data: tasks
      });
    } catch (error) {
      next(error);
    }
  };

  getTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const task = await this.taskService.getTask(taskId);

      if (!task) {
        throw new ApiError(404, 'Task not found');
      }

      res.json({
        success: true,
        data: task
      });
    } catch (error) {
      next(error);
    }
  };

  assignTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const { riderId } = req.body;

      const task = await this.taskService.assignTask(taskId, riderId);

      logger.info(`Task ${taskId} assigned to rider ${riderId}`);

      res.json({
        success: true,
        data: task,
        message: 'Task assigned successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  acceptTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Rider authentication required');
      }

      const task = await this.taskService.acceptTask(taskId, riderId);

      logger.info(`Task ${taskId} accepted by rider ${riderId}`);

      res.json({
        success: true,
        data: task,
        message: 'Task accepted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  startTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Rider authentication required');
      }

      const task = await this.taskService.startTask(taskId, riderId);

      logger.info(`Task ${taskId} started by rider ${riderId}`);

      res.json({
        success: true,
        data: task,
        message: 'Task started successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  arriveAtPickup = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Rider authentication required');
      }

      const task = await this.taskService.arriveAtPickup(taskId, riderId);

      logger.info(`Rider ${riderId} arrived at pickup for task ${taskId}`);

      res.json({
        success: true,
        data: task,
        message: 'Arrived at pickup location'
      });
    } catch (error) {
      next(error);
    }
  };

  pickupComplete = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const riderId = req.user?.riderId;
      const { notes, photo } = req.body;

      if (!riderId) {
        throw new ApiError(401, 'Rider authentication required');
      }

      const task = await this.taskService.pickupComplete(taskId, riderId, { notes, photo });

      logger.info(`Pickup complete for task ${taskId}`);

      res.json({
        success: true,
        data: task,
        message: 'Pickup completed successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  arriveAtDelivery = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Rider authentication required');
      }

      const task = await this.taskService.arriveAtDelivery(taskId, riderId);

      logger.info(`Rider ${riderId} arrived at delivery for task ${taskId}`);

      res.json({
        success: true,
        data: task,
        message: 'Arrived at delivery location'
      });
    } catch (error) {
      next(error);
    }
  };

  completeTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const riderId = req.user?.riderId;
      const { notes, photo, signature, otp } = req.body;

      if (!riderId) {
        throw new ApiError(401, 'Rider authentication required');
      }

      const task = await this.taskService.completeTask(taskId, riderId, {
        notes,
        photo,
        signature,
        otp
      });

      logger.info(`Task ${taskId} completed by rider ${riderId}`);

      res.json({
        success: true,
        data: task,
        message: 'Task completed successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  cancelTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const { reason, cancelledBy } = req.body;

      const task = await this.taskService.cancelTask(taskId, reason, cancelledBy);

      logger.info(`Task ${taskId} cancelled: ${reason}`);

      res.json({
        success: true,
        data: task,
        message: 'Task cancelled successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  getTaskHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const history = await this.taskService.getTaskHistory(taskId);

      res.json({
        success: true,
        data: history
      });
    } catch (error) {
      next(error);
    }
  };

  rateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const { rating, review, ratedBy } = req.body;

      const task = await this.taskService.rateTask(taskId, rating, review, ratedBy);

      logger.info(`Task ${taskId} rated: ${rating}/5`);

      res.json({
        success: true,
        data: task,
        message: 'Rating submitted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}
