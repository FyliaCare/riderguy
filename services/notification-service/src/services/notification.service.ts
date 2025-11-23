import { Pool } from 'pg';
import Bull from 'bull';
import { v4 as uuidv4 } from 'uuid';
import { PushProvider } from '../providers/push.provider';
import { SMSProvider } from '../providers/sms.provider';
import { EmailProvider } from '../providers/email.provider';
import { WhatsAppProvider } from '../providers/whatsapp.provider';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const notificationQueue = new Bull('notifications', process.env.REDIS_URL || 'redis://localhost:6379');

export class NotificationService {
  private pushProvider: PushProvider;
  private smsProvider: SMSProvider;
  private emailProvider: EmailProvider;
  private whatsappProvider: WhatsAppProvider;

  constructor() {
    this.pushProvider = new PushProvider();
    this.smsProvider = new SMSProvider();
    this.emailProvider = new EmailProvider();
    this.whatsappProvider = new WhatsAppProvider();

    this.initializeWorker();
  }

  private initializeWorker() {
    notificationQueue.process(async (job) => {
      const { type, recipient, data } = job.data;

      try {
        switch (type) {
          case 'push':
            await this.pushProvider.send(recipient, data);
            break;
          case 'sms':
            await this.smsProvider.send(recipient, data);
            break;
          case 'email':
            await this.emailProvider.send(recipient, data);
            break;
          case 'whatsapp':
            await this.whatsappProvider.send(recipient, data);
            break;
        }

        await this.updateNotificationStatus(job.data.notificationId, 'sent');
      } catch (error) {
        logger.error(`Notification send failed:`, error);
        await this.updateNotificationStatus(job.data.notificationId, 'failed');
        throw error;
      }
    });
  }

  async sendNotification(
    riderId: string,
    type: string,
    channel: string[],
    title: string,
    body: string,
    data?: any
  ) {
    const notificationId = uuidv4();

    // Save notification
    await pool.query(
      `INSERT INTO notifications 
       (notification_id, rider_id, type, title, body, channels, data, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')`,
      [notificationId, riderId, type, title, body, JSON.stringify(channel), JSON.stringify(data || {})]
    );

    // Get rider contact details
    const rider = await pool.query(`SELECT * FROM riders WHERE rider_id = $1`, [riderId]);
    if (rider.rows.length === 0) {
      throw new ApiError(404, 'Rider not found');
    }

    const riderData = rider.rows[0];

    // Queue notifications for each channel
    for (const ch of channel) {
      let recipient;

      switch (ch) {
        case 'push':
          recipient = riderData.fcm_token;
          break;
        case 'sms':
          recipient = riderData.phone;
          break;
        case 'email':
          recipient = riderData.email;
          break;
        case 'whatsapp':
          recipient = riderData.phone;
          break;
      }

      if (recipient) {
        await notificationQueue.add({
          notificationId,
          type: ch,
          recipient,
          data: { title, body, ...data }
        });
      }
    }

    logger.info(`Notification queued: ${notificationId}, channels: ${channel.join(', ')}`);

    return { notificationId, status: 'queued' };
  }

  async getNotifications(riderId: string, limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT * FROM notifications 
       WHERE rider_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2 OFFSET $3`,
      [riderId, limit, offset]
    );

    return result.rows;
  }

  async markAsRead(notificationId: string) {
    await pool.query(
      `UPDATE notifications SET read_at = NOW() WHERE notification_id = $1`,
      [notificationId]
    );
  }

  private async updateNotificationStatus(notificationId: string, status: string) {
    await pool.query(
      `UPDATE notifications 
       SET status = $2, sent_at = NOW() 
       WHERE notification_id = $1`,
      [notificationId, status]
    );
  }

  async sendBulkNotification(
    riderIds: string[],
    type: string,
    channels: string[],
    title: string,
    body: string,
    data?: any
  ) {
    const promises = riderIds.map(riderId =>
      this.sendNotification(riderId, type, channels, title, body, data)
    );

    const results = await Promise.allSettled(promises);
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    logger.info(`Bulk notification sent: ${successful} successful, ${failed} failed`);

    return { successful, failed, total: riderIds.length };
  }
}
