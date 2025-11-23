import { Router } from 'express';
import { WelfareController } from '../controllers/welfare.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new WelfareController();

router.post('/request', authenticate, controller.requestEmergencyFund);
router.get('/requests', authenticate, controller.getEmergencyRequests);
router.post('/:requestId/approve', authenticate, controller.approveEmergencyFund);

export { router as emergencyRoutes };
