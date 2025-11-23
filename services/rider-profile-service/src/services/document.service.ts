import { Pool } from 'pg';
import { S3 } from 'aws-sdk';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../utils/api-error';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const s3 = new S3({ region: process.env.AWS_REGION || 'us-east-1' });

const BUCKET_NAME = process.env.S3_BUCKET || 'riderguy-documents';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export class DocumentService {
  async uploadDocument(riderId: string, type: string, file: UploadedFile) {
    if (file.size > MAX_FILE_SIZE) {
      throw new ApiError(400, 'File size exceeds 10MB limit');
    }

    const allowedTypes = [
      'national_id',
      'drivers_license',
      'vehicle_registration',
      'insurance',
      'proof_of_address',
      'bank_statement',
      'profile_photo'
    ];

    if (!allowedTypes.includes(type)) {
      throw new ApiError(400, 'Invalid document type');
    }

    // Process image if it's a photo
    let buffer = file.buffer;
    if (file.mimetype.startsWith('image/')) {
      buffer = await sharp(file.buffer)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();
    }

    const documentId = uuidv4();
    const key = `riders/${riderId}/documents/${type}/${documentId}_${file.originalname}`;

    // Upload to S3
    await s3.putObject({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.mimetype,
      Metadata: {
        riderId,
        documentType: type,
        uploadedAt: new Date().toISOString()
      }
    }).promise();

    const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    // Save to database
    const result = await pool.query(
      `INSERT INTO rider_documents 
       (document_id, rider_id, type, url, filename, file_size, mime_type, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
       RETURNING *`,
      [documentId, riderId, type, url, file.originalname, buffer.length, file.mimetype]
    );

    return result.rows[0];
  }

  async getDocuments(riderId: string) {
    const result = await pool.query(
      `SELECT * FROM rider_documents 
       WHERE rider_id = $1 
       ORDER BY uploaded_at DESC`,
      [riderId]
    );

    return result.rows;
  }

  async getDocument(documentId: string) {
    const result = await pool.query(
      `SELECT * FROM rider_documents WHERE document_id = $1`,
      [documentId]
    );

    return result.rows[0] || null;
  }

  async deleteDocument(documentId: string) {
    const document = await this.getDocument(documentId);

    if (!document) {
      throw new ApiError(404, 'Document not found');
    }

    // Extract S3 key from URL
    const urlParts = document.url.split('.com/');
    const key = urlParts[1];

    // Delete from S3
    await s3.deleteObject({
      Bucket: BUCKET_NAME,
      Key: key
    }).promise();

    // Delete from database
    await pool.query(
      `DELETE FROM rider_documents WHERE document_id = $1`,
      [documentId]
    );
  }

  async verifyDocument(documentId: string, status: string, notes?: string) {
    const allowedStatuses = ['approved', 'rejected', 'pending'];

    if (!allowedStatuses.includes(status)) {
      throw new ApiError(400, 'Invalid status');
    }

    const result = await pool.query(
      `UPDATE rider_documents 
       SET status = $2, verification_notes = $3, verified_at = NOW()
       WHERE document_id = $1
       RETURNING *`,
      [documentId, status, notes]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Document not found');
    }

    return result.rows[0];
  }
}
