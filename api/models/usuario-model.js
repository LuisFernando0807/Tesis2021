var cn = require("./conexion");

const model = {
  ListarUsuariosAsignados(res) {
    cn.getConnection(function (err, dbConnection) {
      if (err) {
        /* do something */ return;
      }
      dbConnection.query(
        "call usp_usuarioasignado_list();",
        function (err, rows, fields) {
          if (err) throw err;
          res.send(rows[0]);
        }
      );
    });
  },
  ObtenerUsuarioPorCorreo(req, res) {
    const { correo } = req.params;
    cn.getConnection(function (err, dbConnection) {
      if (err) {
        /* do something */ return;
      }
      dbConnection.query(
        "call usp_usuario_obtener_by_correo(?);",
        [correo],
        function (err, rows, fields) {
          if (err) throw err;
          let data = rows[0].length == 0 ? null : rows[0][0];
          if (data != null)
            data.usuario_clave = Buffer.from(data.usuario_clave).toString(
              "base64"
            );
          res.send(data || "null");
        }
      );
    });
  },
};

module.exports = model;
