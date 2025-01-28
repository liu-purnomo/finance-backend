import express from 'express';
import { UserController } from '../../controllers';
const router = express.Router();

router.get('/my-profile', UserController.myProfile);
router.put('/update', UserController.update);
router.delete('/delete', UserController.delete);
router.put('/change-password', UserController.changePassword);

export default router;
