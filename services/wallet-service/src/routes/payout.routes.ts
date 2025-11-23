import { Router } from 'express';
import { WalletService } from '../services/wallet.service';

const router = Router();
const walletService = new WalletService();

router.post('/request', async (req, res, next) => {
  try {
    const { riderId, amount, method, bankDetails } = req.body;
    const payout = await walletService.requestPayout(riderId, amount, method || 'bank_transfer', bankDetails);
    res.status(201).json(payout);
  } catch (error) {
    next(error);
  }
});

router.get('/:riderId/payouts', async (req, res, next) => {
  try {
    const { riderId } = req.params;
    const { status } = req.query;
    // TODO: Implement getPayouts in WalletService
    res.json({ payouts: [], riderId, status });
  } catch (error) {
    next(error);
  }
});

router.post('/:payoutId/approve', async (req, res, next) => {
  try {
    const { payoutId } = req.params;
    const payout = await walletService.processPayout(payoutId, 'completed', `ref_${Date.now()}`);
    res.json(payout);
  } catch (error) {
    next(error);
  }
});

router.post('/:payoutId/reject', async (req, res, next) => {
  try {
    const { payoutId } = req.params;
    const { reason } = req.body;
    const payout = await walletService.processPayout(payoutId, 'failed', reason);
    res.json(payout);
  } catch (error) {
    next(error);
  }
});

export { router as payoutRoutes };
