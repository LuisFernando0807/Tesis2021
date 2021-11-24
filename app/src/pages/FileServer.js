import React from "react";
import { connect } from "react-redux";
import NavSide from "../components/NavSide";
import Profile from "../components/Profile";

import "./styles/FileServer.scss";

class FileServer extends React.Component {
  state = {
    carpetas: this.props.carpetaCompartidaList,
    vista: "renderSolicitud",
    archivoAdjunto: {},
    urgencia: "",
    solicitante: `${this.props.user.usuario_nombre} ${this.props.user.usuario_apellido}`,
    seGuardoSolicitud: false,
    usuarioregistro: this.props.user.usuario_codigo,
  };

  renderCarpetas(data) {
    const render =
      data == null ? null : (
        <ul className="list">
          {data
            .filter((x) => x.carpetas_hijo != null)
            .map((x, i) => {
              return (
                <li key={i} className="item">
                  <div className="content">
                    <span className="text">
                      {x.carp_compartida_descripcion}
                    </span>
                    <a
                      href="/"
                      className="btn-toggle"
                      onClick={(e) => {
                        e.preventDefault();
                        this.toggleCarpetaContenido(i);
                      }}
                    >
                      ▼
                    </a>
                  </div>
                  {x.carpetas_hijo == null ? null : (
                    <ul className={`list ${x.isOpen === true ? "active" : ""}`}>
                      {x.carpetas_hijo.map((y, ii) => {
                        return (
                          <li key={ii} className="item">
                            <label className="check-label">
                              <input
                                type="checkbox"
                                defaultChecked={y.checked || false}
                                onChange={(e) => {
                                  this.changePermiso(y.carp_compartida_codigo);
                                }}
                              />
                              <span className="check-descripcion">
                                &nbsp;{y.carp_compartida_descripcion}&nbsp;
                                <span className="check-dueno">
                                  {y.carp_compartida_dueno == null
                                    ? ""
                                    : `(${y.carp_compartida_dueno})`}
                                </span>
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
        </ul>
      );

    return render;
  }

  renderCarpetasSeleccionadas(data) {
    const { tipoPermisoList } = this.props;
    const render =
      data == null ? null : (
        <ul className="list">
          {data
            .filter((x) => x.carpetas_hijo != null)
            .map((x, i) => {
              return (
                <li key={i} className="item">
                  <div className="content">
                    <span className="text">
                      {x.carp_compartida_descripcion}
                    </span>
                    <a
                      href="/"
                      className="btn-toggle"
                      onClick={(e) => {
                        e.preventDefault();
                        this.toggleCarpetaContenido(i);
                      }}
                    >
                      ▼
                    </a>
                  </div>
                  {x.carpetas_hijo == null ? null : (
                    <>
                      <div className="item-text">
                        Seleccione los usuarios y permisos a acceder:
                      </div>
                      <ul
                        className={`list ${x.isOpen === true ? "active" : ""}`}
                      >
                        {x.carpetas_hijo.map((y, ii) => {
                          const { permisos } = y;
                          // permisos = permisos || [];

                          return (
                            <li key={ii} className="item">
                              <div className="item-container">
                                <div className="item-dueno">
                                  Dueño de carpeta: {y.carp_compartida_dueno}
                                </div>
                                <div className="item-table-container">
                                  <table className="item-table" border="0">
                                    <thead>
                                      <tr>
                                        <th colSpan="2">
                                          {y.carp_compartida_descripcion}
                                        </th>
                                        <th>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              this.clickAgregarPermiso(
                                                y.carp_compartida_codigo
                                              );
                                            }}
                                          >
                                            ADD
                                          </button>
                                        </th>
                                      </tr>
                                      <tr>
                                        <th>USUARIO</th>
                                        <th>PERMISOS</th>
                                        <th>ACCIÓN</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {permisos == null ||
                                      permisos.length === 0 ? (
                                        <tr>
                                          <th colSpan="3" className="empty">
                                            No hay registros
                                          </th>
                                        </tr>
                                      ) : (
                                        (permisos || []).map((z, iii) => {
                                          return (
                                            <tr key={iii}>
                                              <td>
                                                {z.editable ? (
                                                  <input
                                                    type="text"
                                                    value={z.usuario_temp}
                                                    onChange={(e) => {
                                                      this.changeUsuarioPermiso(
                                                        y.carp_compartida_codigo,
                                                        z.permiso_codigo,
                                                        e.currentTarget.value
                                                      );
                                                    }}
                                                  />
                                                ) : (
                                                  z.usuario
                                                )}
                                              </td>
                                              <td>
                                                {z.editable ? (
                                                  <select
                                                    onChange={(e) => {
                                                      this.changeTipoPermiso(
                                                        y.carp_compartida_codigo,
                                                        z.permiso_codigo,
                                                        e.currentTarget.value
                                                      );
                                                    }}
                                                    defaultValue={z.tipo_temp}
                                                  >
                                                    <option value="">
                                                      [Seleccione...]
                                                    </option>
                                                    {tipoPermisoList.map(
                                                      (item, index) => (
                                                        <option
                                                          key={index}
                                                          value={item}
                                                        >
                                                          {item}
                                                        </option>
                                                      )
                                                    )}
                                                  </select>
                                                ) : (
                                                  z.tipo
                                                )}
                                              </td>
                                              <td>
                                                {z.editable ? (
                                                  <>
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        this.clickGuardarPermiso(
                                                          y.carp_compartida_codigo,
                                                          z.permiso_codigo
                                                        )
                                                      }
                                                    >
                                                      OK
                                                    </button>
                                                    &nbsp;
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        this.clickEliminarPermiso(
                                                          y.carp_compartida_codigo,
                                                          z.permiso_codigo
                                                        )
                                                      }
                                                    >
                                                      CANCEL
                                                    </button>
                                                  </>
                                                ) : (
                                                  <>
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        this.clickEditarPermiso(
                                                          y.carp_compartida_codigo,
                                                          z.permiso_codigo
                                                        )
                                                      }
                                                    >
                                                      EDIT
                                                    </button>
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        this.clickEliminarPermiso(
                                                          y.carp_compartida_codigo,
                                                          z.permiso_codigo
                                                        )
                                                      }
                                                    >
                                                      REMOVE
                                                    </button>
                                                  </>
                                                )}
                                              </td>
                                            </tr>
                                          );
                                        })
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </li>
              );
            })}
        </ul>
      );

    return render;
  }

  renderSolicitud() {
    const { carpetas } = this.state;
    const carpetasHijo =
      carpetas == null
        ? null
        : carpetas.filter((x) => x.carp_compartida_codigo_padre != null);
    const carpetasBase =
      carpetas == null
        ? null
        : carpetas
            .filter((x) => x.carp_compartida_codigo_padre == null)
            .map((x) => {
              const carpetas_hijo =
                carpetasHijo == null
                  ? null
                  : carpetasHijo.filter(
                      (y) =>
                        y.carp_compartida_codigo_padre ===
                        x.carp_compartida_codigo
                    );

              return {
                ...x,
                carpetas_hijo:
                  carpetas_hijo === null
                    ? null
                    : carpetas_hijo.length === 0
                    ? null
                    : carpetas_hijo,
              };
            });
    return (
      <div className="file-server-form">
        <div className="title">
          <h3>SERVIDOR DE ARCHIVOS PAMFPSLIM02</h3>
        </div>
        <div className="form-container">
          <div className="list-container">
            {this.renderCarpetas(carpetasBase)}
          </div>
          <div className="btns">
            <button
              className="btn"
              type="submit"
              onClick={() => this.clickGenerarSolicitud()}
            >
              GENERAR SOLICITUD
            </button>
            &nbsp;
            <button
              className="btn btn-red"
              type="button"
              onClick={() => this.regresarMenuPrincipal()}
            >
              REGRESAR AL MENÚ PRINCIPAL
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderConfirmarSolicitud() {
    const { carpetas, archivoAdjunto, solicitante, urgencia } = this.state;
    const { urgenciaList } = this.props;
    const carpetasHijo =
      carpetas == null
        ? null
        : carpetas.filter(
            (x) => x.carp_compartida_codigo_padre != null && x.checked
          );
    const carpetasBase =
      carpetas == null
        ? null
        : carpetas
            .filter((x) => x.carp_compartida_codigo_padre == null)
            .map((x) => {
              const carpetas_hijo =
                carpetasHijo == null
                  ? null
                  : carpetasHijo.filter(
                      (y) =>
                        y.carp_compartida_codigo_padre ===
                        x.carp_compartida_codigo
                    );

              return {
                ...x,
                carpetas_hijo:
                  carpetas_hijo === null
                    ? null
                    : carpetas_hijo.length === 0
                    ? null
                    : carpetas_hijo,
              };
            });

    return (
      <div className="file-server-form">
        <div className="title">
          <h3>SERVIDOR DE ARCHIVOS PAMFPSLIM02</h3>
        </div>
        <div className="form-container">
          <div className="applicant-container">
            <label>SOLICITANTE:</label>
            &nbsp;
            <div className="input-container">
              <input type="text" value={solicitante} readOnly />
            </div>
          </div>
          <br />
          <div className="urgent-container">
            <label>URGENCIA:</label>
            &nbsp;
            <div className="input-container">
              <select
                value={urgencia}
                onChange={(e) => this.changeUrgencia(e.currentTarget.value)}
              >
                <option value="">[Seleccione...]</option>
                {urgenciaList.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="list-container">
            {this.renderCarpetasSeleccionadas(carpetasBase)}
          </div>
          <div className="approve-container">
            <label>Aprobación:</label>
            &nbsp;
            <div className="file-container">
              <div className="input-container">
                <input
                  type="text"
                  value={archivoAdjunto.nombre || ""}
                  readOnly
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => this.openInputFile("#fle-aprobacion")}
                >
                  ...
                </button>
              </div>
              <input
                id="fle-aprobacion"
                type="file"
                style={{ display: "none" }}
                onChange={this.changeInputFile}
              />
            </div>
          </div>
          <div className="btns">
            <button
              className="btn"
              type="button"
              onClick={() => this.guardarSolicitud()}
            >
              ENVIAR
            </button>
            &nbsp;
            <button
              className="btn btn-red"
              type="button"
              onClick={() => this.cancelarSolicitud()}
            >
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderMensaje() {
    const { seGuardoSolicitud } = this.state;
    return (
      <div className="file-server-form">
        <div className="title">
          <h3>{`${seGuardoSolicitud ? "S" : "No s"}e guardó la solicitud`}</h3>
        </div>
        <div className="form-container">
          <div className="btns">
            <button
              className="btn"
              type="button"
              onClick={() => this.regresarMenuPrincipal()}
            >
              REGRESAR AL MENÚ PRINCIPAL
            </button>
            &nbsp;
            <button
              className="btn btn-red"
              type="button"
              onClick={() => this.cancelarSolicitud()}
            >
              REGISTRAR NUEVA SOLICITUD
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { navList, vista } = this.state;

    return (
      <div className="file-server-container">
        <div className="nav-side-section">
          <Profile />
          <NavSide data={navList} />
        </div>
        <div className="content-section">
          {/* <ul className="kpi-list">
            {listaKPI.map((x, i) => (
              <KPICard key={i} {...x} />
            ))}
          </ul> */}
          <div className="content-container">{this[vista]()}</div>
        </div>
      </div>
    );
  }

  toggleCarpetaContenido(index) {
    const { carpetas } = this.state;
    var isOpen = carpetas[index].isOpen || false;
    isOpen = !isOpen;
    carpetas[index].isOpen = isOpen;

    this.setState({ carpetas: carpetas });
  }

  changeUrgencia(id) {
    this.setState({ urgencia: id });
  }

  changePermiso(id) {
    const { carpetas } = this.state;
    const index = carpetas.findIndex((x) => x.carp_compartida_codigo === id);
    const checked = carpetas[index].checked || false;
    carpetas[index].checked = !checked;

    this.setState({ carpetas: carpetas });
  }

  clickGenerarSolicitud() {
    this.setState({ vista: "renderConfirmarSolicitud" });
  }

  clickAgregarPermiso(id) {
    const { carpetas } = this.state;
    const index = carpetas.findIndex((x) => x.carp_compartida_codigo === id);
    const permisos = carpetas[index].permisos || [];
    const permisosTemps = permisos
      .filter((x) => x.permiso_codigo < 0)
      .map((x) => x.permiso_codigo);
    const idTemp =
      permisosTemps.length === 0
        ? -1
        : permisosTemps.sort((x, y) => x - y)[0] - 1;
    permisos.push({ editable: true, permiso_codigo: idTemp });
    carpetas[index].permisos = permisos;

    this.setState({ carpetas: carpetas });
  }

  changeUsuarioPermiso(idCarpeta, idPermiso, value) {
    const { carpetas } = this.state;
    const indexCarpeta = carpetas.findIndex(
      (x) => x.carp_compartida_codigo === idCarpeta
    );
    const permisos = carpetas[indexCarpeta].permisos || [];
    const indexPermiso = permisos.findIndex(
      (x) => x.permiso_codigo === idPermiso
    );
    carpetas[indexCarpeta].permisos[indexPermiso].usuario_temp = value;

    this.setState({ carpetas: carpetas });
  }

  changeTipoPermiso(idCarpeta, idPermiso, value) {
    const { carpetas } = this.state;
    const indexCarpeta = carpetas.findIndex(
      (x) => x.carp_compartida_codigo === idCarpeta
    );
    const permisos = carpetas[indexCarpeta].permisos || [];
    const indexPermiso = permisos.findIndex(
      (x) => x.permiso_codigo === idPermiso
    );
    carpetas[indexCarpeta].permisos[indexPermiso].tipo_temp = value;

    this.setState({ carpetas: carpetas });
  }

  clickGuardarPermiso(idCarpeta, idPermiso) {
    const { carpetas } = this.state;
    const indexCarpeta = carpetas.findIndex(
      (x) => x.carp_compartida_codigo === idCarpeta
    );
    const permisos = carpetas[indexCarpeta].permisos || [];
    const indexPermiso = permisos.findIndex(
      (x) => x.permiso_codigo === idPermiso
    );
    carpetas[indexCarpeta].permisos[indexPermiso].editable = false;
    carpetas[indexCarpeta].permisos[indexPermiso].usuario =
      permisos[indexPermiso].usuario_temp;
    carpetas[indexCarpeta].permisos[indexPermiso].tipo =
      permisos[indexPermiso].tipo_temp;
    delete carpetas[indexCarpeta].permisos[indexPermiso].usuario_temp;
    delete carpetas[indexCarpeta].permisos[indexPermiso].tipo_temp;

    this.setState({ carpetas: carpetas });
  }

  clickEditarPermiso(idCarpeta, idPermiso) {
    const { carpetas } = this.state;
    const indexCarpeta = carpetas.findIndex(
      (x) => x.carp_compartida_codigo === idCarpeta
    );
    const permisos = carpetas[indexCarpeta].permisos || [];
    const indexPermiso = permisos.findIndex(
      (x) => x.permiso_codigo === idPermiso
    );
    carpetas[indexCarpeta].permisos[indexPermiso].editable = true;
    carpetas[indexCarpeta].permisos[indexPermiso].usuario_temp =
      permisos[indexPermiso].usuario;
    carpetas[indexCarpeta].permisos[indexPermiso].tipo_temp =
      permisos[indexPermiso].tipo;

    this.setState({ carpetas: carpetas });
  }

  clickEliminarPermiso(idCarpeta, idPermiso) {
    const { carpetas } = this.state;
    const indexCarpeta = carpetas.findIndex(
      (x) => x.carp_compartida_codigo === idCarpeta
    );
    const permisos = carpetas[indexCarpeta].permisos || [];
    const indexPermiso = permisos.findIndex(
      (x) => x.permiso_codigo === idPermiso
    );

    if (
      !carpetas[indexCarpeta].permisos[indexPermiso].hasOwnProperty(
        "usuario"
      ) ||
      !carpetas[indexCarpeta].permisos[indexPermiso].editable
    )
      carpetas[indexCarpeta].permisos.splice(indexPermiso, 1);
    else {
      carpetas[indexCarpeta].permisos[indexPermiso].editable = false;
      carpetas[indexCarpeta].permisos[indexPermiso].usuario_temp =
        permisos[indexPermiso].usuario;
      carpetas[indexCarpeta].permisos[indexPermiso].tipo_temp =
        permisos[indexPermiso].tipo;
    }

    this.setState({ carpetas: carpetas });
  }

  openInputFile(idSelector) {
    document.querySelector(idSelector).click();
  }

  changeInputFile = ({ currentTarget }) => {
    const { files } = currentTarget;

    var objFile = {};

    if (files.length === 0) {
      this.setState({ archivoAdjunto: objFile });
      return;
    }

    const file = files[0];

    objFile = {
      ultimaModificacion: file.lastModified,
      ultimaFechaModificacion: file.lastModifiedDate,
      nombre: file.name,
      tamaño: file.size,
      tipo: file.type,
      file: file,
    };

    this.setState({ archivoAdjunto: objFile });
  };

  guardarSolicitud() {
    const { solicitante, urgencia, archivoAdjunto, usuarioregistro, carpetas } = this.state;
    const carpetasHijo =
      carpetas == null
        ? null
        : carpetas.filter(
            (x) =>
              x.carp_compartida_codigo_padre != null &&
              x.checked &&
              (x.permisos || []).length > 0
          );
    const detalle = [];
    for (let carpeta of carpetasHijo) {
      for (let permiso of carpeta.permisos) {
        let item = {};
        item.carp_compartida_codigo = carpeta.carp_compartida_codigo;
        item.correo = permiso.usuario;
        item.permiso = permiso.tipo;
        detalle.push(item);
      }
    }

    const formData = new FormData();
    formData.append("archivo", archivoAdjunto.file);
    formData.append("solicitante", solicitante);
    formData.append("urgencia", urgencia);
    formData.append("usuarioregistro", usuarioregistro);
    for (let index in detalle) {
      let item = detalle[index];
      formData.append(
        `detalle[${index}][carp_compartida_codigo]`,
        item.carp_compartida_codigo
      );
      formData.append(`detalle[${index}][correo]`, item.correo);
      formData.append(`detalle[${index}][permiso]`, item.permiso);
    }
    let url = `http://localhost:3030/solicitud-file-server/guardar`;

    let init = {};
    init.method = "POST";
    init.body = formData;

    fetch(url, init)
      .then((x) => x.json())
      .then((data) => {
        this.setState({ vista: "renderMensaje", seGuardoSolicitud: data });
      });
  }

  cancelarSolicitud() {
    const { carpetas } = this.state;

    for (let carpeta of carpetas) {
      delete carpeta.checked;
      delete carpeta.permisos;
      delete carpeta.isOpen;
    }

    this.setState({
      vista: "renderSolicitud",
      carpetas: carpetas,
      urgencia: "",
      archivoAdjunto: {},
      seGuardoSolicitud: false,
    });
  }

  regresarMenuPrincipal() {
    this.props.history.push("/");
  }
}
const mapStateToProp = (state) => {
  return {
    user: state.user,
    isLogin: state.isLogin,
    carpetaCompartidaList: state.carpetaCompartidaList,
    tipoPermisoList: state.tipoPermisoList,
    urgenciaList: state.urgenciaList,
  };
};

export default connect(mapStateToProp, null)(FileServer);
