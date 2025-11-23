import { Router } from 'express';
import multer from 'multer';
import { DocumentController } from '../controllers/document.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new DocumentController();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

router.post('/:riderId/upload', authenticate, upload.single('file'), controller.uploadDocument);
router.get('/:riderId', authenticate, controller.getDocuments);
router.get('/document/:documentId', authenticate, controller.getDocument);
router.delete('/document/:documentId', authenticate, controller.deleteDocument);
router.put('/document/:documentId/verify', authenticate, controller.verifyDocument);

export { router as documentRoutes };
