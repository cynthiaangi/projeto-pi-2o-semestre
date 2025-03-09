var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha
                                    });
                                
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
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
    autenticar,
    cadastrar
}