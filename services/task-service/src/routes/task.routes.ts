import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new TaskController();

// Task CRUD
router.post('/', authenticate, controller.createTask);
router.get('/', authenticate, controller.getTasks);
router.get('/:taskId', authenticate, controller.getTask);

// Task assignment
router.post('/:taskId/assign', authenticate, controller.assignTask);
router.post('/:taskId/accept', authenticate, controller.acceptTask);

// Task lifecycle
router.post('/:taskId/start', authenticate, controller.startTask);
router.post('/:taskId/arrive-pickup', authenticate, controller.arriveAtPickup);
router.post('/:taskId/pickup-complete', authenticate, controller.pickupComplete);
router.post('/:taskId/arrive-delivery', authenticate, controller.arriveAtDelivery);
router.post('/:taskId/complete', authenticate, controller.completeTask);
router.post('/:taskId/cancel', authenticate, controller.cancelTask);

// Task feedback
router.post('/:taskId/rate', authenticate, controller.rateTask);
router.get('/:taskId/history', authenticate, controller.getTaskHistory);

export { router as taskRoutes };
