import express from 'express';
import { searchByCNPJ, searchAll, store } from '../controllers/licencaController';

const router  = express.Router();

router.get('/:cnpj', searchByCNPJ);
router.get('/', searchAll);
router.post('/', store);

export default router;
