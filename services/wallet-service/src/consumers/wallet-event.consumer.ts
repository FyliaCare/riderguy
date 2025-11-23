import { Kafka } from 'kafkajs';
import { WalletService } from '../services/wallet.service';
import { logger } from '../utils/logger';

const kafka = new Kafka({
  clientId: 'wallet-service',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});

const consumer = kafka.consumer({ groupId: 'wallet-service-group' });

export class WalletEventConsumer {
  private walletService: WalletService;

  constructor() {
    this.walletService = new WalletService();
  }

  async start() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'task-events', fromBeginning: false });
    await consumer.subscribe({ topic: 'payment-events', fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const event = JSON.parse(message.value?.toString() || '{}');
          logger.info(`Received event from ${topic}:`, event);

          switch (topic) {
            case 'task-events':
              await this.handleTaskEvent(event);
              break;
            case 'payment-events':
              await this.handlePaymentEvent(event);
              break;
            default:
              logger.warn(`Unhandled topic: ${topic}`);
          }
        } catch (error) {
          logger.error('Error processing message:', error);
        }
      },
    });

    logger.info('Wallet event consumer started');
  }

  private async handleTaskEvent(event: any) {
    const { type, data } = event;

    switch (type) {
      case 'task.completed':
        // Credit rider wallet
        await this.walletService.creditWallet(
          data.riderId,
          data.amount,
          'task_earning',
          data.taskId
        );
        logger.info(`Credited ${data.amount} to rider ${data.riderId} for task ${data.taskId}`);
        break;

      default:
        logger.debug(`Unhandled task event type: ${type}`);
    }
  }

  private async handlePaymentEvent(event: any) {
    const { type, data } = event;

    switch (type) {
      case 'payment.received':
        await this.walletService.creditWallet(
          data.riderId,
          data.amount,
          'payment',
          data.reference
        );
        break;

      case 'payment.failed':
        logger.error(`Payment failed for ${data.riderId}:`, data);
        break;

      default:
        logger.debug(`Unhandled payment event type: ${type}`);
    }
  }

  async stop() {
    await consumer.disconnect();
    logger.info('Wallet event consumer stopped');
  }
}
