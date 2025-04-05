var loginModel = require("../models/loginModel");

function autenticar(req, res) {
    var conselho = req.body.conselhoServer;
    var senha = req.body.senhaServer;

    if (conselho == undefined) {
        res.status(400).send("Seu conselho está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        loginModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                                    res.json({
                                        id: resultadoAutenticar[0].idCadastro,
                                        conselho: resultadoAutenticar[0].conselho,
                                        nome: resultadoAutenticar[0].nome,

                                    });
                                
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Número do conselho e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                        
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var dtNasc = req.body.dtNascServer;
    var cargo = req.body.cargoServer;
    var conselho = req.body.conselhoServer;
    var cidade = req.body.cidadeServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (dtNasc == undefined) {
        res.status(400).send("Sua data de Nascimento está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (conselho == undefined) {
        res.status(400).send("Seu conselho está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Seu cidade está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!"); 
    }else{

        loginModel.cadastrar(nome, dtNasc, cargo, conselho, cidade, senha)
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
    autenticar,
    cadastrar
}