import { Router } from 'express';
import { ProductCtrlr } from '../controllers';

const router = Router();

router.get('/', ProductCtrlr.getProducts);
router.post('/', ProductCtrlr.createProduct);
router.get('/:productId', ProductCtrlr.getProductById);
router.put('/:productId', ProductCtrlr.updateProductById);
router.delete('/:productId', ProductCtrlr.deleteProductById);

export default router;