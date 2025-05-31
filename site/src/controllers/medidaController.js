var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idAquario = req.params.idAquario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idAquario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function alterarDoenca(req, res) {
    var doenca = req.body.doencaServer;

    if (doenca == undefined) {
        res.status(400).send("Sua doença está undefined!");
    } else {

        medidaModel.alterarDoenca(doenca)
            .then(
                function (resultadoDoenca) {
                    console.log(`\nResultados encontrados: ${resultadoDoenca.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoDoenca)}`); // transforma JSON em String

                    if (resultadoDoenca.length == 1) {

                        res.json({
                            idDoenca: resultadoDoenca[0].idDoenca,
                            nomeDoenca: resultadoDoenca[0].nomeDoenca
                        });

                    } else if (resultadoDoenca.length == 0) {
                        res.status(403).send("Doença não encontrada");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao trocar a doença! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function alterarDoencaCidade(req, res) {
    var doenca = req.body.doencaServer;
    var cidade = req.body.cidadeServer;

    if (doenca == undefined) {
        res.status(400).send("Sua doença está undefined!");
    }
    else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined")
    }
    else {
        medidaModel.alterarDoencaCidade(doenca, cidade)
            .then(
                function (resultadoDoencaCidade) {
                    console.log(`\nResultados encontrados: ${resultadoDoenca.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoDoencaCidade)}`); // transforma JSON em String

                    if (resultadoDoencaCidade.length == 1) {

                        res.json({
                            anoReferencia: resultadoDoencaCidade[0].anoReferencia,
                            quantidadedeCasos: resultadoDoencaCidade[0].quantidadedeCasos
                        });

                    } else if (resultadoDoencaCidade.length == 0) {
                        res.status(403).send("Doença ou cidade não encontrada");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao trocar a doença ou a cidade! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function alterarCidade(req, res) {
    var cidade = req.body.cidadeServer;

    if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined")
    }
    else {
        medidaModel.alterarCidade(cidade)
            .then(
                function (resultadoCidade) {
                    console.log(`Resultados: ${JSON.stringify(resultadoCidade)}`); // transforma JSON em String

                    if (resultadoCidade.length == 1) {

                        res.json({
                            anoReferencia: resultadoCidade[0].anoReferencia,
                            quantidadedeCasos: resultadoCidade[0].quantidadedeCasos
                        });

                    } else if (resultadoCidade.length == 0) {
                        res.status(403).send("Cidade não encontrada");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao trocar a cidade! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function variacaoCoberturaVacinal(req, res) {
    var id = req.params.idDoenca;

    medidaModel.variacaoCoberturaVacinal(id)
        .then((resultado) => {

            res.status(200).json(resultado);
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao calcular a variação da cobertura vacinal ! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function variacaoCasos(req, res) {
    var id = req.params.idDoenca;

    medidaModel.variacaoCasos(id)
        .then((resultado) => {

            res.status(200).json(resultado);
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao trocar a variação de casos da doemça! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function criarGraficoSituacaoCobertura(req, res) {
    var id = req.params.idDoenca;

    medidaModel.criarGraficoSituacaoCobertura(id)
        .then((resultado) => {

            res.status(200).json(resultado);
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao trocar a variação de casos da doemça! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}




module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    alterarDoenca,
    alterarDoencaCidade,
    alterarCidade,
    variacaoCoberturaVacinal,
    variacaoCasos,
    criarGraficoSituacaoCobertura
}