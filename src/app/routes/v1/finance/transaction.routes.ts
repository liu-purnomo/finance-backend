import express from 'express';
import { TransactionController } from '../../../controllers';
const router = express.Router();

router.post('/', TransactionController.create);

export default router;
