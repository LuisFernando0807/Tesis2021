var cn = require("./conexion");
const fs = require("fs");

const model = {
  GuardarSolicitud(req, res) {
    let { solicitante, urgencia, detalle, usuarioregistro } = req.body;

    console.log(req.body);

    let fileArchivo = req.files.find((x) => x.fieldname == "archivo");

    let fileArchivoByte = fs.readFileSync(`${fileArchivo.path}`);

    let archivo = {};
    archivo.nombre = fileArchivo.originalname;
    archivo.tipocontenido = fileArchivo.mimetype;
    archivo.contenido = fileArchivoByte;

    let ticket = {};
    ticket.titulo = "Solicitud de FileServer";
    ticket.fecharegistro = new Date().toISOString();
    ticket.usuarioregistro = usuarioregistro;
    ticket.detalle = "";
    ticket.tipo = "Petición";
    ticket.categoria = 1;
    ticket.urgencia = urgencia;
    ticket.estado = "A";

    cn.getConnection(function (err, dbConnection) {
      if (err) {
        /* do something */ return;
      }
      dbConnection.beginTransaction(function (err) {
        let saveAll = false;

        if (err) {
          dbConnection.rollback(function () {
            res.send(saveAll);
          });
        } else {
          let queryDetalle = detalle
            .map(
              (x) =>
                `call usp_solicitud_detalle_fileserver_save(@codigo, ?, ?, ?);`
            )
            .join("\n");
          let paramDetalle = [];
          detalle.forEach((x) => {
            paramDetalle.push(x.carp_compartida_codigo);
            paramDetalle.push(x.correo);
            paramDetalle.push(x.permiso);
          });

          let query = `call usp_archivo_save(?, ?, ?, @arch_codigo);
        call usp_solicitud_fileserver_save(@codigo, ?, ?, @arch_codigo);
        ${queryDetalle}
        call usp_ticket_save(?, ?, ?, ?, ?, ?, ?, ?, @codigo, @arch_codigo);`;

          let params = [
            archivo.nombre,
            archivo.tipocontenido,
            archivo.contenido,
            solicitante,
            urgencia,
            ...paramDetalle,
            ticket.titulo,
            ticket.fecharegistro,
            ticket.usuarioregistro,
            ticket.detalle,
            ticket.tipo,
            ticket.categoria,
            ticket.urgencia,
            ticket.estado,
          ];

          dbConnection.query(query, params, function (err, results) {
            if (err) {
              dbConnection.rollback(function () {
                res.send(saveAll);
              });
            } else {
              dbConnection.commit(function (err) {
                if (err) {
                  dbConnection.rollback(function () {
                    res.send(saveAll);
                  });
                } else {
                  saveAll = true;
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
