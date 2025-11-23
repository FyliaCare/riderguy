import { Pool } from 'pg';
import Redis from 'ioredis';
import { Kafka } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const kafka = new Kafka({ clientId: 'welfare-service', brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',') });
const producer = kafka.producer();

export class WelfareService {
  // ========== Insurance ==========
  
  async enrollInInsurance(riderId: string, planId: string, beneficiaries: any[]) {
    // Get plan details
    const planResult = await pool.query(
      'SELECT * FROM insurance_plans WHERE plan_id = $1 AND is_active = true',
      [planId]
    );

    if (planResult.rows.length === 0) {
      throw new ApiError(404, 'Insurance plan not found');
    }

    const plan = planResult.rows[0];

    // Check if rider is eligible
    const riderResult = await pool.query(
      'SELECT * FROM riders WHERE rider_id = $1',
      [riderId]
    );

    if (riderResult.rows.length === 0) {
      throw new ApiError(404, 'Rider not found');
    }

    const rider = riderResult.rows[0];

    // Check if rider already has active insurance
    const existingResult = await pool.query(
      `SELECT * FROM insurance_enrollments 
       WHERE rider_id = $1 AND status = 'active'`,
      [riderId]
    );

    if (existingResult.rows.length > 0) {
      throw new ApiError(400, 'Rider already has active insurance');
    }

    // Check eligibility criteria
    if (rider.current_level < plan.min_level_required) {
      throw new ApiError(400, `Minimum level ${plan.min_level_required} required for this plan`);
    }

    const enrollmentId = uuidv4();
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + (plan.duration_months || 12));

    // Create enrollment
    const result = await pool.query(
      `INSERT INTO insurance_enrollments 
       (enrollment_id, rider_id, plan_id, premium_amount, start_date, end_date, 
        beneficiaries, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'active', NOW())
       RETURNING *`,
      [
        enrollmentId,
        riderId,
        planId,
        plan.premium_amount,
        startDate,
        endDate,
        JSON.stringify(beneficiaries)
      ]
    );

    // Deduct premium from wallet (via Kafka event)
    await producer.connect();
    await producer.send({
      topic: 'welfare.insurance_enrolled',
      messages: [{
        key: riderId,
        value: JSON.stringify({
          riderId,
          enrollmentId,
          planId,
          planName: plan.name,
          premiumAmount: plan.premium_amount,
          coverageAmount: plan.coverage_amount,
          startDate,
          endDate
        })
      }]
    });

    logger.info(`Insurance enrollment created: ${enrollmentId} for rider ${riderId}`);

    return result.rows[0];
  }

  async getInsuranceEnrollments(riderId: string) {
    const result = await pool.query(
      `SELECT ie.*, ip.name as plan_name, ip.coverage_amount, ip.description
       FROM insurance_enrollments ie
       JOIN insurance_plans ip ON ie.plan_id = ip.plan_id
       WHERE ie.rider_id = $1
       ORDER BY ie.created_at DESC`,
      [riderId]
    );

    return result.rows;
  }

  async fileClaim(riderId: string, enrollmentId: string, incidentType: string, description: string, documents: string[]) {
    // Verify enrollment
    const enrollmentResult = await pool.query(
      'SELECT * FROM insurance_enrollments WHERE enrollment_id = $1 AND rider_id = $2 AND status = $3',
      [enrollmentId, riderId, 'active']
    );

    if (enrollmentResult.rows.length === 0) {
      throw new ApiError(404, 'Active insurance enrollment not found');
    }

    const claimId = uuidv4();

    const result = await pool.query(
      `INSERT INTO insurance_claims 
       (claim_id, enrollment_id, rider_id, incident_type, description, 
        documents, status, filed_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending', NOW())
       RETURNING *`,
      [claimId, enrollmentId, riderId, incidentType, description, JSON.stringify(documents)]
    );

    // Publish event for admin review
    await producer.connect();
    await producer.send({
      topic: 'welfare.claim_filed',
      messages: [{
        key: riderId,
        value: JSON.stringify({
          claimId,
          riderId,
          incidentType,
          filedAt: new Date()
        })
      }]
    });

    logger.info(`Insurance claim filed: ${claimId}`);

    return result.rows[0];
  }

  // ========== Loans ==========

  async applyForLoan(riderId: string, amount: number, purpose: string, repaymentMonths: number) {
    // Get rider info
    const riderResult = await pool.query(
      'SELECT * FROM riders WHERE rider_id = $1',
      [riderId]
    );

    if (riderResult.rows.length === 0) {
      throw new ApiError(404, 'Rider not found');
    }

    const rider = riderResult.rows[0];

    // Check eligibility
    if (rider.current_level < 3) {
      throw new ApiError(400, 'Minimum level 3 required to apply for loans');
    }

    // Check for active loans
    const activeLoanResult = await pool.query(
      `SELECT * FROM loans 
       WHERE rider_id = $1 AND status IN ('pending', 'approved', 'disbursed')`,
      [riderId]
    );

    if (activeLoanResult.rows.length > 0) {
      throw new ApiError(400, 'You already have an active loan application or outstanding loan');
    }

    // Calculate interest (simple 5% per month for now)
    const interestRate = 0.05;
    const totalInterest = amount * interestRate * repaymentMonths;
    const totalRepayment = amount + totalInterest;
    const monthlyPayment = totalRepayment / repaymentMonths;

    const loanId = uuidv4();

    const result = await pool.query(
      `INSERT INTO loans 
       (loan_id, rider_id, amount, interest_rate, repayment_months, 
        total_repayment, monthly_payment, purpose, status, applied_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', NOW())
       RETURNING *`,
      [loanId, riderId, amount, interestRate, repaymentMonths, totalRepayment, monthlyPayment, purpose]
    );

    // Publish event for approval workflow
    await producer.connect();
    await producer.send({
      topic: 'welfare.loan_applied',
      messages: [{
        key: riderId,
        value: JSON.stringify({
          loanId,
          riderId,
          amount,
          purpose,
          appliedAt: new Date()
        })
      }]
    });

    logger.info(`Loan application submitted: ${loanId} for rider ${riderId}`);

    return result.rows[0];
  }

  async approveLoan(loanId: string, adminId: string) {
    const result = await pool.query(
      `UPDATE loans 
       SET status = 'approved', approved_at = NOW(), approved_by = $2
       WHERE loan_id = $1 AND status = 'pending'
       RETURNING *`,
      [loanId, adminId]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Loan not found or already processed');
    }

    const loan = result.rows[0];

    // Publish event to disburse funds
    await producer.connect();
    await producer.send({
      topic: 'welfare.loan_approved',
      messages: [{
        key: loan.rider_id,
        value: JSON.stringify({
          loanId,
          riderId: loan.rider_id,
          amount: loan.amount,
          approvedAt: new Date()
        })
      }]
    });

    logger.info(`Loan approved: ${loanId}`);

    return loan;
  }

  async disburseLoan(loanId: string) {
    const result = await pool.query(
      `UPDATE loans 
       SET status = 'disbursed', disbursed_at = NOW()
       WHERE loan_id = $1 AND status = 'approved'
       RETURNING *`,
      [loanId]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Loan not found or not approved');
    }

    const loan = result.rows[0];

    // Credit wallet (via Kafka event to wallet service)
    await producer.connect();
    await producer.send({
      topic: 'wallet.credit',
      messages: [{
        key: loan.rider_id,
        value: JSON.stringify({
          riderId: loan.rider_id,
          amount: loan.amount,
          source: 'loan_disbursement',
          reference: loanId
        })
      }]
    });

    logger.info(`Loan disbursed: ${loanId}`);

    return loan;
  }

  async getLoans(riderId: string) {
    const result = await pool.query(
      'SELECT * FROM loans WHERE rider_id = $1 ORDER BY applied_at DESC',
      [riderId]
    );

    return result.rows;
  }

  async recordRepayment(loanId: string, amount: number) {
    const paymentId = uuidv4();

    // Record payment
    await pool.query(
      `INSERT INTO loan_repayments (payment_id, loan_id, amount, paid_at)
       VALUES ($1, $2, $3, NOW())`,
      [paymentId, loanId, amount]
    );

    // Update loan balance
    const result = await pool.query(
      `UPDATE loans 
       SET amount_repaid = amount_repaid + $2
       WHERE loan_id = $1
       RETURNING *`,
      [loanId, amount]
    );

    const loan = result.rows[0];

    // Check if fully repaid
    if (loan.amount_repaid >= loan.total_repayment) {
      await pool.query(
        `UPDATE loans SET status = 'repaid', repaid_at = NOW() WHERE loan_id = $1`,
        [loanId]
      );

      logger.info(`Loan fully repaid: ${loanId}`);
    }

    return { paymentId, loan: result.rows[0] };
  }

  // ========== Emergency Funds ==========

  async requestEmergencyFund(riderId: string, amount: number, reason: string, description: string) {
    // Check eligibility
    const riderResult = await pool.query(
      'SELECT * FROM riders WHERE rider_id = $1',
      [riderId]
    );

    if (riderResult.rows.length === 0) {
      throw new ApiError(404, 'Rider not found');
    }

    const rider = riderResult.rows[0];

    if (rider.current_level < 2) {
      throw new ApiError(400, 'Minimum level 2 required for emergency fund requests');
    }

    // Limit check: max 2 requests per month
    const recentRequests = await pool.query(
      `SELECT COUNT(*) as count FROM emergency_funds 
       WHERE rider_id = $1 AND requested_at >= NOW() - INTERVAL '30 days'`,
      [riderId]
    );

    if (parseInt(recentRequests.rows[0].count) >= 2) {
      throw new ApiError(429, 'Maximum 2 emergency fund requests per month');
    }

    // Amount limit: max $500
    if (amount > 500) {
      throw new ApiError(400, 'Maximum emergency fund amount is $500');
    }

    const requestId = uuidv4();

    const result = await pool.query(
      `INSERT INTO emergency_funds 
       (request_id, rider_id, amount, reason, description, status, requested_at)
       VALUES ($1, $2, $3, $4, $5, 'pending', NOW())
       RETURNING *`,
      [requestId, riderId, amount, reason, description]
    );

    // Publish for approval
    await producer.connect();
    await producer.send({
      topic: 'welfare.emergency_fund_requested',
      messages: [{
        key: riderId,
        value: JSON.stringify({
          requestId,
          riderId,
          amount,
          reason,
          requestedAt: new Date()
        })
      }]
    });

    logger.info(`Emergency fund requested: ${requestId}`);

    return result.rows[0];
  }

  async approveEmergencyFund(requestId: string, adminId: string) {
    const result = await pool.query(
      `UPDATE emergency_funds 
       SET status = 'approved', approved_at = NOW(), approved_by = $2
       WHERE request_id = $1 AND status = 'pending'
       RETURNING *`,
      [requestId, adminId]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Request not found or already processed');
    }

    const request = result.rows[0];

    // Disburse immediately (credit wallet)
    await producer.connect();
    await producer.send({
      topic: 'wallet.credit',
      messages: [{
        key: request.rider_id,
        value: JSON.stringify({
          riderId: request.rider_id,
          amount: request.amount,
          source: 'emergency_fund',
          reference: requestId
        })
      }]
    });

    logger.info(`Emergency fund approved: ${requestId}`);

    return request;
  }

  async getEmergencyFundRequests(riderId: string) {
    const result = await pool.query(
      'SELECT * FROM emergency_funds WHERE rider_id = $1 ORDER BY requested_at DESC',
      [riderId]
    );

    return result.rows;
  }
}
