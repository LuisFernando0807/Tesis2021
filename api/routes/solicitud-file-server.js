var express = require('express');
var router = express.Router();
var model = require('../models/solicitud-file-server-model');

/* POST. */
router.post('/guardar', function(req, res, next) {
    model.GuardarSolicitud(req, res);
});

module.exports = router;
