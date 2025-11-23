import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    riderId?: string;
    email: string;
    role: string;
  };
}
import { ProfileService } from '../services/profile.service';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

export class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;
      
      if (!riderId) {
        throw new ApiError(400, 'Rider ID is required');
      }

      const profile = await this.profileService.getProfile(riderId);
      
      if (!profile) {
        throw new ApiError(404, 'Profile not found');
      }

      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;
      const updates = req.body;

      if (!riderId) {
        throw new ApiError(400, 'Rider ID is required');
      }

      const profile = await this.profileService.updateProfile(riderId, updates);

      logger.info(`Profile updated for rider ${riderId}`);

      res.json({
        success: true,
        data: profile,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  updateEmergencyContact = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;
      const { name, phone, relationship } = req.body;

      if (!riderId) {
        throw new ApiError(400, 'Rider ID is required');
      }

      const profile = await this.profileService.updateEmergencyContact(riderId, {
        name,
        phone,
        relationship
      });

      res.json({
        success: true,
        data: profile,
        message: 'Emergency contact updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  updateBankDetails = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;
      const bankDetails = req.body;

      if (!riderId) {
        throw new ApiError(400, 'Rider ID is required');
      }

      const profile = await this.profileService.updateBankDetails(riderId, bankDetails);

      logger.info(`Bank details updated for rider ${riderId}`);

      res.json({
        success: true,
        data: profile,
        message: 'Bank details updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  getProfileStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;

      if (!riderId) {
        throw new ApiError(400, 'Rider ID is required');
      }

      const stats = await this.profileService.getProfileStats(riderId);

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  };
}
