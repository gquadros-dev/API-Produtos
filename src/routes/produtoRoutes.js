import express from 'express';
import { searchAll, searchByCNPJ, deleteAll, deleteById, store } from '../controllers/produtoController';

const router  = express.Router();

router.get('/', searchAll);
router.get('/:cnpj', searchByCNPJ);
router.delete('/', deleteAll);
router.delete('/:id', deleteById);
router.post('/', store);

export default router;
