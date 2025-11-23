import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    service: 'community-service',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

export { router as healthRoutes };
