var express = require("express");
var router = express.Router();

var campanhaController = require("../controllers/campanhaController");

router.get("/listar", function (req, res) {
  campanhaController.listar(req, res);
});

router.get("/listarCidades/:id", function (req, res) {
  campanhaController.listarCidades(req, res);
});

router.delete("/excluirCidade/:id", function (req, res) {
  campanhaController.excluirCidade(req, res);
});

router.delete("/excluir/:id", function (req, res){
  campanhaController.excluir(req, res);
});

router.post("/cadastrar", function (req, res) {
  campanhaController.cadastrar(req, res);
})

router.put("/alterar/:id", function (req, res){
  campanhaController.alterar(req, res);
})

module.exports = router;