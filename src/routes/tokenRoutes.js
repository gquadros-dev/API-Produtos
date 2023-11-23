import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const router = new Router();

router.post('/token/', tokenController.store);

export default router;
