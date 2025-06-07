var campanhaModel = require("../models/campanhaModel");

function listar(req, res) {

  campanhaModel.listar().then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao listar campanhas ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function listarCidades(req, res) {
  var id = req.params.id;

  campanhaModel.listarCidades(id).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao listar campanhas ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function excluirCidade(req, res) {
  var id = req.params.id;

  campanhaModel.excluirCidade(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}


function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var data = req.body.dataServer;

  if (nome == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (data == undefined) {
    res.status(400).send("idUsuario está undefined!");
  } else {


    campanhaModel.cadastrar(nome, data)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function alterar(req, res) {
  var id = req.params.id;

  var nome = req.body.nomeServer;
  var data = req.body.dataServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (data == undefined) {
    res.status(400).send("Seu data está undefined!");
  } else {

    campanhaModel.alterar(id, nome, data)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {

          console.log(erro);
          console.log(
            "\nHouve um erro ao tentar atualizar a campanha! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }

}

module.exports = {
  listar,
  listarCidades,
  excluirCidade,
  cadastrar,
  alterar
}