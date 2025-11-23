import { Pool } from 'pg';
import Redis from 'ioredis';
import { Kafka } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';
import { Wallet, Transaction } from '@riderguy/shared-types';
import { ApiError } from '../utils/api-error';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const kafka = new Kafka({ clientId: 'wallet-service', brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',') });
const producer = kafka.producer();

export class WalletService {
  async getWallet(riderId: string): Promise<Wallet> {
    const cached = await redis.get(`wallet:${riderId}`);
    if (cached) return JSON.parse(cached);

    const result = await pool.query(`SELECT * FROM wallets WHERE rider_id = $1`, [riderId]);

    if (result.rows.length === 0) {
      // Create wallet if doesn't exist
      return await this.createWallet(riderId);
    }

    const wallet = result.rows[0];
    await redis.setex(`wallet:${riderId}`, 300, JSON.stringify(wallet));

    return wallet;
  }

  async createWallet(riderId: string): Promise<Wallet> {
    const walletId = uuidv4();
    const result = await pool.query(
      `INSERT INTO wallets (wallet_id, rider_id, balance, available_balance, pending_balance)
       VALUES ($1, $2, 0, 0, 0)
       RETURNING *`,
      [walletId, riderId]
    );

    return result.rows[0];
  }

  async creditWallet(riderId: string, amount: number, type: string, reference: string, metadata?: any): Promise<Transaction> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Create transaction
      const transactionId = uuidv4();
      const txnResult = await client.query(
        `INSERT INTO transactions 
         (transaction_id, rider_id, type, amount, status, reference, metadata)
         VALUES ($1, $2, $3, $4, 'completed', $5, $6)
         RETURNING *`,
        [transactionId, riderId, type, amount, reference, JSON.stringify(metadata || {})]
      );

      // Update wallet balance
      await client.query(
        `UPDATE wallets 
         SET balance = balance + $2,
             available_balance = available_balance + $2,
             updated_at = NOW()
         WHERE rider_id = $1`,
        [riderId, amount]
      );

      await client.query('COMMIT');

      await redis.del(`wallet:${riderId}`);
      await this.publishEvent('wallet.credited', { riderId, amount, transactionId, reference });

      return txnResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async debitWallet(riderId: string, amount: number, type: string, reference: string, metadata?: any): Promise<Transaction> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Check balance
      const walletResult = await client.query(
        `SELECT available_balance FROM wallets WHERE rider_id = $1 FOR UPDATE`,
        [riderId]
      );

      if (walletResult.rows.length === 0) {
        throw new ApiError(404, 'Wallet not found');
      }

      const availableBalance = parseFloat(walletResult.rows[0].available_balance);
      if (availableBalance < amount) {
        throw new ApiError(400, 'Insufficient balance');
      }

      // Create transaction
      const transactionId = uuidv4();
      const txnResult = await client.query(
        `INSERT INTO transactions 
         (transaction_id, rider_id, type, amount, status, reference, metadata)
         VALUES ($1, $2, $3, $4, 'completed', $5, $6)
         RETURNING *`,
        [transactionId, riderId, type, -amount, 'completed', reference, JSON.stringify(metadata || {})]
      );

      // Update wallet balance
      await client.query(
        `UPDATE wallets 
         SET balance = balance - $2,
             available_balance = available_balance - $2,
             updated_at = NOW()
         WHERE rider_id = $1`,
        [riderId, amount]
      );

      await client.query('COMMIT');

      await redis.del(`wallet:${riderId}`);
      await this.publishEvent('wallet.debited', { riderId, amount, transactionId, reference });

      return txnResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getTransactions(riderId: string, filters: { limit?: number; offset?: number; type?: string }) {
    const { limit = 50, offset = 0, type } = filters;
    
    let query = `SELECT * FROM transactions WHERE rider_id = $1`;
    const values: any[] = [riderId];
    
    if (type) {
      query += ` AND type = $${values.length + 1}`;
      values.push(type);
    }
    
    query += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows;
  }

  async requestPayout(riderId: string, amount: number, method: string, details: any) {
    const wallet = await this.getWallet(riderId);

    const walletBalance = wallet.balance || '0';
    if (parseFloat(walletBalance.toString()) < amount) {
      throw new ApiError(400, 'Insufficient balance for payout');
    }

    const payoutId = uuidv4();
    const result = await pool.query(
      `INSERT INTO payouts 
       (payout_id, rider_id, amount, method, account_details, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')
       RETURNING *`,
      [payoutId, riderId, amount, method, JSON.stringify(details)]
    );

    // Move to pending balance
    await pool.query(
      `UPDATE wallets 
       SET available_balance = available_balance - $2,
           pending_balance = pending_balance + $2
       WHERE rider_id = $1`,
      [riderId, amount]
    );

    await redis.del(`wallet:${riderId}`);
    await this.publishEvent('payout.requested', { riderId, payoutId, amount });

    return result.rows[0];
  }

  async processPayout(payoutId: string, status: string, reference?: string) {
    const result = await pool.query(`SELECT * FROM payouts WHERE payout_id = $1`, [payoutId]);

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Payout not found');
    }

    const payout = result.rows[0];

    await pool.query(
      `UPDATE payouts 
       SET status = $2, external_reference = $3, processed_at = NOW()
       WHERE payout_id = $1`,
      [payoutId, status, reference]
    );

    if (status === 'completed') {
      // Deduct from pending balance
      await pool.query(
        `UPDATE wallets 
         SET balance = balance - $2,
             pending_balance = pending_balance - $2
         WHERE rider_id = $1`,
        [payout.rider_id, payout.amount]
      );

      // Create transaction record
      await this.creditWallet(payout.rider_id, -payout.amount, 'payout', payoutId, { payoutId });
    } else if (status === 'failed') {
      // Return to available balance
      await pool.query(
        `UPDATE wallets 
         SET available_balance = available_balance + $2,
             pending_balance = pending_balance - $2
         WHERE rider_id = $1`,
        [payout.rider_id, payout.amount]
      );
    }

    await redis.del(`wallet:${payout.rider_id}`);
    await this.publishEvent('payout.processed', { payoutId, status, riderId: payout.rider_id });
  }

  private async publishEvent(topic: string, data: any) {
    try {
      await producer.connect();
      await producer.send({
        topic,
        messages: [{ key: data.riderId || data.payoutId, value: JSON.stringify(data) }]
      });
    } catch (error) {
      console.error('Event publish error:', error);
    }
  }
}
