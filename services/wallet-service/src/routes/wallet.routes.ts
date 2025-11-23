import { Router } from 'express';
import { WalletService } from '../services/wallet.service';

const router = Router();
const walletService = new WalletService();

router.post('/create', async (req, res, next) => {
  try {
    const { riderId } = req.body;
    const wallet = await walletService.createWallet(riderId);
    res.status(201).json(wallet);
  } catch (error) {
    next(error);
  }
});

router.get('/:riderId', async (req, res, next) => {
  try {
    const { riderId } = req.params;
    const wallet = await walletService.getWallet(riderId);
    res.json(wallet);
  } catch (error) {
    next(error);
  }
});

router.get('/:riderId/balance', async (req, res, next) => {
  try {
    const { riderId } = req.params;
    const wallet = await walletService.getWallet(riderId);
    res.json({ balance: wallet.balance || 0 });
  } catch (error) {
    next(error);
  }
});

router.post('/credit', async (req, res, next) => {
  try {
    const { riderId, amount, description } = req.body;
    const transaction = await walletService.creditWallet(riderId, amount, 'credit', description);
    res.json(transaction);
  } catch (error) {
    next(error);
  }
});

router.post('/debit', async (req, res, next) => {
  try {
    const { riderId, amount, description } = req.body;
    const transaction = await walletService.debitWallet(riderId, amount, 'debit', description);
    res.json(transaction);
  } catch (error) {
    next(error);
  }
});

export { router as walletRoutes };
