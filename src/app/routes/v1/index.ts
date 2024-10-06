import express from 'express';
const router = express.Router();

import { Authentication } from '../../middlewares';
import auth from './auth.routes';
import finance from './finance';

router.use('/auth', auth);
router.use('/finance', Authentication.login, finance);

export default router;
