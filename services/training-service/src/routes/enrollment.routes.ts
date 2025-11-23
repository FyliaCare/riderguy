import { Router } from 'express';
import { TrainingController } from '../controllers/training.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new TrainingController();

router.get('/', authenticate, controller.getProgress);
router.get('/:courseId', authenticate, controller.getProgress);

export { router as enrollmentRoutes };
