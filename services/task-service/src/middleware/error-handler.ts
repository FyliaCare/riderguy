import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    logger.error(`API Error: ${err.message}`, { statusCode: err.statusCode, path: req.path });
    
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.statusCode
      }
    });
  }

  logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack, path: req.path });

  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      code: 500
    }
  });
};
