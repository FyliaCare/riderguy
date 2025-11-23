import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    service: 'rider-profile-service',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

export { router as healthRoutes };
