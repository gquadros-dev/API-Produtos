import Produto from '../models/ProdutoModel';

const searchAll = async (req, res) => {
  try {
    return res.status(200).json( await Produto.searchAll());
  } catch (err) {
    return res.status(400).json({error: 'Bad request'});
  }
}

const searchByCNPJ = async (req, res) => {
  try {
    return res.status(200).json( await Produto.searchByCNPJ(req.params.cnpj));
  } catch (err) {
    return res.status(400).json({error: 'Bad request'});
  }
}

const deleteAll = async (req, res) => {
  try {
    return res.status(200).json(await Produto.deleteAll());
  } catch (err) {
    return res.status(400).json({error: 'Bad Request'});
  }
}

const deleteById = async (req, res) => {
  try {
    res.status(200).json(await Produto.deleteId(req.params.id));
  } catch (err) {
    return res.status(400).json({ error: 'Bad request' });
  }
}

const store = async (req, res) => {
  try {
    const produto = new Produto(req.body);
    await produto.store();

    if(produto.errors.length > 0) {
      return res.status(400).json(errors);
    }

    res.json(produto.body);
  } catch (err) {
    return res.status(400).json(err.errors);
  }
}

export { store, deleteAll, deleteById, searchByCNPJ, searchAll };
