var express = require('express');
var router = express.Router();
var model = require('../models/categoria-model');

/* GET users listing. */
router.get('/listar', function(req, res, next) {
    model.ListarCategorias(res);
//   res.send('respond with a resource');
});

module.exports = router;
