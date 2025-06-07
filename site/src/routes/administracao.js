var express = require("express");
var router = express.Router();

var administracaoController = require("../controllers/administracaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.get("/listar", function (req, res) {
  administracaoController.listar(req, res);
});

module.exports = router;