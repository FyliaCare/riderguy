import { Router } from 'express';
import { WelfareController } from '../controllers/welfare.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();
const controller = new WelfareController();

router.post('/apply', authenticate, controller.applyForLoan);
router.get('/', authenticate, controller.getLoans);
router.post('/:loanId/approve', authenticate, controller.approveLoan);

export { router as loanRoutes };
