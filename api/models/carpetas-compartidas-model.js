var cn = require("./conexion");

const model = {
  ListarCarpetasCompartidas(res) {
    cn.getConnection(function (err, dbConnection) {
      if (err) {
        /* do something */ return;
      }

      dbConnection.query(
        "call usp_carpetas_compartidas_list();",
        function (err, rows, fields) {
          if (err) throw err;
          res.send(rows[0]);
          // this.data = rows;
        }
      );
    });
    // cn.end();
  },
};

module.exports = model;
