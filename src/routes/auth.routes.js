import { Router } from 'express';

import { AuthCtrlr } from '../controllers';
import { users, roles } from '../middlewares';

const router = Router();

router.post('/signup', [ users.userNotExists, roles.isAllowedRoles ], AuthCtrlr.signup);
router.post('/signin', [ users.userExists ], AuthCtrlr.signin);

export default router;