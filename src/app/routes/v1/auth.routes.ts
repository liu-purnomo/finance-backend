import express from 'express';
import { AuthController } from '../../controllers';
import { Authentication } from '../../middlewares';
const router = express.Router();

router.post('/register', AuthController.register);
router.post('/verify', AuthController.verify);
router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/change-password', Authentication.login, AuthController.changePassword);

export default router;
