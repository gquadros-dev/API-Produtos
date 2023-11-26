import mongoose from 'mongoose';

const LicencaSchema = new mongoose.Schema({
  razao: { type: String, required: true },
  cnpj: { type: String, required: true },
  dataVencimento: { type: Date, required: true },
});

const LicencaModel = mongoose.model('Licenca', LicencaSchema);

class Licenca {
  constructor(body){
    this.body = body;
    this.errors = [];
  }

  store = async () => {
    this.valida();

    if (this.errors.length > 0 ) return;

    await LicencaModel.create(this.body);
  }

  valida = () => {
    this.cleanUp();
    if (!this.body.razao) this.errors.push('"razao" não pode ser vazio');
    if (!this.body.cnpj) this.errors.push('"cnpj" não pode ser vazio');
    if (!this.body.dataVencimento) this.errors.push('"dataVencimento" não pode ser vazio');
  }

  cleanUp = () => {
    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
        }
    }

    this.body = {
      razao: this.body.razao,
      cnpj: this.body.cnpj,
      dataVencimento: this.body.dataVencimento,
    }
  }

  static searchByCNPJ = async (sentCNPJ) => {
    if(typeof sentCNPJ !== 'string') return;
    return await LicencaModel.find({ cnpj: sentCNPJ});
  }
}

export default Licenca;
