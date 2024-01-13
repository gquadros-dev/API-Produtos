import Licenca from '../models/LicencaModel';

const searchByCNPJ = async (req, res) => {
  try {
    return res.status(200).json(await Licenca.searchByCNPJ(req.params.cnpj));
  } catch (err) {
    return res.status(400).json({ error: 'Bad request' });
  }
}

const searchAll = async (req, res) => {
  try {
    return res.status(200).json(await Licenca.searchAll());
  } catch (err) {
    return res.status(400).json({ error: 'Bad request' });
  }
}

const store = async (req, res) => {
  try {
    const licenca = new Licenca(req.body);
    licenca.store();

    if(licenca.errors.length > 0) {
      console.log(licenca.errors);
      return res.status(400).json(licenca.errors);
    }

    res.json(licenca.body);
  } catch (err) {
    return res.status(400).json(err);
  }
}

export { store, searchByCNPJ, searchAll };
