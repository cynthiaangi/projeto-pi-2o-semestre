var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT idUsuario, nomeCompleto, cargoExercido, numConselho, fkCidadeResidente FROM usuarios;`;

  return database.executar(instrucaoSql);
}

module.exports = { listar };
