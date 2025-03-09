var express = require("express");
var router = express.Router();

var loginController = require("../controllers/loginController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    loginController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    loginController.autenticar(req, res);
});

module.exports = router;