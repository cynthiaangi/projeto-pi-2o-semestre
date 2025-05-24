var database = require("../database/config");

function listar() {
  console.log("Estou na model");
  var instrucaoSql = `SELECT idUsuario, nomeCompleto, cargoExercido, numConselho, fkCidadeResidente FROM usuarios;`;

  return database.executar(instrucaoSql);
}

function excluir(id){
  var instrucaoSql = `DELETE FROM usuarios WHERE idUsuario = ${id};`;

  return database.executar(instrucaoSql);
}

module.exports = { listar, excluir };
