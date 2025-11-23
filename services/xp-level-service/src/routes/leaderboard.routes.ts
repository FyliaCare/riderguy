import { Router } from 'express';
import { XPController } from '../controllers/xp.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new XPController();

router.get('/', controller.getLeaderboard);
router.get('/rank/:riderId', authenticate, controller.getRiderRank);

export { router as leaderboardRoutes };
