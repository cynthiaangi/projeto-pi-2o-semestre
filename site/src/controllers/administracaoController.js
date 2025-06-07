var administracaoModel = require("../models/administracaoModel");

function listar(req, res) {
    console.log("Estou na controller");
      administracaoModel.listar().then((resultado) => {
        res.status(200).json(resultado);
      })
       .catch((erro) => {
            console.error("Erro ao listar perfis:", erro);
            res.status(500).json({ erro: "Erro interno ao listar perfis." });
        });
}

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var perfil = req.body.perfilServer;
    var funcionario = req.body.funcionarioServer;
    var campanha = req.body.campanhaServer;

    
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (perfil == undefined) {
        res.status(400).send("Sua data de Nascimento está undefined!");
    } else if (funcionario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (campanha == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    }else{

        administracaoModel.cadastrar(nome, perfil, funcionario, campanha)
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

function alterar(req, res) {
  var id = req.params.id;

  var nome = req.body.nomeServer;
  var perfil = req.body.perfilServer;
  var funcionario = req.body.funcionarioServer;
  var campanha = req.body.campanhaServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (perfil == undefined) {
    res.status(400).send("Seu cargo está undefined!");
  } else if (funcionario == undefined) {
    res.status(400).send("Seu conselho está undefined!");
  } else if (campanha == undefined) {
    res.status(400).send("Sua cidade está undefined!");
  } else {

    administracaoModel.alterar(id, nome, perfil, funcionario, campanha)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {

          console.log(erro);
          console.log(
            "\nHouve um erro ao tentar editar perfil! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }

}

function excluir(req, res) {
  var id = req.params.id;

  administracaoModel.excluir(id)
  .then((resultado) => {
    res.status(200).json(resultado);
  })
  .catch(erro => {
      console.error("Erro no controller ao excluir:", erro);
      res.status(500).json({ erro: "Erro ao excluir campanha" });
    });
}

module.exports = {
    listar,
    cadastrar,
    alterar,
    excluir
}