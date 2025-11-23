import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'wallet-service',
    timestamp: new Date().toISOString()
  });
});

router.get('/ready', (req, res) => {
  res.json({ status: 'ready' });
});

export { router as healthRoutes };
