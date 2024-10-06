import express from 'express';
const router = express.Router();

import transaction from './transaction.routes';
import wallet from './wallet.routes';

router.use('/wallet', wallet);
router.use('/transaction', transaction);

export default router;
