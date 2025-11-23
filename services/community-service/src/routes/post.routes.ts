import { Router } from 'express';
import { CommunityController } from '../controllers/community.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new CommunityController();

router.post('/', authenticate, controller.createPost);
router.get('/', controller.getPosts);
router.get('/:postId', controller.getPost);
router.post('/:postId/like', authenticate, controller.likePost);
router.post('/:postId/comments', authenticate, controller.addComment);
router.get('/:postId/comments', controller.getComments);
router.delete('/:postId', authenticate, controller.deletePost);

export { router as postRoutes };
