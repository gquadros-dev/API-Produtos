import Produto from '../models/ProdutoModel';

exports.index = async (req, res) => {
  try {
    return res.status(200).json( await Produto.buscaProdutos());
  } catch (err) {
    return res.status(400).json({error: 'Bad request'});
  }
}

exports.buscaPorCNPJ = async (req, res) => {
  try {
    return res.status(200).json( await Produto.buscaPorCNPJ(req.params.cnpj));
  } catch (err) {
    return res.status(400).json({error: 'Bad request'});
  }
}

exports.deletePorCNPJ = async (req, res) => {
  try {
    return res.status(200).json(await Produto.delete(req.params.cnpj));
  } catch (err) {
    return res.status(400).json({error: 'Bad Request'});
  }
}

exports.register = async (req, res) => {
  try {
    const produto = new Produto(req.body);
    await produto.register();

    if(produto.errors.length > 0) {
      return res.status(400).json(errors);
    }

    res.json(produto);
  } catch (err) {
    return res.status(400).json(err.errors);
  }
}
