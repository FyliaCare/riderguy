import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { notificationRoutes } from './routes/notification.routes';
import { healthRoutes } from './routes/health.routes';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import { logger } from './utils/logger';
// import { NotificationConsumer } from './consumers/notification.consumer';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/health', healthRoutes);
app.use('/api/notifications', notificationRoutes);

app.use(errorHandler);

// const consumer = new NotificationConsumer();
// consumer.start().catch(err => logger.error('Consumer error:', err));

app.listen(PORT, () => {
  logger.info(`Notification Service running on port ${PORT}`);
});

export default app;
