var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

router.get("/kpi", function (req, res) {
    avisoController.postarKpi(req, res);
});

router.get("/kpiTotal", function (req, res) {
    avisoController.calcularTotal(req, res);
});

router.get("/kpi2", function (req, res) {
    avisoController.postarKpi2(req, res);
});

router.get("/kpi3", function (req, res) {
    avisoController.postarKpi3(req, res);
});

router.get("/kpi4", function (req, res) {
    avisoController.postarKpi4(req, res);
});

module.exports = router;