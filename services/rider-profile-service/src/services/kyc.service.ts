import { Pool } from 'pg';
import axios from 'axios';
import { ApiError } from '../utils/api-error';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Third-party KYC provider integration (example: Onfido, Jumio, etc.)
const KYC_PROVIDER_URL = process.env.KYC_PROVIDER_URL || 'https://api.onfido.com/v3';
const KYC_API_KEY = process.env.KYC_API_KEY;

export class KYCService {
  async initiateKYC(riderId: string) {
    // Check if KYC already exists
    const existing = await pool.query(
      `SELECT * FROM rider_kyc WHERE rider_id = $1`,
      [riderId]
    );

    if (existing.rows.length > 0) {
      return existing.rows[0];
    }

    // Create KYC record
    const result = await pool.query(
      `INSERT INTO rider_kyc (rider_id, status, initiated_at)
       VALUES ($1, 'initiated', NOW())
       RETURNING *`,
      [riderId]
    );

    return result.rows[0];
  }

  async getKYCStatus(riderId: string) {
    const result = await pool.query(
      `SELECT rk.*, 
              json_agg(
                json_build_object(
                  'documentId', rd.document_id,
                  'type', rd.type,
                  'status', rd.status,
                  'uploadedAt', rd.uploaded_at
                )
              ) as documents
       FROM rider_kyc rk
       LEFT JOIN rider_documents rd ON rk.rider_id = rd.rider_id
       WHERE rk.rider_id = $1
       GROUP BY rk.kyc_id`,
      [riderId]
    );

    return result.rows[0] || null;
  }

  async submitKYCData(riderId: string, kycData: any) {
    const {
      fullName,
      dateOfBirth,
      nationalId,
      address,
      city,
      state,
      country,
      postalCode
    } = kycData;

    // Update KYC record with submitted data
    const result = await pool.query(
      `UPDATE rider_kyc 
       SET kyc_data = $2, 
           status = 'submitted',
           submitted_at = NOW()
       WHERE rider_id = $1
       RETURNING *`,
      [riderId, JSON.stringify(kycData)]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'KYC record not found');
    }

    // Optionally trigger third-party KYC verification
    if (KYC_API_KEY) {
      try {
        await axios.post(
          `${KYC_PROVIDER_URL}/applicants`,
          {
            firstName: fullName.split(' ')[0],
            lastName: fullName.split(' ').slice(1).join(' '),
            email: kycData.email,
            dob: dateOfBirth,
            address: {
              flatNumber: '',
              buildingName: '',
              buildingNumber: '',
              street: address,
              subStreet: '',
              town: city,
              state,
              postcode: postalCode,
              country
            }
          },
          {
            headers: {
              'Authorization': `Token token=${KYC_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );
      } catch (error) {
        console.error('Third-party KYC API error:', error);
      }
    }

    return result.rows[0];
  }

  async verifyKYC(riderId: string, status: string, notes?: string, verifiedBy?: string) {
    const allowedStatuses = ['approved', 'rejected', 'pending_review'];

    if (!allowedStatuses.includes(status)) {
      throw new ApiError(400, 'Invalid status');
    }

    const result = await pool.query(
      `UPDATE rider_kyc 
       SET status = $2, 
           verification_notes = $3,
           verified_by = $4,
           verified_at = NOW()
       WHERE rider_id = $1
       RETURNING *`,
      [riderId, status, notes, verifiedBy]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'KYC record not found');
    }

    // If approved, update rider status
    if (status === 'approved') {
      await pool.query(
        `UPDATE riders SET kyc_verified = true WHERE rider_id = $1`,
        [riderId]
      );
    }

    return result.rows[0];
  }

  async initiateBackgroundCheck(riderId: string) {
    // Check if background check already exists
    const existing = await pool.query(
      `SELECT * FROM rider_background_checks WHERE rider_id = $1`,
      [riderId]
    );

    if (existing.rows.length > 0 && existing.rows[0].status === 'pending') {
      return existing.rows[0];
    }

    // Create background check record
    const result = await pool.query(
      `INSERT INTO rider_background_checks 
       (rider_id, status, initiated_at, provider)
       VALUES ($1, 'pending', NOW(), $2)
       RETURNING *`,
      [riderId, 'checkr'] // Example provider: Checkr
    );

    // In production, integrate with background check provider API
    // Example: Checkr, GoodHire, etc.

    return result.rows[0];
  }

  async getBackgroundCheckStatus(riderId: string) {
    const result = await pool.query(
      `SELECT * FROM rider_background_checks 
       WHERE rider_id = $1 
       ORDER BY initiated_at DESC 
       LIMIT 1`,
      [riderId]
    );

    return result.rows[0] || null;
  }

  async updateBackgroundCheckStatus(
    riderId: string,
    status: string,
    result: any
  ) {
    await pool.query(
      `UPDATE rider_background_checks 
       SET status = $2, 
           result = $3,
           completed_at = NOW()
       WHERE rider_id = $1`,
      [riderId, status, JSON.stringify(result)]
    );

    // Update rider status if clear
    if (status === 'clear') {
      await pool.query(
        `UPDATE riders SET background_check_status = 'clear' WHERE rider_id = $1`,
        [riderId]
      );
    }
  }
}
