import { Router } from 'express';
import { WelfareController } from '../controllers/welfare.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new WelfareController();

router.post('/enroll', authenticate, controller.enrollInInsurance);
router.get('/enrollments', authenticate, controller.getEnrollments);
router.post('/claims', authenticate, controller.fileClaim);

export { router as insuranceRoutes };
