import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { xpRoutes } from './routes/xp.routes';
import { leaderboardRoutes } from './routes/leaderboard.routes';
import { healthRoutes } from './routes/health.routes';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import { logger } from './utils/logger';
import { XPEventConsumer } from './consumers/xp-event.consumer';

const app = express();
const PORT = process.env.PORT || 3008;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/health', healthRoutes);
app.use('/api/xp', xpRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.use(errorHandler);

const consumer = new XPEventConsumer();
consumer.start().catch(err => logger.error('Consumer error:', err));

app.listen(PORT, () => {
  logger.info(`XP/Level Service running on port ${PORT}`);
});

export default app;
