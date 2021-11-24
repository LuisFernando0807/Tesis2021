var cn = require("./conexion");
const fs = require("fs");

const model = {
  BuscarTicket(req, res) {
    var { codigo, estado } = req.params;
    codigo = codigo == undefined ? null : codigo;
    estado = estado == undefined ? null : estado;

    cn.getConnection(function (err, dbConnection) {
      if (err) {
        /* do something */ return;
      }
      dbConnection.query(
        "call usp_ticket_buscar(?, ?);",
        [codigo, estado],
        function (err, rows, fields) {
          if (err) throw err;
          res.send(rows[0]);
        }
      );
    });
  },
  ListarKPIMensual(req, res) {
    const { anio, mes } = req.params;
    cn.getConnection(function (err, dbConnection) {
      if (err) {
        /* do something */ return;
      }
      dbConnection.query(
        "call usp_ticket_kpi_mensual(?, ?);",
        [anio, mes],
        function (err, rows, fields) {
          if (err) throw err;
          res.send(rows[0]);
        }
      );
    });
  },
  GuardarTicket(req, res) {
    let { titulo, detalle, tipo, categoriaId, urgencia, usuarioregistro } =
      req.body;

    // console.log(req.body);

    let fileArchivo = req.files.find((x) => x.fieldname == "archivo");
    // console.log(req.files);

    let fileArchivoByte = fs.readFileSync(`${fileArchivo.path}`);

    let archivo = {};
    archivo.nombre = fileArchivo.originalname;
    archivo.tipocontenido = fileArchivo.mimetype;
    archivo.contenido = fileArchivoByte;

    let ticket = {};
    ticket.titulo = titulo;
    ticket.fecharegistro = new Date().toISOString();
    ticket.usuarioregistro = usuarioregistro;
    ticket.detalle = detalle;
    ticket.tipo = tipo;
    ticket.categoria = categoriaId;
    ticket.urgencia = urgencia;
    ticket.estado = "A";

    console.log(ticket);
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
          let query = `call usp_archivo_save(?, ?, ?, @arch_codigo);
        call usp_ticket_save(?, ?, ?, ?, ?, ?, ?, ?, ?, @arch_codigo);`;

          let params = [
            archivo.nombre,
            archivo.tipocontenido,
            archivo.contenido,
            ticket.titulo,
            ticket.fecharegistro,
            ticket.usuarioregistro,
            ticket.detalle,
            ticket.tipo,
            ticket.categoria,
            ticket.urgencia,
            ticket.estado,
            null,
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
