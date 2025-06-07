var database = require("../database/config")

function listar() {
  console.log("Estou na model");
  var instrucaoSql = `SELECT * FROM perfil;`;

  return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, perfil, funcionario, campanha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, perfil, funcionario, campanha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO perfil (nomePerfil, podeCadastrarPerfil, podeCadastrarFuncionario, podeCadastrarCampanha) VALUES ('${nome}', '${perfil}', '${funcionario}', '${campanha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterar(id, nome, perfil, funcionario, campanha){
  var instrucaoSql = `UPDATE perfil SET nomePerfil = '${nome}', podeCadastrarPerfil = '${perfil}', podeCadastrarFuncionario = '${funcionario}', podeCadastrarCampanha = '${campanha}' WHERE idUsuario =  ${id}`;

  return database.executar(instrucaoSql);
}

function excluir(id){
  return database.executar(`UPDATE usuarios SET fkUsuarios_Perfil = null WHERE fkUsuarios_Perfil = ${id};`).then(() => {
    return database.executar(`DELETE FROM perfil WHERE idPerfil = ${id};`)
  });
}

module.exports = {
    listar,
    cadastrar,
    alterar,
    excluir
};