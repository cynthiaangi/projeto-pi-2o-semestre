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

router.get("/variacaoCoberturaVacinal/:idDoenca",function (req, res) {
    medidaController.variacaoCoberturaVacinal(req, res);
});

router.get("/variacaoCasos/:idDoenca",function (req, res) {
    medidaController.variacaoCasos(req, res);
});

router.get("/criarGraficoSituacao95Cobertura/:idDoenca",function (req, res) {
    console.log('entrei na rota')
    medidaController.criarGraficoSituacao95Cobertura(req, res);
});

router.get("/criarGraficoSituacao85Cobertura/:idDoenca",function (req, res) {
    medidaController.criarGraficoSituacao85Cobertura(req, res);
});

module.exports = router;