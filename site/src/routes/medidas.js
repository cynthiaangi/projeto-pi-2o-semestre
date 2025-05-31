var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.post("/alterarDoenca",function (req, res) {
    medidaController.alterarDoenca(req, res);
});

router.post("/alterarDoencaCidade",function (req, res) {
    medidaController.alterarDoencaCidade(req, res);
});

router.post("/alterarCidade",function (req, res) {
    medidaController.alterarCidade(req, res);
});

module.exports = router;