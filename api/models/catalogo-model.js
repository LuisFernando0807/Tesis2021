var cn = require("./conexion");

const model = {
  ListarCatalogos(res) {
    cn.getConnection(function (err, dbConnection) {
      if (err) {
        /* do something */ return;
      }
      dbConnection.query(
        "call usp_catalogo_list();",
        function (err, rows, fields) {
          if (err) throw err;
          res.send(rows[0]);
        }
      );
    });
  },
};

module.exports = model;
