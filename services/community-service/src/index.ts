import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import { postRoutes } from './routes/post.routes';
import { channelRoutes } from './routes/channel.routes';
import { healthRoutes } from './routes/health.routes';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import { logger } from './utils/logger';
import { ChatHandler } from './handlers/chat.handler';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3007;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/health', healthRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/channels', channelRoutes);

app.use(errorHandler);

// Initialize WebSocket chat
const chatHandler = new ChatHandler(io);
chatHandler.initialize();

httpServer.listen(PORT, () => {
  logger.info(`Community Service running on port ${PORT}`);
});

export default app;
