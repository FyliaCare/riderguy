import { Router } from 'express';
import { KYCController } from '../controllers/kyc.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new KYCController();

router.post('/:riderId/initiate', authenticate, controller.initiateKYC);
router.get('/:riderId/status', authenticate, controller.getKYCStatus);
router.post('/:riderId/submit', authenticate, controller.submitKYCData);
router.put('/:riderId/verify', authenticate, controller.verifyKYC);
router.post('/:riderId/background-check', authenticate, controller.initiateBackgroundCheck);
router.get('/:riderId/background-check/status', authenticate, controller.getBackgroundCheckStatus);

export { router as kycRoutes };
