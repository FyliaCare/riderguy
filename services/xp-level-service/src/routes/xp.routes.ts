import { Router } from 'express';
import { XPController } from '../controllers/xp.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new XPController();

router.get('/:riderId', authenticate, controller.getXPInfo);
router.get('/:riderId/history', authenticate, controller.getXPHistory);
router.post('/:riderId/award', authenticate, controller.awardXP);

export { router as xpRoutes };
