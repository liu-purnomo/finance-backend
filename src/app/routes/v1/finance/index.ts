import express from 'express';
const router = express.Router();

import category from './category.routes';
import transaction from './transaction.routes';
import wallet from './wallet.routes';

router.use('/wallet', wallet);
router.use('/transaction', transaction);
router.use('/category', category);

export default router;
