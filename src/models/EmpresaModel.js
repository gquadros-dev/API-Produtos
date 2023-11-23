import mongoose from 'mongoose';

const EmpresaSchema = new mongoose.Schema({
  nome: { type: String, required: true},
  cnpj: { type: String, required: true},
  token: { type: String, required: false, default: ''},
});

const EmpresaModel = mongoose.model('Empresa', EmpresaSchema);

class Empresa {
  constructor(body){
    this.body = body;
    this.errors = [];
  }

  store = async () => {
    this.valida();
    await EmpresaModel.create(this.body);
  }

  valida = async () => {
    this.cleanUp();
    if(!this.body.nome) this.errors.push('"nome" é um campo obrigatório');
    if(!this.body.cnpj) this.errors.push('"cnpj" é um campo obrigatório');
  }

  cleanUp = () => {
    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
        }
    }

    this.body = {
      nome: this.body.nome,
      cnpj: this.body.cnpj,
      token: this.body.token
    }
  }

  static searchByCNPJ = async (sentCNPJ) => {
    if(typeof sentCNPJ !== 'string') return;
    return await EmpresaModel.find({ cnpj: sentCNPJ});
  }

  static searchAll = async () => {
    return await EmpresaModel.find();
  }

  static deleteByCNPJ = async (cnpjEnviado) => {
    await EmpresaModel.deleteOne({ cnpj: cnpjEnviado });
    return { success: 'A empresa foi excluída!' };
  }
}

export default Empresa;
