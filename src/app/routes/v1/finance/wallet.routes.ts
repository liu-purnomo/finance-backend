import express from 'express';
import { WalletController } from '../../../controllers';
const router = express.Router();

router.get('/', WalletController.index);
router.get('/get-all', WalletController.getAll);
router.post('/', WalletController.create);
router.put('/:id', WalletController.update);
router.get('/:id', WalletController.detail);
router.delete('/:id', WalletController.delete);

export default router;
