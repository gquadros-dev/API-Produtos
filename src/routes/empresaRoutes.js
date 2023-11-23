import express from 'express';
import { searchAll, searchByCNPJ, deleteByCNPJ, store } from '../controllers/empresaController';

const router  = express.Router();

router.get('/', searchAll);
router.get('/:cnpj', searchByCNPJ);
router.delete('/:cnpj', deleteByCNPJ);
router.post('/', store);

export default router;
