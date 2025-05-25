var funcionarioModel = require("../models/funcionarioModel");

function listar(req, res) {
  console.log("Estou na controller");
  funcionarioModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function alterar(req, res) {
  var id = req.params.id;

  var nome = req.body.nomeServer;
  var cargo = req.body.cargoServer;
  var conselho = req.body.conselhoServer;
  var cidade = req.body.cidadeServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (cargo == undefined) {
    res.status(400).send("Seu cargo está undefined!");
  } else if (conselho == undefined) {
    res.status(400).send("Seu conselho está undefined!");
  } else if (cidade == undefined) {
    res.status(400).send("Sua cidade está undefined!");
  } else {

    funcionarioModel.alterar(id, nome, cargo, conselho, cidade)
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

function excluir(req, res) {
  var id = req.params.id;

  funcionarioModel.excluir(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
  listar,
  excluir,
  alterar
};
