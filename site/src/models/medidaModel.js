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

function alterarDoencaCidade(cidade) {

    var instrucaoSql = `SELECT casos.anoReferencia, casos.quantidadeCasos FROM casos JOIN doencas 
    ON casos.fkCasos_Doenca = doencas.idDoenca JOIN cidades ON casos.fkCasos_Cidade = cidades.codigoIbge WHERE 
    cidades.nome = ${cidade} AND doencas.nomeDoenca = ${doenca} LIMIT 1`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function variacaoCasos(id) {

    var instrucaoSql = `SELECT
    ROUND(
        AVG(
            (
                (c1.quantidadeCasos - c2.quantidadeCasos) 
                / NULLIF(c2.quantidadeCasos, 0)
            ) * 100
        ),
        2
    ) AS variacaoPercentualCasos
FROM casos c1
JOIN casos c2
    ON c1.fkCasos_Doenca = c2.fkCasos_Doenca
    AND c1.fkCasos_Cidade = c2.fkCasos_Cidade
    AND c1.anoReferencia = c2.anoReferencia + 1
JOIN doencas d ON c1.fkCasos_Doenca = d.idDoenca
WHERE
    d.idDoenca = ${id}
    AND c1.anoReferencia = 2024
    AND c2.anoReferencia = 2023
    AND c1.quantidadeCasos IS NOT NULL
    AND c2.quantidadeCasos IS NOT NULL;`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function variacaoCasosCidade(id, cidade) {

    var instrucaoSql = `SELECT c.nome AS cidade, SUM(CASE WHEN ca.anoReferencia = 2023 THEN ca.quantidadeCasos ELSE 0 END) AS total_2023, SUM(CASE WHEN ca.anoReferencia = 2024 THEN ca.quantidadeCasos ELSE 0 END) AS total_2024, ROUND(CASE WHEN SUM(CASE WHEN ca.anoReferencia = 2023 THEN ca.quantidadeCasos ELSE 0 END) = 0 THEN NULL ELSE ((SUM(CASE WHEN ca.anoReferencia = 2024 THEN ca.quantidadeCasos ELSE 0 END) - SUM(CASE WHEN ca.anoReferencia = 2023 THEN ca.quantidadeCasos ELSE 0 END)) * 100.0) / SUM(CASE WHEN ca.anoReferencia = 2023 THEN ca.quantidadeCasos ELSE 0 END) END, 2) AS variacaoPercentual FROM casos ca JOIN doencas d ON ca.fkCasos_Doenca = d.idDoenca JOIN cidades c ON ca.fkCasos_Cidade = c.codigoIbge WHERE d.idDoenca = ${id} AND c.codigoIbge = ${cidade} AND ca.anoReferencia IN (2023, 2024) GROUP BY c.nome;`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function variacaoCoberturaVacinalCidade(id, cidade) {

    var instrucaoSql = `SELECT c.nome AS cidade, d.nomeDoenca, ROUND(AVG(CASE WHEN o.anoReferencia = 2023 THEN LEAST(o.coberturaVacinal, 100) ELSE NULL END), 2) AS cobertura_2023, ROUND(AVG(CASE WHEN o.anoReferencia = 2024 THEN LEAST(o.coberturaVacinal, 100) ELSE 0 END), 2) AS cobertura_2024, ROUND(CASE WHEN AVG(CASE WHEN o.anoReferencia = 2023 THEN LEAST(o.coberturaVacinal, 100) ELSE NULL END) = 0 THEN NULL ELSE ((AVG(CASE WHEN o.anoReferencia = 2024 THEN LEAST(o.coberturaVacinal, 100) ELSE 0 END) - AVG(CASE WHEN o.anoReferencia = 2024 THEN LEAST(o.coberturaVacinal, 100) ELSE NULL END)) * 100.0) / AVG(CASE WHEN o.anoReferencia = 2023 THEN LEAST(o.coberturaVacinal, 100) ELSE NULL END) END, 2) AS variacaoPercentual FROM ocorrencias o JOIN doencas d ON o.fkDoenca = d.idDoenca JOIN cidades c ON o.fkCidade = c.codigoIbge WHERE d.idDoenca = ${id} AND c.codigoIbge = ${cidade} AND o.anoReferencia IN (2023, 2024) GROUP BY c.nome, d.nomeDoenca;`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function variacaoCoberturaVacinal(id) {

    var instrucaoSql = `SELECT
    ROUND(
        AVG(
            (
                (LEAST(o1.coberturaVacinal, 100) - LEAST(o2.coberturaVacinal, 100)) 
                / LEAST(o2.coberturaVacinal, 100)
            ) * 100
        ),
        2
    ) AS variacaoPercentualMedia
FROM ocorrencias o1
JOIN ocorrencias o2
    ON o1.fkDoenca = o2.fkDoenca
    AND o1.fkCidade = o2.fkCidade
    AND o1.anoReferencia = o2.anoReferencia + 1
JOIN doencas d ON o1.fkDoenca = d.idDoenca
WHERE
    d.idDoenca = ${id}
    AND o1.anoReferencia = 2024
    AND o2.anoReferencia = 2023
    AND o1.coberturaVacinal IS NOT NULL
    AND o2.coberturaVacinal IS NOT NULL;`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function variacaoVacinados(id) {

    var instrucaoSql = `SELECT ROUND(AVG(coberturaVacinal), 2) as total_vacinados FROM ocorrencias WHERE anoReferencia = 2024 and fkDoenca = ${id};`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function variacaoVacinadosCidade(id, cidade) {

    var instrucaoSql = `SELECT ROUND(AVG(coberturaVacinal), 2) as total_vacinados FROM ocorrencias WHERE anoReferencia = 2024 and fkDoenca = ${id} and fkCidade = ${cidade};`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function graficoCasosAnoCidade(id, cidade) {

    var instrucaoSql = `SELECT anoReferencia, SUM(quantidadeCasos) as totalCasos FROM casos WHERE fkCasos_Doenca = ${id} AND fkCasos_Cidade = ${cidade} GROUP BY anoReferencia;`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function graficoCasosAno(id) {

    var instrucaoSql = `SELECT anoReferencia, SUM(quantidadeCasos) as totalCasos FROM casos WHERE fkCasos_Doenca = ${id} GROUP BY anoReferencia;`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function graficoRankingAlerta(id) {

    var instrucaoSql = `SELECT c.nome AS cidade, ROUND(AVG(o.coberturaVacinal), 2) AS coberturaVacinal FROM ocorrencias o JOIN cidades c ON o.fkCidade = c.codigoIbge WHERE o.fkDoenca = ${id} AND o.anoReferencia = 2024 GROUP BY c.nome ORDER BY coberturaVacinal ASC LIMIT 10;`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function criarGraficoSituacao85Cobertura(id) {

    var instrucaoSql = `SELECT COUNT(*) AS total_cidades_baixo_85
FROM (
    SELECT
        o.fkCidade,
        ROUND(AVG(o.coberturaVacinal), 2) AS media_cobertura
    FROM ocorrencias o
    JOIN (
        SELECT
            fkCidade,
            MAX(anoReferencia) AS maxAno
        FROM ocorrencias
        WHERE fkDoenca = ${id}
        GROUP BY fkCidade
    ) maxAnos ON o.fkCidade = maxAnos.fkCidade AND o.anoReferencia = maxAnos.maxAno
     WHERE fkDoenca = ${id}
    GROUP BY o.fkCidade
    HAVING media_cobertura < 85  
) sub;`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function criarGraficoSituacao95Cobertura(id) {

    var instrucaoSql = `SELECT COUNT(*) AS total_cidades_acima_95
FROM (
    SELECT
        o.fkCidade,
        ROUND(AVG(o.coberturaVacinal), 2) AS media_cobertura
    FROM ocorrencias o
    JOIN (
        SELECT
            fkCidade,
            MAX(anoReferencia) AS maxAno
        FROM ocorrencias
        WHERE fkDoenca = ${id}
        GROUP BY fkCidade
    ) maxAnos ON o.fkCidade = maxAnos.fkCidade AND o.anoReferencia = maxAnos.maxAno
     WHERE fkDoenca = ${id}
    GROUP BY o.fkCidade
    HAVING media_cobertura > 95
) sub;`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function graficoRankingMelhores(id){
    var instrucaoSql = `SELECT c.nome AS cidade, ROUND(AVG(o.coberturaVacinal), 2) AS coberturaVacinal FROM ocorrencias o JOIN cidades
c ON o.fkCidade = c.codigoIbge WHERE o.fkDoenca = ${id} AND o.anoReferencia = 2024 GROUP BY c.nome ORDER BY coberturaVacinal DESC LIMIT 5;`

    console.log("Executando a instruçao no SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    alterarDoenca,
    alterarDoencaCidade,
    variacaoCoberturaVacinal,
    variacaoCasos,
    variacaoCasosCidade,
    variacaoCoberturaVacinalCidade,
    criarGraficoSituacao95Cobertura,
    criarGraficoSituacao85Cobertura,
    variacaoVacinados,
    variacaoVacinadosCidade,
    graficoCasosAno,
    graficoRankingAlerta,
    graficoRankingMelhores,
    graficoCasosAnoCidade
}
