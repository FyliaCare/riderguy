import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { insuranceRoutes } from './routes/insurance.routes';
import { loanRoutes } from './routes/loan.routes';
import { emergencyRoutes } from './routes/emergency.routes';
import { healthRoutes } from './routes/health.routes';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3009;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/health', healthRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/emergency', emergencyRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Welfare Service running on port ${PORT}`);
});

export default app;
