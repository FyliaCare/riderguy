import { Request, Response, NextFunction } from 'express';
import { XPService } from '../services/xp.service';
import { ApiError } from '../utils/api-error';

export class XPController {
  private xpService: XPService;

  constructor() {
    this.xpService = new XPService();
  }

  getXPInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const xpInfo = await this.xpService.getRiderXPInfo(riderId);

      res.json({ success: true, data: xpInfo });
    } catch (error) {
      next(error);
    }
  };

  getXPHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;
      const { limit, offset } = req.query;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const history = await this.xpService.getXPHistory(
        riderId,
        limit ? Number(limit) : undefined,
        offset ? Number(offset) : undefined
      );

      res.json({ success: true, data: history });
    } catch (error) {
      next(error);
    }
  };

  getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type = 'global', limit } = req.query;

      const leaderboard = await this.xpService.getLeaderboard(
        type as any,
        limit ? Number(limit) : undefined
      );

      res.json({ success: true, data: leaderboard });
    } catch (error) {
      next(error);
    }
  };

  getRiderRank = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;
      const { type = 'global' } = req.query;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const rank = await this.xpService.getRiderRank(riderId, type as any);

      res.json({
        success: true,
        data: { riderId, rank, type }
      });
    } catch (error) {
      next(error);
    }
  };

  awardXP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { riderId } = req.params;
      const { amount, source, reference, metadata } = req.body;

      // This endpoint should be protected for admin/system use only
      if (req.user?.role !== 'admin' && req.user?.role !== 'system') {
        throw new ApiError(403, 'Unauthorized');
      }

      const result = await this.xpService.awardXP(riderId, amount, source, reference, metadata);

      res.json({
        success: true,
        data: result,
        message: `${amount} XP awarded to rider`
      });
    } catch (error) {
      next(error);
    }
  };
}
