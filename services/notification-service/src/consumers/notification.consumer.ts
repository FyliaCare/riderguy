import { Kafka } from 'kafkajs';
import { NotificationService } from '../services/notification.service';
import { logger } from '../utils/logger';

const kafka = new Kafka({
  clientId: 'notification-consumer',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});

export class NotificationConsumer {
  private consumer = kafka.consumer({ groupId: 'notification-service-group' });
  private notificationService = new NotificationService();

  async start() {
    await this.consumer.connect();
    
    await this.consumer.subscribe({
      topics: [
        'task.assigned',
        'task.completed',
        'wallet.credited',
        'payout.processed',
        'training.completed',
        'xp.level_up'
      ],
      fromBeginning: false
    });

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
          const data = JSON.parse(message.value?.toString() || '{}');

          switch (topic) {
            case 'task.assigned':
              await this.handleTaskAssigned(data);
              break;
            case 'task.completed':
              await this.handleTaskCompleted(data);
              break;
            case 'wallet.credited':
              await this.handleWalletCredited(data);
              break;
            case 'payout.processed':
              await this.handlePayoutProcessed(data);
              break;
            case 'training.completed':
              await this.handleTrainingCompleted(data);
              break;
            case 'xp.level_up':
              await this.handleLevelUp(data);
              break;
          }
        } catch (error) {
          logger.error(`Error processing ${topic}:`, error);
        }
      }
    });

    logger.info('Notification consumer started');
  }

  private async handleTaskAssigned(data: any) {
    await this.notificationService.sendNotification(
      data.riderId,
      'task_assigned',
      ['push', 'sms'],
      'New Task Assigned',
      `You have been assigned a new ${data.type} task. Check your app for details.`,
      { taskId: data.taskId }
    );
  }

  private async handleTaskCompleted(data: any) {
    await this.notificationService.sendNotification(
      data.riderId,
      'task_completed',
      ['push'],
      'Task Completed! 🎉',
      `Great job! You've completed the task. Your earnings have been added to your wallet.`,
      { taskId: data.taskId }
    );
  }

  private async handleWalletCredited(data: any) {
    await this.notificationService.sendNotification(
      data.riderId,
      'wallet_credited',
      ['push'],
      'Money Received! 💰',
      `${data.amount} has been added to your wallet.`,
      { amount: data.amount, transactionId: data.transactionId }
    );
  }

  private async handlePayoutProcessed(data: any) {
    const status = data.status === 'completed' ? 'successful' : 'failed';
    await this.notificationService.sendNotification(
      data.riderId,
      'payout_processed',
      ['push', 'email'],
      `Payout ${status}`,
      `Your payout request has been ${status}.`,
      { payoutId: data.payoutId, status: data.status }
    );
  }

  private async handleTrainingCompleted(data: any) {
    await this.notificationService.sendNotification(
      data.riderId,
      'training_completed',
      ['push'],
      'Training Completed! 📚',
      `Congratulations! You've completed "${data.courseName}". Certificate is now available.`,
      { courseId: data.courseId }
    );
  }

  private async handleLevelUp(data: any) {
    await this.notificationService.sendNotification(
      data.riderId,
      'level_up',
      ['push'],
      `Level Up! 🚀 Level ${data.newLevel}`,
      `Amazing! You've reached Level ${data.newLevel}. Keep up the great work!`,
      { level: data.newLevel, rewards: data.rewards }
    );
  }
}
