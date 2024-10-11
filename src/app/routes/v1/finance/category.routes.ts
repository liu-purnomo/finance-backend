import express from 'express';
import { CategoryController } from '../../../controllers';
const router = express.Router();

router.get('/', CategoryController.index);
router.get('/get-all', CategoryController.getAll);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.get('/:id', CategoryController.detail);
router.delete('/:id', CategoryController.delete);

export default router;
