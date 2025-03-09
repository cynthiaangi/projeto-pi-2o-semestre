var database = require("../database/config");

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT 
            h.idHistoria AS idHistoria,
            h.dtAborto,
            h.tempo AS semanas,
            h.motivo,
            h.descricao,
            h.filhos,
            h.repeticao,
            h.autorizacao,
            h.fkUser,
            c.idCadastro AS idCadastro,
            c.nome,
            c.email,
            c.senha
        FROM historia as h
            INNER JOIN cadastro as c
                ON h.fkUser = c.idCadastro
        WHERE h.autorizacao = 'sim' ORDER BY idHistoria DESC LIMIT 3;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function postarKpi() {
    var instrucaoSql = `
        SELECT count(motivo) AS soma FROM historia WHERE motivo = '';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function postarKpi2() {
    var instrucaoSql = `
        SELECT count(filhos) AS filho FROM historia WHERE filhos = 'sim';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function postarKpi3() {
    var instrucaoSql = `
        SELECT count(tempo) AS semanas FROM historia WHERE tempo > 12;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function postarKpi4() {
    var instrucaoSql = `
        SELECT count(repeticao) AS aborto FROM historia WHERE repeticao = 'Sim';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario() {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
        SELECT 
            h.idHistoria AS idHistoria,
            h.dtAborto,
            h.tempo AS semanas,
            h.motivo,
            h.descricao,
            h.filhos,
            h.repeticao,
            h.autorizacao,
            h.fkUser,
            c.idCadastro AS idCadastro,
            c.nome,
            c.email,
            c.senha
        FROM historia as h
            INNER JOIN cadastro as c
                ON h.fkUser = c.idCadastro
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function calcularTotal() {
    var instrucaoSql = `
        SELECT count(idHistoria) AS total FROM historia;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(novaDescricao, idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucaoSql = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function deletar(idAviso) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
//     var instrucaoSql = `
//         DELETE FROM aviso WHERE id = ${idAviso};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

module.exports = {
    listar,
    listarPorUsuario,
    postarKpi,
    postarKpi2,
    postarKpi3,
    postarKpi4,
    calcularTotal,
    editar
}
