import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validate-request';
import { profileValidators } from '../validators/profile.validators';

const router = Router();
const controller = new ProfileController();

router.get('/:riderId', authenticate, controller.getProfile);
router.put('/:riderId', authenticate, validateRequest(profileValidators.updateProfile), controller.updateProfile);
router.put('/:riderId/emergency-contact', authenticate, validateRequest(profileValidators.emergencyContact), controller.updateEmergencyContact);
router.put('/:riderId/bank-details', authenticate, validateRequest(profileValidators.bankDetails), controller.updateBankDetails);
router.get('/:riderId/stats', authenticate, controller.getProfileStats);

export { router as profileRoutes };
