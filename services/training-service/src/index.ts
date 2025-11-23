import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { courseRoutes } from './routes/course.routes';
import { enrollmentRoutes } from './routes/enrollment.routes';
import { progressRoutes } from './routes/progress.routes';
import { certificateRoutes } from './routes/certificate.routes';
import { healthRoutes } from './routes/health.routes';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3006;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/health', healthRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/certificates', certificateRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Training Service running on port ${PORT}`);
});

export default app;
