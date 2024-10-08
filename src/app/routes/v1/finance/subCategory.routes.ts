import express from 'express';
import { SubCategoryController } from '../../../controllers';
const router = express.Router();

router.get('/', SubCategoryController.index);
router.get('/get-all', SubCategoryController.getAll);
router.post('/', SubCategoryController.create);
router.put('/:id', SubCategoryController.update);
router.get('/:id', SubCategoryController.detail);
router.delete('/:id', SubCategoryController.delete);

export default router;
