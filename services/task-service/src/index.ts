import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { taskRoutes } from './routes/task.routes';
import { healthRoutes } from './routes/health.routes';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import { logger } from './utils/logger';
import { TaskEventConsumer } from './consumers/task-event.consumer';

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(errorHandler);

// Start Kafka consumer
const consumer = new TaskEventConsumer();
consumer.start().catch(err => logger.error('Consumer start error:', err));

app.listen(PORT, () => {
  logger.info(`Task Service running on port ${PORT}`);
});

export default app;
