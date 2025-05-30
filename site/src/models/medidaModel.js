var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    FROM medida
                    WHERE fk_aquario = ${idAquario}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        FROM medida WHERE fk_aquario = ${idAquario} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarDoenca(doenca) {

    var instrucaoSql = `SELECT idDoenca, nomeDoenca FROM doencas WHERE nomeDoenca = '${doenca}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarDoencaCidade(doenca, cidade) {

    var instrucaoSql = `SELECT casos.anoReferencia, casos.quantidadeCasos FROM casos JOIN doencas 
    ON casos.fkCasos_Doenca = doencas.idDoenca JOIN cidades ON casos.fkCasos_Cidade = cidades.codigoIbge WHERE 
    cidades.nome = ${cidade} AND doencas.nomeDoenca = ${doenca} LIMIT 1`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    alterarDoenca,
    alterarDoencaCidade
}
