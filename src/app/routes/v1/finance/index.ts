import express from 'express';
const router = express.Router();

import wallet from './wallet.routes';

router.use('/wallet', wallet);

export default router;
