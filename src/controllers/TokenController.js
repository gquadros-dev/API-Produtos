import jwt from 'jsonwebtoken';
import Empresa from '../models/EmpresaModel';

class TokenController {
  async store(req, res) {
    const { cnpj = '' } = req.body;

    if (!cnpj) {
      return res.status(400).json({
        errors: ['"cnpj" inválido'],
      });
    }

    const empresa = await Empresa.findOne({ where: { cnpj } });

    if (!empresa) {
      return res.status(401).json({
        errors: ['Empresa não existe'],
      });
    }

    const { _id } = empresa;
    const token = jwt.sign({ _id, cnpj }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenController();
