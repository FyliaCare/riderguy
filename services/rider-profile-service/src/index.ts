import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { profileRoutes } from './routes/profile.routes';
import { documentRoutes } from './routes/document.routes';
import { kycRoutes } from './routes/kyc.routes';
import { healthRoutes } from './routes/health.routes';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/kyc', kycRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Rider Profile Service running on port ${PORT}`);
});

export default app;
