var express = require('express');
var router = express.Router();
var model = require('../models/ticket-detalle-model');

/* POST. */
router.post('/guardar', function(req, res, next) {
    model.GuardarTicketDetalle(req, res);
});

module.exports = router;
