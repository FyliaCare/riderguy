import { Kafka } from 'kafkajs';
import { XPService } from '../services/xp.service';
import { logger } from '../utils/logger';

const kafka = new Kafka({
  clientId: 'xp-consumer',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});

export class XPEventConsumer {
  private consumer = kafka.consumer({ groupId: 'xp-service-group' });
  private xpService = new XPService();

  async start() {
    await this.consumer.connect();
    
    await this.consumer.subscribe({
      topics: [
        'task.completed',
        'training.completed',
        'community.post_created',
        'referral.completed'
      ],
      fromBeginning: false
    });

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
          const data = JSON.parse(message.value?.toString() || '{}');

          switch (topic) {
            case 'task.completed':
              await this.handleTaskCompleted(data);
              break;
            case 'training.completed':
              await this.handleTrainingCompleted(data);
              break;
            case 'community.post_created':
              await this.handlePostCreated(data);
              break;
            case 'referral.completed':
              await this.handleReferralCompleted(data);
              break;
          }
        } catch (error) {
          logger.error(`Error processing ${topic}:`, error);
        }
      }
    });

    logger.info('XP event consumer started');
  }

  private async handleTaskCompleted(data: any) {
    let xpAmount = 10; // Base XP

    // Bonus XP for completing on time
    if (data.completed_on_time) {
      xpAmount += 5;
    }

    // Bonus XP for priority tasks
    if (data.priority === 'urgent') {
      xpAmount += 15;
    } else if (data.priority === 'high') {
      xpAmount += 10;
    }

    // Bonus XP for rating
    if (data.rating >= 4) {
      xpAmount += 5;
    }

    await this.xpService.awardXP(
      data.riderId,
      xpAmount,
      'task_completed',
      data.taskId,
      { priority: data.priority, rating: data.rating }
    );
  }

  private async handleTrainingCompleted(data: any) {
    const xpAmount = data.xpReward || 100;

    await this.xpService.awardXP(
      data.riderId,
      xpAmount,
      'training_completed',
      data.courseId,
      { courseName: data.courseName }
    );
  }

  private async handlePostCreated(data: any) {
    await this.xpService.awardXP(
      data.riderId,
      5,
      'community_post',
      data.postId
    );
  }

  private async handleReferralCompleted(data: any) {
    await this.xpService.awardXP(
      data.referrerId,
      50,
      'referral',
      data.newRiderId,
      { newRiderName: data.newRiderName }
    );
  }
}
