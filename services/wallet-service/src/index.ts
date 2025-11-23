import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { walletRoutes } from './routes/wallet.routes';
import { transactionRoutes } from './routes/transaction.routes';
import { payoutRoutes } from './routes/payout.routes';
import { healthRoutes } from './routes/health.routes';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import { logger } from './utils/logger';
import { WalletEventConsumer } from './consumers/wallet-event.consumer';

const app = express();
const PORT = process.env.PORT || 3004;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/health', healthRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/payouts', payoutRoutes);

app.use(errorHandler);

const consumer = new WalletEventConsumer();
consumer.start().catch((err: Error) => logger.error('Consumer error:', err));

app.listen(PORT, () => {
  logger.info(`Wallet Service running on port ${PORT}`);
});

export default app;
