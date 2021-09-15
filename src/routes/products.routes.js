import { Router } from 'express';

import { ProductCtrlr } from '../controllers';
import { authJwt, roles } from '../middlewares';

const router = Router();

router.get('/', ProductCtrlr.getProducts);
router.post('/', [ authJwt.verifyToken, roles.isAdmin ], ProductCtrlr.createProduct);
router.get('/:productId', ProductCtrlr.getProductById);
router.put('/:productId', [ authJwt.verifyToken, roles.isAdmin ], ProductCtrlr.updateProductById);
router.delete('/:productId', [ authJwt.verifyToken, roles.isAdmin ], ProductCtrlr.deleteProductById);

export default router;