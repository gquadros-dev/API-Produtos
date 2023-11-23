import Empresa from '../models/EmpresaModel';

const searchAll = async (req, res) => {
  try {
    return res.status(200).json( await Empresa.searchAll());
  } catch (err) {
    return res.status(400).json({error: 'Bad request'});
  }
}

const searchByCNPJ = async (req, res) => {
  try {
    return res.status(200).json( await Empresa.searchByCNPJ(req.params.cnpj));
  } catch (err) {
    return res.status(400).json({error: 'Bad request'});
  }
}

const deleteByCNPJ = async (req, res) => {
  try {
    return res.status(200).json(await Empresa.deleteByCNPJ(req.params.cnpj ));
  } catch (err) {
    return res.status(400).json({error: 'Bad Request'});
  }
}

const store = async (req, res) => {
  try {
    const empresa = new Empresa(req.body);
    await empresa.store();

    if(empresa.errors.length > 0) {
      return res.status(400).json(errors);
    }

    res.json(empresa.body);
  } catch (err) {
    return res.status(400).json(err.errors);
  }
}

export { store, deleteByCNPJ, searchByCNPJ, searchAll };
