import express from 'express';
const router = express.Router();

import { Authentication } from '../../middlewares';
import auth from './auth.routes';
import finance from './finance';
import user from './user.routes';

router.use('/auth', auth);
router.use('/finance', Authentication.login, finance);
router.use('/user', Authentication.login, user);

export default router;
