import twilio from 'twilio';
import { logger } from '../utils/logger';

const client = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export class SMSProvider {
  async send(phone: string, data: { title: string; body: string }) {
    if (!phone) {
      throw new Error('Phone number not provided');
    }

    if (!client) {
      logger.warn('Twilio not configured, skipping SMS send');
      return { success: false, messageId: null };
    }

    try {
      const message = await client.messages.create({
        body: `${data.title}\n\n${data.body}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });

      logger.info(`SMS sent: ${message.sid}`);
      
      return { success: true, messageId: message.sid };
    } catch (error) {
      logger.error('SMS send error:', error);
      throw error;
    }
  }
}
