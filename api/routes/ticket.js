var express = require('express');
var router = express.Router();
var model = require('../models/ticket-model');

/* GET */
router.get('/buscar-ticket/codigo/:codigo?', function(req, res, next) {
    model.BuscarTicket(req, res);
});

/* GET */
router.get('/buscar-ticket/estado/:estado', function(req, res, next) {
    model.BuscarTicket(req, res);
});

/* GET */
router.get('/listar-kpi-mensual/:anio/:mes', function(req, res, next) {
    model.ListarKPIMensual(req, res);
});

/* POST. */
router.post('/guardar', function(req, res, next) {
    model.GuardarTicket(req, res);
});

module.exports = router;
