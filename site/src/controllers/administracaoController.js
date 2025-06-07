var administracaoModel = require("../models/administracaoModel");

function listar(req, res) {
    console.log("Estou na controller");
      funcionarioModel.listar().then((resultado) => {
        res.status(200).json(resultado);
      });
}

function cadastrar(req, res) {

    var fkUser = req.body.fkUserServer;
    var dtAborto = req.body.dtAbortoServer;
    var tempo = req.body.tempoServer;
    var motivo = req.body.motivoServer;
    var descricao = req.body.descricaoServer;
    var filhos = req.body.filhosServer;
    var repeticao = req.body.repeticaoServer;
    var autorizacao = req.body.autorizacaoServer;
    
    if (fkUser == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (dtAborto == undefined) {
        res.status(400).send("Sua data de Nascimento está undefined!");
    } else if (tempo == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (motivo == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("Seu genero está undefined!");
    } else if (filhos == undefined) {
        res.status(400).send("Sua senha está undefined!"); 
    }else if(repeticao == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else if(autorizacao == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else{

        usuarioModel.cadastrar(fkUser, dtAborto, tempo, motivo, descricao, filhos, repeticao, autorizacao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    listar,
    cadastrar
}