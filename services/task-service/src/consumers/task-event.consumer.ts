import { Kafka } from 'kafkajs';
import { logger } from '../utils/logger';

const kafka = new Kafka({
  clientId: 'task-service-consumer',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});

export class TaskEventConsumer {
  private consumer = kafka.consumer({ groupId: 'task-service-group' });

  async start() {
    await this.consumer.connect();
    
    await this.consumer.subscribe({ 
      topics: [
        'rider.location.updated',
        'rider.availability.changed',
        'dispatch.assignment'
      ],
      fromBeginning: false 
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const value = message.value?.toString();
          if (!value) return;

          const data = JSON.parse(value);

          switch (topic) {
            case 'rider.location.updated':
              await this.handleLocationUpdate(data);
              break;
            case 'rider.availability.changed':
              await this.handleAvailabilityChange(data);
              break;
            case 'dispatch.assignment':
              await this.handleDispatchAssignment(data);
              break;
          }
        } catch (error) {
          logger.error(`Error processing message from ${topic}:`, error);
        }
      }
    });

    logger.info('Task event consumer started');
  }

  private async handleLocationUpdate(data: any) {
    logger.debug(`Rider location updated: ${data.riderId}`);
    // Update task ETAs, notify clients, etc.
  }

  private async handleAvailabilityChange(data: any) {
    logger.info(`Rider availability changed: ${data.riderId}, available: ${data.available}`);
    // Trigger reassignment if needed
  }

  private async handleDispatchAssignment(data: any) {
    logger.info(`Dispatch assignment: task ${data.taskId} to rider ${data.riderId}`);
    // Handle automatic task assignment from dispatch service
  }
}
