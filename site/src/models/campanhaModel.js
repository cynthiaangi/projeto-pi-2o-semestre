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

function alterar(id, nome, data){
  var instrucaoSql = `UPDATE campanha SET nomeCampanha = '${nome}', dtCriacao = '${data}' WHERE idCampanha =  ${id}`;

  return database.executar(instrucaoSql);
}

function excluir(id){
  return new Promise((resolve, reject) => {
    // Primeiro: excluir da tabela filha
    const sqlFilha = "DELETE FROM cidadeCampanha WHERE fkCidadeCampanha_Campanha = ?";
    database.query(sqlFilha, [id], function (erroFilha) {
      if (erroFilha) {
        console.error("Erro ao excluir cidadeCampanha:", erroFilha);
        return reject(erroFilha);
      }

      // Segundo: excluir da tabela campanha
      const sqlPai = "DELETE FROM campanha WHERE idCampanha = ?";
      database.query(sqlPai, [id], function (erroPai, resultadoFinal) {
        if (erroPai) {
          console.error("Erro ao excluir campanha:", erroPai);
          return reject(erroPai);
        }

        resolve(resultadoFinal); // sucesso
      });
    });
  });
}


module.exports = {
  listar,
  listarCidades,
  excluirCidade,
  cadastrar,
  alterar,
  excluir
}
