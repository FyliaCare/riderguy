import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate-request';
import { authenticate } from '../middleware/authenticate';
import { 
  registerSchema, 
  loginSchema, 
  refreshTokenSchema,
  enable2FASchema,
  verify2FASchema 
} from '../validators/auth.validators';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/refresh', validateRequest(refreshTokenSchema), authController.refreshToken);
router.post('/logout', authenticate, authController.logout);

// Password management
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/change-password', authenticate, authController.changePassword);

// 2FA routes
router.post('/2fa/enable', authenticate, authController.enable2FA);
router.post('/2fa/verify', authenticate, validateRequest(verify2FASchema), authController.verify2FA);
router.post('/2fa/disable', authenticate, authController.disable2FA);

// Session management
router.get('/sessions', authenticate, authController.getSessions);
router.delete('/sessions/:sessionId', authenticate, authController.revokeSession);

export default router;
