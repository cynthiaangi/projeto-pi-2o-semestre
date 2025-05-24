var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.get("/listar", function (req, res) {
  funcionarioController.listar(req, res);
});

router.delete("/excluir/:id", function (req, res){
  funcionarioController.excluir(req, res);
});

module.exports = router;