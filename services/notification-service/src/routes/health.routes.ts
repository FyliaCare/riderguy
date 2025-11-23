import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'notification-service', timestamp: new Date().toISOString() });
});
export { router as healthRoutes };
