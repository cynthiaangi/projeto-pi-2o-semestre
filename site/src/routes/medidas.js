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

router.post("/variacaoCasosCidade",function (req, res) {
    medidaController.variacaoCasosCidade(req, res);
});

router.get("/variacaoVacinados/:idDoenca",function (req, res) {
    medidaController.variacaoVacinados(req, res);
});

router.get("/graficoCasosAno/:idDoenca",function (req, res) {
    medidaController.graficoCasosAno(req, res);
});

router.get("/graficoRankingAlerta/:idDoenca",function (req, res) {
    medidaController.graficoRankingAlerta(req, res);
});

router.get("/graficoRankingMelhores/:idDoenca",function (req, res) {
    medidaController.graficoRankingMelhores(req, res);
});

router.get("/criarGraficoSituacao95Cobertura/:idDoenca",function (req, res) {
    medidaController.criarGraficoSituacao95Cobertura(req, res);
});

router.get("/criarGraficoSituacao85Cobertura/:idDoenca",function (req, res) {
    medidaController.criarGraficoSituacao85Cobertura(req, res);
});

module.exports = router;