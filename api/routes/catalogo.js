var express = require('express');
var router = express.Router();
var model = require('../models/catalogo-model');

/* GET users listing. */
router.get('/listar', function(req, res, next) {
    model.ListarCatalogos(res);
//   res.send('respond with a resource');
});

module.exports = router;
