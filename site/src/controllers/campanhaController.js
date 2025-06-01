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
  var descricao = req.body.descricao;
  var idUsuario = req.body.idUsuario;

  if (descricao == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("idUsuario está undefined!");
  } else {


    aquarioModel.cadastrar(descricao, idUsuario)
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

module.exports = {
  listar,
  listarCidades,
  excluirCidade,
  cadastrar
}