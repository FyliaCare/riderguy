import twilio from 'twilio';
import { logger } from '../utils/logger';

const client = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export class WhatsAppProvider {
  async send(phone: string, data: { title: string; body: string }) {
    if (!phone) {
      throw new Error('Phone number not provided');
    }

    if (!client) {
      logger.warn('Twilio not configured, skipping WhatsApp send');
      return { success: false, messageId: null };
    }

    // Format phone for WhatsApp (must include country code)
    const whatsappNumber = phone.startsWith('+') ? `whatsapp:${phone}` : `whatsapp:+${phone}`;

    try {
      const message = await client.messages.create({
        body: `*${data.title}*\n\n${data.body}`,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: whatsappNumber
      });

      logger.info(`WhatsApp sent: ${message.sid}`);
      
      return { success: true, messageId: message.sid };
    } catch (error) {
      logger.error('WhatsApp send error:', error);
      throw error;
    }
  }
}
