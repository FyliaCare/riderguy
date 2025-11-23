import { Router } from 'express';
import { TrainingController } from '../controllers/training.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new TrainingController();

router.put('/:courseId/lessons/:lessonId', authenticate, controller.updateProgress);
router.post('/:courseId/quizzes/:quizId/submit', authenticate, controller.submitQuiz);

export { router as progressRoutes };
