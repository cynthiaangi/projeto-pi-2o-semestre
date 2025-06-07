var database = require("../database/config")

function listar() {
  console.log("Estou na model");
  var instrucaoSql = `SELECT idPerfil, nomePerfil, podeCadastrarPerfil, podeCadastrarFuncionario, podeCadastrarCampanha FROM perfil;`;

  return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(fkUser, dtAborto, tempo, motivo, descricao, filhos, repeticao, autorizacao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkUser, dtAborto, tempo, motivo, descricao, filhos, repeticao, autorizacao);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO historia (fkUser, dtAborto, tempo, motivo, descricao, filhos, repeticao, autorizacao) VALUES ('${fkUser}', '${dtAborto}', '${tempo}', '${motivo}', '${descricao}', '${filhos}', '${repeticao}', '${autorizacao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    cadastrar
};