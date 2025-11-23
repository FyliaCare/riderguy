import { Router } from 'express';
import { NotificationService } from '../services/notification.service';

const router = Router();
const notificationService = new NotificationService();

router.post('/send', async (req, res, next) => {
  try {
    const { userId, type, channel, title, message, data } = req.body;
    const notification = await notificationService.sendNotification({
      userId, type, channel, title, message, data
    });
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/notifications', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page = '1', limit = '20' } = req.query;
    const notifications = await notificationService.getUserNotifications(
      userId, parseInt(page as string), parseInt(limit as string)
    );
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

router.patch('/:notificationId/read', async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    await notificationService.markAsRead(notificationId);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export { router as notificationRoutes };
