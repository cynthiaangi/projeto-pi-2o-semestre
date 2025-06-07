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


module.exports = {
  listar,
  listarCidades,
  excluirCidade,
  cadastrar
}
