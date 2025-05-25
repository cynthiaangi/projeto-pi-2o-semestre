var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.get("/listar", function (req, res) {
  funcionarioController.listar(req, res);
});

router.delete("/excluir/:id", function (req, res){
  funcionarioController.excluir(req, res);
});

router.put("alterar/:id", function (req, res){
  funcionarioController.alterar(req, res);
})

module.exports = router;