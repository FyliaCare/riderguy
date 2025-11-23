import admin from 'firebase-admin';
import { logger } from '../utils/logger';

// Initialize Firebase Admin (add your service account key)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  });
}

export class PushProvider {
  async send(fcmToken: string, data: { title: string; body: string; [key: string]: any }) {
    if (!fcmToken) {
      throw new Error('FCM token not provided');
    }

    try {
      const message = {
        notification: {
          title: data.title,
          body: data.body
        },
        data: {
          ...data,
          clickAction: 'FLUTTER_NOTIFICATION_CLICK'
        },
        token: fcmToken
      };

      const response = await admin.messaging().send(message);
      logger.info(`Push notification sent: ${response}`);
      
      return { success: true, messageId: response };
    } catch (error) {
      logger.error('Push notification error:', error);
      throw error;
    }
  }
}
