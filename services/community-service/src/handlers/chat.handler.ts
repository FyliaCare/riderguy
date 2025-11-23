import { Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { logger } from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface AuthenticatedSocket extends Socket {
  riderId?: string;
  riderName?: string;
}

export class ChatHandler {
  private io: Server;
  private activeUsers: Map<string, { riderId: string; name: string; socketId: string }> = new Map();

  constructor(io: Server) {
    this.io = io;
  }

  initialize() {
    this.io.use((socket: AuthenticatedSocket, next) => {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication error'));
      }

      try {
        const decoded = verify(token, JWT_SECRET) as any;
        socket.riderId = decoded.riderId;
        socket.riderName = decoded.name || 'Anonymous';
        next();
      } catch (err) {
        next(new Error('Authentication error'));
      }
    });

    this.io.on('connection', (socket: AuthenticatedSocket) => {
      logger.info(`User connected: ${socket.riderId}`);

      // Add user to active users
      if (socket.riderId) {
        this.activeUsers.set(socket.riderId, {
          riderId: socket.riderId,
          name: socket.riderName || 'Anonymous',
          socketId: socket.id
        });

        // Broadcast updated user list
        this.io.emit('users:online', Array.from(this.activeUsers.values()));
      }

      // Join channel
      socket.on('channel:join', (channelId: string) => {
        socket.join(`channel:${channelId}`);
        logger.info(`${socket.riderId} joined channel ${channelId}`);
        
        socket.to(`channel:${channelId}`).emit('user:joined', {
          riderId: socket.riderId,
          name: socket.riderName
        });
      });

      // Leave channel
      socket.on('channel:leave', (channelId: string) => {
        socket.leave(`channel:${channelId}`);
        logger.info(`${socket.riderId} left channel ${channelId}`);
      });

      // Send message
      socket.on('message:send', (data: { channelId: string; content: string }) => {
        const message = {
          messageId: Date.now().toString(),
          riderId: socket.riderId,
          riderName: socket.riderName,
          content: data.content,
          timestamp: new Date().toISOString()
        };

        // Broadcast to channel
        this.io.to(`channel:${data.channelId}`).emit('message:received', message);

        logger.info(`Message from ${socket.riderId} in channel ${data.channelId}`);
      });

      // Typing indicator
      socket.on('typing:start', (channelId: string) => {
        socket.to(`channel:${channelId}`).emit('user:typing', {
          riderId: socket.riderId,
          name: socket.riderName
        });
      });

      socket.on('typing:stop', (channelId: string) => {
        socket.to(`channel:${channelId}`).emit('user:stopped_typing', {
          riderId: socket.riderId
        });
      });

      // Disconnect
      socket.on('disconnect', () => {
        logger.info(`User disconnected: ${socket.riderId}`);

        if (socket.riderId) {
          this.activeUsers.delete(socket.riderId);
          this.io.emit('users:online', Array.from(this.activeUsers.values()));
        }
      });
    });

    logger.info('WebSocket chat handler initialized');
  }
}
