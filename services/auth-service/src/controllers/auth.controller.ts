import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { logger } from '../utils/logger';
import { ApiError } from '../utils/api-error';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, phone, password, regionId } = req.body;

      // Check if user already exists
      // const existingUser = await db.users.findByEmail(email);
      // if (existingUser) throw new ApiError(409, 'User already exists');

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = {
        id: 'user_' + Date.now(), // Replace with actual UUID
        name,
        email,
        phone,
        password: hashedPassword,
        regionId,
        role: 'rider',
        createdAt: new Date(),
      };

      // Save to database
      // await db.users.create(user);

      // Generate tokens
      const accessToken = this.generateAccessToken({ userId: user.id, role: user.role });
      const refreshToken = this.generateRefreshToken({ userId: user.id });

      // Store refresh token in Redis
      // await redis.setex(`refresh:${user.id}`, 7 * 24 * 60 * 60, refreshToken);

      logger.info(`User registered: ${user.id}`);

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, twoFactorCode } = req.body;

      // Find user by email
      // const user = await db.users.findByEmail(email);
      // if (!user) throw new ApiError(401, 'Invalid credentials');

      // Mock user for demo
      const user = {
        id: 'user_1',
        email,
        password: await bcrypt.hash('password123', 10),
        role: 'rider',
        twoFactorEnabled: false,
        twoFactorSecret: null,
      };

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new ApiError(401, 'Invalid credentials');
      }

      // Check 2FA if enabled
      if (user.twoFactorEnabled) {
        if (!twoFactorCode) {
          res.status(200).json({
            success: true,
            requiresTwoFactor: true,
          });
          return;
        }

        const isValid = speakeasy.totp.verify({
          secret: user.twoFactorSecret!,
          encoding: 'base32',
          token: twoFactorCode,
        });

        if (!isValid) {
          throw new ApiError(401, 'Invalid 2FA code');
        }
      }

      // Generate tokens
      const accessToken = this.generateAccessToken({ userId: user.id, role: user.role });
      const refreshToken = this.generateRefreshToken({ userId: user.id });

      // Store session
      const sessionId = 'session_' + Date.now();
      // await redis.setex(`session:${sessionId}`, 7 * 24 * 60 * 60, JSON.stringify({
      //   userId: user.id,
      //   createdAt: new Date(),
      //   userAgent: req.headers['user-agent'],
      //   ip: req.ip,
      // }));

      logger.info(`User logged in: ${user.id}`);

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          accessToken,
          refreshToken,
          sessionId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET || 'your-refresh-secret'
      ) as { userId: string };

      // Check if token is in Redis
      // const storedToken = await redis.get(`refresh:${decoded.userId}`);
      // if (storedToken !== refreshToken) throw new ApiError(401, 'Invalid refresh token');

      // Get user role
      // const user = await db.users.findById(decoded.userId);

      // Generate new access token
      const accessToken = this.generateAccessToken({
        userId: decoded.userId,
        role: 'rider', // user.role
      });

      res.json({
        success: true,
        data: { accessToken },
      });
    } catch (error) {
      next(new ApiError(401, 'Invalid or expired refresh token'));
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;

      // Remove refresh token from Redis
      // await redis.del(`refresh:${userId}`);

      logger.info(`User logged out: ${userId}`);

      res.json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      // Find user
      // const user = await db.users.findByEmail(email);
      // if (!user) return res.json({ success: true }); // Don't reveal if user exists

      // Generate reset token
      const secret = process.env.JWT_SECRET || 'secret';
      const resetToken = jwt.sign({ email }, secret, { expiresIn: '1h' });

      // Store in Redis
      // await redis.setex(`reset:${email}`, 3600, resetToken);

      // Send email (integrate with notification service)
      logger.info(`Password reset requested for: ${email}`, { resetToken });

      res.json({
        success: true,
        message: 'If the email exists, a reset link has been sent',
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newPassword } = req.body;

      // Verify token
      const secret = process.env.JWT_SECRET || 'secret';
      const decoded = jwt.verify(token, secret) as { email: string };

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password in database
      // await db.users.updatePassword(decoded.email, hashedPassword);

      logger.info(`Password reset for: ${decoded.email}`, { passwordHash: hashedPassword.substring(0, 10) });

      res.json({
        success: true,
        message: 'Password reset successfully',
      });
    } catch (error) {
      next(new ApiError(400, 'Invalid or expired reset token'));
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { currentPassword, newPassword } = req.body;

      // Get user
      // const user = await db.users.findById(userId);

      // Verify current password
      // const isValid = await bcrypt.compare(currentPassword, user.password);
      // if (!isValid) throw new ApiError(401, 'Invalid current password');

      // Hash and update
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // await db.users.updatePassword(userId, hashedPassword);

      logger.info(`Password changed for user: ${userId}`, { 
        currentPasswordProvided: !!currentPassword,
        newPasswordHash: hashedPassword.substring(0, 10)
      });

      res.json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async enable2FA(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;

      // Generate secret
      const secret = speakeasy.generateSecret({
        name: `RiderGuy (${userId})`,
      });

      // Generate QR code
      const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

      // Store secret temporarily (user must verify before enabling)
      // await redis.setex(`2fa:pending:${userId}`, 600, secret.base32);

      res.json({
        success: true,
        data: {
          secret: secret.base32,
          qrCode,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async verify2FA(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { token } = req.body;

      // Get pending secret
      // const secret = await redis.get(`2fa:pending:${userId}`);
      // if (!secret) throw new ApiError(400, '2FA setup not initiated');

      const secret = 'mock_secret'; // Replace with actual

      // Verify token
      const isValid = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token,
      });

      if (!isValid) {
        throw new ApiError(400, 'Invalid verification code');
      }

      // Enable 2FA for user
      // await db.users.update(userId, { twoFactorEnabled: true, twoFactorSecret: secret });
      // await redis.del(`2fa:pending:${userId}`);

      logger.info(`2FA enabled for user: ${userId}`);

      res.json({
        success: true,
        message: '2FA enabled successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async disable2FA(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { password } = req.body;

      // Verify password
      // const user = await db.users.findById(userId);
      // const isValid = await bcrypt.compare(password, user.password);
      // if (!isValid) throw new ApiError(401, 'Invalid password');

      // Disable 2FA
      // await db.users.update(userId, { twoFactorEnabled: false, twoFactorSecret: null });

      logger.info(`2FA disabled for user: ${userId}`, { passwordVerified: !!password });

      res.json({
        success: true,
        message: '2FA disabled successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getSessions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;

      // Get all sessions from Redis
      // const sessions = await redis.keys(`session:*:${userId}`);
      logger.debug(`Fetching sessions for user: ${userId}`);

      res.json({
        success: true,
        data: {
          sessions: [], // Map from Redis
          userId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async revokeSession(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { sessionId } = req.params;

      // Delete session from Redis
      // await redis.del(`session:${sessionId}`);

      logger.info(`Session revoked: ${sessionId} for user: ${userId}`);

      res.json({
        success: true,
        message: 'Session revoked successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  private generateAccessToken(payload: { userId: string; role: string }): string {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const expiresIn = process.env.JWT_EXPIRES_IN || '15m';
    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const secret = process.env.JWT_SECRET || 'your-refresh-secret';
    const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
  }
}
