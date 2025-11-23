import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    riderId?: string;
    email: string;
    role: string;
  };
}
import { KYCService } from '../services/kyc.service';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

export class KYCController {
  private kycService: KYCService;

  constructor() {
    this.kycService = new KYCService();
  }

  initiateKYC = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;

      if (!riderId) {
        throw new ApiError(400, 'Rider ID is required');
      }

      const kyc = await this.kycService.initiateKYC(riderId);

      logger.info(`KYC initiated for rider ${riderId}`);

      res.status(201).json({
        success: true,
        data: kyc,
        message: 'KYC process initiated'
      });
    } catch (error) {
      next(error);
    }
  };

  getKYCStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;

      if (!riderId) {
        throw new ApiError(400, 'Rider ID is required');
      }

      const kyc = await this.kycService.getKYCStatus(riderId);

      res.json({
        success: true,
        data: kyc
      });
    } catch (error) {
      next(error);
    }
  };

  submitKYCData = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;
      const kycData = req.body;

      if (!riderId) {
        throw new ApiError(400, 'Rider ID is required');
      }

      const kyc = await this.kycService.submitKYCData(riderId, kycData);

      logger.info(`KYC data submitted for rider ${riderId}`);

      res.json({
        success: true,
        data: kyc,
        message: 'KYC data submitted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  verifyKYC = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId;
      const { status, notes, verifiedBy } = req.body;

      const kyc = await this.kycService.verifyKYC(riderId, status, notes, verifiedBy);

      logger.info(`KYC verification completed for rider ${riderId}, status: ${status}`);

      res.json({
        success: true,
        data: kyc,
        message: 'KYC verification completed'
      });
    } catch (error) {
      next(error);
    }
  };

  initiateBackgroundCheck = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId;

      const result = await this.kycService.initiateBackgroundCheck(riderId);

      logger.info(`Background check initiated for rider ${riderId}`);

      res.json({
        success: true,
        data: result,
        message: 'Background check initiated'
      });
    } catch (error) {
      next(error);
    }
  };

  getBackgroundCheckStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId;

      const result = await this.kycService.getBackgroundCheckStatus(riderId);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
}
