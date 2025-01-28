import express from 'express';
import { BudgetController } from '../../../controllers';
const router = express.Router();

router.get('/', BudgetController.index);
router.get('/get-all', BudgetController.getAll);
router.post('/', BudgetController.create);
router.put('/:id', BudgetController.update);
router.get('/:id', BudgetController.detail);
router.delete('/:id', BudgetController.delete);

export default router;
