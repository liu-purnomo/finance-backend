import express from 'express';
import { TransactionController } from '../../../controllers';
const router = express.Router();

router.post('/', TransactionController.create);
router.get('/summary/:walletId', TransactionController.getSummary);
router.delete('/:id', TransactionController.delete);

export default router;
