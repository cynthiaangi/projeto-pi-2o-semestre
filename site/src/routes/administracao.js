var express = require("express");
var router = express.Router();

var administracaoController = require("../controllers/administracaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    administracaoController.cadastrar(req, res);
})

router.put("/alterar/:id", function (req, res){
  administracaoController.alterar(req, res);
})

router.get("/listar", function (req, res) {
  administracaoController.listar(req, res);
});

router.delete("/excluir/:id", function (req, res){
  administracaoController.excluir(req, res);
});

module.exports = router;