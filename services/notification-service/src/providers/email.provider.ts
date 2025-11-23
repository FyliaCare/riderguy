import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export class EmailProvider {
  async send(email: string, data: { title: string; body: string; html?: string }) {
    if (!email) {
      throw new Error('Email address not provided');
    }

    try {
      const info = await transporter.sendMail({
        from: `"RiderGuy" <${process.env.SMTP_FROM || 'notifications@riderguy.com'}>`,
        to: email,
        subject: data.title,
        text: data.body,
        html: data.html || `<p>${data.body}</p>`
      });

      logger.info(`Email sent: ${info.messageId}`);
      
      return { success: true, messageId: info.messageId };
    } catch (error) {
      logger.error('Email send error:', error);
      throw error;
    }
  }
}
