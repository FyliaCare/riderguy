import { Router } from 'express';
import { TrainingController } from '../controllers/training.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new TrainingController();

router.post('/:courseId/generate', authenticate, controller.getCertificate);

export { router as certificateRoutes };
