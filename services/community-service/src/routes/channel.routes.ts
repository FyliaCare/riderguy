import { Router } from 'express';
import { CommunityController } from '../controllers/community.controller';

const router = Router();
const controller = new CommunityController();

router.get('/', controller.getChannels);

export { router as channelRoutes };
