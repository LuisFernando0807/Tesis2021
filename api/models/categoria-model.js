var cn = require("./conexion");

const model = {
  ListarCategorias(res) {
    cn.getConnection(function (err, dbConnection) {
      if (err) {
        /* do something */ return;
      }
      dbConnection.query(
        "call usp_categoria_list();",
        function (err, rows, fields) {
          if (err) throw err;
          res.send(rows[0]);
        }
      );
    });
  },
};

module.exports = model;
