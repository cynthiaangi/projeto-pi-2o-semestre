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

function alterar(id, nome, cargo, conselho, cidade){
  var instrucaoSql = `UPDATE usuarios SET nomeCompleto = '${nome}', cargoExercido = '${cargo}', numConselho = '${conselho}', fkCidadeResidente = '${cidade}' WHERE idUsuario =  ${id}`;

  return database.executar(instrucaoSql);
}

function alterarSenha(id, senha){
  var instrucaoSql = `UPDATE usuarios SET senha = '${senha}' WHERE idUsuario =  ${id}`;

  return database.executar(instrucaoSql);
}

module.exports = { listar, excluir, alterar, alterarSenha };
