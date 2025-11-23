import { Request, Response, NextFunction } from 'express';
import { WelfareService } from '../services/welfare.service';
import { ApiError } from '../utils/api-error';

export class WelfareController {
  private welfareService: WelfareService;

  constructor() {
    this.welfareService = new WelfareService();
  }

  // ========== Insurance ==========

  enrollInInsurance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const riderId = req.user?.riderId;
      const { planId, beneficiaries } = req.body;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const enrollment = await this.welfareService.enrollInInsurance(riderId, planId, beneficiaries);

      res.status(201).json({
        success: true,
        data: enrollment,
        message: 'Insurance enrollment successful'
      });
    } catch (error) {
      next(error);
    }
  };

  getEnrollments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const enrollments = await this.welfareService.getInsuranceEnrollments(riderId);

      res.json({ success: true, data: enrollments });
    } catch (error) {
      next(error);
    }
  };

  fileClaim = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const riderId = req.user?.riderId;
      const { enrollmentId, incidentType, description, documents } = req.body;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const claim = await this.welfareService.fileClaim(riderId, enrollmentId, incidentType, description, documents);

      res.status(201).json({
        success: true,
        data: claim,
        message: 'Claim filed successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // ========== Loans ==========

  applyForLoan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const riderId = req.user?.riderId;
      const { amount, purpose, repaymentMonths } = req.body;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const loan = await this.welfareService.applyForLoan(riderId, amount, purpose, repaymentMonths);

      res.status(201).json({
        success: true,
        data: loan,
        message: 'Loan application submitted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  getLoans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const loans = await this.welfareService.getLoans(riderId);

      res.json({ success: true, data: loans });
    } catch (error) {
      next(error);
    }
  };

  approveLoan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { loanId } = req.params;
      const adminId = req.user?.userId || "system";

      if (req.user?.role !== 'admin') {
        throw new ApiError(403, 'Unauthorized');
      }

      const loan = await this.welfareService.approveLoan(loanId, adminId);

      res.json({
        success: true,
        data: loan,
        message: 'Loan approved successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // ========== Emergency Funds ==========

  requestEmergencyFund = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const riderId = req.user?.riderId;
      const { amount, reason, description } = req.body;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const request = await this.welfareService.requestEmergencyFund(riderId, amount, reason, description);

      res.status(201).json({
        success: true,
        data: request,
        message: 'Emergency fund request submitted'
      });
    } catch (error) {
      next(error);
    }
  };

  getEmergencyRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const requests = await this.welfareService.getEmergencyFundRequests(riderId);

      res.json({ success: true, data: requests });
    } catch (error) {
      next(error);
    }
  };

  approveEmergencyFund = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { requestId } = req.params;
      const adminId = req.user?.userId || "system";

      if (req.user?.role !== 'admin') {
        throw new ApiError(403, 'Unauthorized');
      }

      const request = await this.welfareService.approveEmergencyFund(requestId, adminId);

      res.json({
        success: true,
        data: request,
        message: 'Emergency fund approved'
      });
    } catch (error) {
      next(error);
    }
  };
}
