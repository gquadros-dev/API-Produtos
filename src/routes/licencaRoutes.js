import express from 'express';
import { searchByCNPJ, store } from '../controllers/licencaController';

const router  = express.Router();

router.get('/:cnpj', searchByCNPJ);
router.post('/', store);

export default router;
