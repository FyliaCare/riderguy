import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', err);
  res.status(err.status || 500).json({ error: { message: err.message || 'Internal server error', status: err.status || 500 } });
};
