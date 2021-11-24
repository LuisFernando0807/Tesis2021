var express = require("express");
var router = express.Router();
var model = require("../models/usuario-model");

/* GET users listing. */
router.get("/listar-asignados", function (req, res, next) {
  model.ListarUsuariosAsignados(res);
});

/* GET users listing. */
router.get("/obtener-por-correo/:correo", function (req, res, next) {
  model.ObtenerUsuarioPorCorreo(req, res);
});

module.exports = router;
