import mongoose from 'mongoose';

const ProdutoSchema = new mongoose.Schema({
  codigo: { type: Number, required: true },
  nome: { type: String, required: true},
  cst: { type: String, required: true},
  origem: { type: String, required: false, default: ''},
  ncm: { type: String, required: true},
  valorVenda: { type: Number, required: true},
  medida: { type: String, required: false, default: ''},
  grupo: { type: Number, required: false, default: 0},
  cnpj: { type: String, required: true},
  ativo: { type: Boolean, required: true},
  sincronizado: { type: Boolean, required: true}
});

const ProdutoModel = mongoose.model('Produto', ProdutoSchema);

function Produto(body)  {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Produto.prototype.register = async function(){
  await this.valida();
  this.contato = await ProdutoModel.create(this.body);
}

Produto.prototype.valida = async function(){
  this.cleanUp();
  if(!this.body.codigo) this.errors.push('"codigo" é um campo obrigatório');
  if(!this.body.nome) this.errors.push('"nome" é um campo obrigatório');
  if(!this.body.cst) this.errors.push('"cst" é um campo obrigatório');
  if(!this.body.ncm) this.errors.push('"ncm" é um campo obrigatório');
  if(!this.body.valorVenda) this.errors.push('"valorVenda" é um campo obrigatório');
  if(!this.body.cnpj) this.errors.push('"cnpj" é um campo obrigatório');
  if(!this.body.ativo) this.errors.push('"ativo" é um campo obrigatório');
  if(!this.body.sincronizado) this.errors.push('"sincronizado" é um campo obrigatório');
}

Produto.prototype.cleanUp = function(){
  for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
          this.body[key] = '';
      }
  }

  this.body = {
    codigo: this.body.codigo,
    nome: this.body.nome,
    cst: this.body.cst,
    origem: this.body.origem,
    ncm: this.body.ncm,
    valorVenda: this.body.valorVenda,
    medida: this.body.medida,
    grupo: this.body.grupo,
    cnpj: this.body.cnpj,
    ativo: this.body.ativo,
    sincronizado: this.body.sincronizado
  }
}

Produto.buscaPorCNPJ = async function(cnpjEnviado){
  if(typeof cnpjEnviado !== 'string') return;
  return await ProdutoModel.find({ cnpj: cnpjEnviado});
}

Produto.buscaProdutos = async function() {
  return await ProdutoModel.find();
}

Produto.delete = async function(cnpjEnviado) {
  if(typeof cnpjEnviado !== 'string') return;
  await ProdutoModel.deleteMany({sincronizado: true, cnpj: cnpjEnviado});
  return {sucesso:'Os produtos já exportados foram excluídos!'};
}

export default Produto;
