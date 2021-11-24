var cn = require("./conexion");

const model = {
  GuardarTicketDetalle(req, res) {
    let { codigo, observacion, tiposolucion, estado, usuarioasignado } =
      req.body;

    let ticket = {};
    ticket.codigo = codigo;
    ticket.fecharegistro = new Date().toISOString();
    ticket.observacion = observacion;
    ticket.tiposolucion = tiposolucion;
    ticket.estado = estado;
    ticket.usuarioasignado = usuarioasignado;

    cn.getConnection(function (err, dbConnection) {
      if (err) {
        /* do something */ return;
      }

      dbConnection.beginTransaction(function (err) {
        let saveAll = false;

        if (err) {
          console.log(err);
          dbConnection.rollback(function () {
            dbConnection.release();
            res.send(saveAll);
          });
        } else {
          let query = `call usp_ticket_detalle_save(?, ?, ?, ?, ?, ?);`;

          let params = [
            ticket.codigo,
            ticket.fecharegistro,
            ticket.observacion,
            ticket.tiposolucion,
            ticket.estado,
            ticket.usuarioasignado,
          ];

          dbConnection.query(query, params, function (err, results) {
            if (err) {
              console.log(err);
              dbConnection.rollback(function () {
                dbConnection.release();
                res.send(saveAll);
              });
            } else {
              dbConnection.commit(function (err) {
                if (err) {
                  console.log(err);
                  dbConnection.rollback(function () {
                    dbConnection.release();
                    res.send(saveAll);
                  });
                } else {
                  saveAll = true;
                  dbConnection.release();
                  res.send(saveAll);
                }
              });
            }
          });
        }
      });
    });
  },
};

module.exports = model;
