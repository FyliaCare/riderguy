import { Router } from 'express';
import { TrainingController } from '../controllers/training.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new TrainingController();

router.get('/', controller.getCourses);
router.get('/:courseId', controller.getCourse);
router.post('/:courseId/enroll', authenticate, controller.enrollCourse);

export { router as courseRoutes };
