var database = require("../database/config");

function listar() {

  var instrucaoSql = `SELECT * FROM campanha`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarCidades(id) {

  var instrucaoSql = `SELECT idCidadeCampanha, dtAdicionada, fkCidadeCampanha_Cidade FROM cidadeCampanha WHERE fkCidadeCampanha_Campanha = ${id}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function excluirCidade(id){
  var instrucaoSql = `DELETE FROM cidadeCampanha WHERE idCidadeCampanha = ${id};`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome, data) {
  
  var instrucaoSql = `INSERT INTO campanha (nomeCampanha, dtCriacao) VALUES ("${nome}", "${data}")`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarCidade(id, cidade) {
  
  var instrucaoSql = `INSERT INTO cidadeCampanha (fkCidadeCampanha_Cidade, fkCidadeCampanha_Campanha ) VALUES ("${cidade}", "${id}")`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function alterar(id, nome, data){
  var instrucaoSql = `UPDATE campanha SET nomeCampanha = '${nome}', dtCriacao = '${data}' WHERE idCampanha =  ${id}`;

  return database.executar(instrucaoSql);
}

function excluir(id){
  return database.executar(`DELETE FROM cidadeCampanha WHERE fkCidadeCampanha_Campanha = ${id};`).then(() => {
    return database.executar(`DELETE FROM campanha WHERE idCampanha = ${id};`)
  });
}


module.exports = {
  listar,
  listarCidades,
  excluirCidade,
  cadastrar,
  cadastrarCidade,
  alterar,
  excluir
}
