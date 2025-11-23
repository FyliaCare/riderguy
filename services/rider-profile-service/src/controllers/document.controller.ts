import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    riderId?: string;
    email: string;
    role: string;
  };
}
import { DocumentService } from '../services/document.service';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

export class DocumentController {
  private documentService: DocumentService;

  constructor() {
    this.documentService = new DocumentService();
  }

  uploadDocument = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;
      const { type } = req.body;
      const file = req.file;

      if (!riderId) {
        throw new ApiError(400, 'Rider ID is required');
      }

      if (!file) {
        throw new ApiError(400, 'File is required');
      }

      if (!type) {
        throw new ApiError(400, 'Document type is required');
      }

      const document = await this.documentService.uploadDocument(
        riderId,
        type,
        file
      );

      logger.info(`Document uploaded for rider ${riderId}, type: ${type}`);

      res.status(201).json({
        success: true,
        data: document,
        message: 'Document uploaded successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  getDocuments = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const riderId = req.params.riderId || req.user?.riderId;

      if (!riderId) {
        throw new ApiError(400, 'Rider ID is required');
      }

      const documents = await this.documentService.getDocuments(riderId);

      res.json({
        success: true,
        data: documents
      });
    } catch (error) {
      next(error);
    }
  };

  getDocument = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { documentId } = req.params;

      const document = await this.documentService.getDocument(documentId);

      if (!document) {
        throw new ApiError(404, 'Document not found');
      }

      res.json({
        success: true,
        data: document
      });
    } catch (error) {
      next(error);
    }
  };

  deleteDocument = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { documentId } = req.params;

      await this.documentService.deleteDocument(documentId);

      logger.info(`Document deleted: ${documentId}`);

      res.json({
        success: true,
        message: 'Document deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  verifyDocument = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { documentId } = req.params;
      const { status, notes } = req.body;

      const document = await this.documentService.verifyDocument(
        documentId,
        status,
        notes
      );

      logger.info(`Document verification updated: ${documentId}, status: ${status}`);

      res.json({
        success: true,
        data: document,
        message: 'Document verification updated'
      });
    } catch (error) {
      next(error);
    }
  };
}
