import { Router } from 'express';
import { WalletService } from '../services/wallet.service';

const router = Router();
const walletService = new WalletService();

router.get('/:riderId/transactions', async (req, res, next) => {
  try {
    const { riderId } = req.params;
    const { page = '1', limit = '20', type } = req.query;
    const transactions = await walletService.getTransactions(riderId, {
      limit: parseInt(limit as string),
      offset: (parseInt(page as string) - 1) * parseInt(limit as string),
      type: type as string
    });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

router.get('/transaction/:transactionId', async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    // TODO: Implement getTransactionById in WalletService
    res.json({ message: 'Get transaction by ID - not yet implemented', transactionId });
  } catch (error) {
    next(error);
  }
});

export { router as transactionRoutes };
