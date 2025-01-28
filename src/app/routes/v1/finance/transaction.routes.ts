import express from 'express';
import { TransactionController } from '../../../controllers';
const router = express.Router();

router.get('/', TransactionController.index);
router.post('/', TransactionController.create);
router.get('/summary-all', TransactionController.getSummaryTransaction);
router.post('/transfer', TransactionController.transfer);
router.get('/summary/:walletId', TransactionController.getSummary);
router.delete('/:id', TransactionController.delete);
router.put('/:id', TransactionController.update);

export default router;
