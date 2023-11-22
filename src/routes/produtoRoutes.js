import express from 'express';
import produtoController from '../controllers/produtoController';

const router  = express.Router();

router.get('/', produtoController.index);
router.get('/:cnpj', produtoController.buscaPorCNPJ);
router.delete('/:cnpj', produtoController.deletePorCNPJ);
router.post('/', produtoController.register);

export default router;
