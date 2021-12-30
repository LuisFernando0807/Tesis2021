import React from "react";
import { connect } from "react-redux";
import NavSide from "../components/NavSide";
import Profile from "../components/Profile";

import "./styles/Inventario.scss";

class Inventario extends React.Component {
  inventario = {
    isReadOnly: false,
  };
  state = {
    inventario: Object.assign({}, this.inventario),
    vista: "renderInicio",
    lista: [],
  };

  renderInicio() {
    const { lista } = this.state;

    return (
      <div className="inventario-form">
        <div className="title">
          <strong>GESTIÓN DE INVENTARIO</strong>
        </div>
        <br />
        <div className="subtitle">
          <strong>BÚSQUEDA POR:</strong>
        </div>
        <br />
        <div className="search-container">
          <div className="row">
            <div className="input-group">
              <label className="label">TIPO DE EQUIPO:</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Ingrese el tipo de equipo"
                  onChange={(e) => {
                    e.preventDefault();
                    this.changeCodigoinventarioSearch(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
            &nbsp;
            <div className="input-group">
              <label className="label">SERIE:</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Ingrese la serie"
                  onChange={(e) => {
                    e.preventDefault();
                    this.changeCodigoinventarioSearch(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
            &nbsp;
            <div className="input-group">
              <label className="label">USUARIO:</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Ingrese el usuario"
                  onChange={(e) => {
                    e.preventDefault();
                    this.changeCodigoinventarioSearch(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="input-group">
              <label className="label">ÁREA FUNCIONAL:</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Ingrese el área funcional"
                  onChange={(e) => {
                    e.preventDefault();
                    this.changeCodigoinventarioSearch(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
            &nbsp;
            <div className="input-group">
              <label className="label">ÁREA OPERATIVA:</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Ingrese el área operativa"
                  onChange={(e) => {
                    e.preventDefault();
                    this.changeCodigoinventarioSearch(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
            &nbsp;
            <div className="input-group">
              <label className="label">CENTRO DE COSTOS:</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Ingrese el centro de costos"
                  onChange={(e) => {
                    e.preventDefault();
                    this.changeCodigoinventarioSearch(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="input-group">
              <label className="label">EMPRESA:</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Ingrese la empresa"
                  onChange={(e) => {
                    e.preventDefault();
                    this.changeCodigoinventarioSearch(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
            &nbsp;
            <div className="input-group">
              <label className="label">SEDE:</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Ingrese la sede"
                  onChange={(e) => {
                    e.preventDefault();
                    this.changeCodigoinventarioSearch(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
            &nbsp;
            <div className="input-group"></div>
          </div>
          <br />
          <div className="row">
            <div className="btns">
              <button
                type="button"
                // onClick={(e) => {
                //   this.buscarinventario();
                // }}
              >
                CONSULTAR
              </button>
              &nbsp;
              <button
                type="button"
                onClick={(e) => {
                  this.nuevoRegistro();
                }}
              >
                NUEVO
              </button>
              &nbsp;
              <button
                type="button"
                // onClick={(e) => {
                //   this.nuevoRegistro();
                // }}
              >
                EXPORTAR
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="results-container">
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Anexo</th>
                <th>Empresa</th>
                <th>Sede</th>
                <th>Área</th>
                <th>Sub-Área</th>
                <th>DNI</th>
                <th>Usuario</th>
                <th>Cargo</th>
                <th>Centro de Costos</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {(lista || []).length === 0 ? (
                <tr>
                  <th colSpan="12">No se encontraron resultados</th>
                </tr>
              ) : (
                lista.map((x, i) => {
                  //   let fechaRegistro = new Date(x.inv_fecharegistro);
                  //   let fechaRegistroStr = fechaRegistro.toLocaleDateString(
                  //     "es-PE",
                  //     {
                  //       day: "2-digit",
                  //       month: "2-digit",
                  //       year: "numeric",
                  //     }
                  //   );
                  let usuarioRegistro = `${x.usuarioregistro_nombre} ${x.usuarioregistro_apellido}`;
                  //   let estadoStr = inventario.getEstado(x.tkt_estado);
                  return (
                    <tr key={i}>
                      <td className="center">
                        <input type="checkbox" />
                      </td>
                      <td className="center">{x.inv_anexo}</td>
                      <td className="center">{x.inv_empresa}</td>
                      <td className="center">{x.inv_sede}</td>
                      <td className="center">{x.inv_area}</td>
                      <td className="center">{x.inv_subarea}</td>
                      <td className="center">{x.inv_dni}</td>
                      <td className="center">{x.inv_dni}</td>
                      <td className="center">{usuarioRegistro}</td>
                      <td className="center">{x.inv_cargo}</td>
                      <td className="center">{x.inv_centrocosto}</td>
                      <td className="center">
                        <a
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            this.cambiarVista("renderinventario", {
                              inventario: Object.assign(
                                {},
                                {
                                  codigo: x.tkt_codigo,
                                  titulo: x.tkt_titulo,
                                  detalle: x.tkt_detalle,
                                  tipo: x.tkt_tipo,
                                  tipoIsReadOnly: false,
                                  catalogo: x.categoria_catalogo,
                                  catalogoIsReadOnly: false,
                                  categoriaId: x.tkt_categoria,
                                  urgencia: x.tkt_urgencia,
                                  usuarioregistro: x.tkt_usuarioregistro,
                                  tiposolucion: x.tkt_tiposolucion,
                                  usuarioasignado: x.tkt_usuarioasignado,
                                  usuarioasignado_nombre:
                                    x.usuarioasignado_nombre,
                                  usuarioasignado_apellido:
                                    x.usuarioasignado_apellido,
                                  observacion: x.tkt_observacion,
                                  estado: x.tkt_estado,
                                  archivoAdjunto: {
                                    nombre: x.arch_nombre,
                                    tipo: x.arch_tipocontenido,
                                  },
                                  isReadOnly: false,
                                }
                              ),
                              categoriaList: this.props.categoriaList.filter(
                                (y) =>
                                  y.categoria_catalogo === x.categoria_catalogo
                              ),
                            });
                          }}
                        >
                          Cambiar Estado
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderRegistro() {
    const { inventario } = this.state;
    const { user } = this.props;
    return (
      <div className="inventario-form">
        <div className="title">
          <strong>DETALLE DE REGISTRO</strong>
        </div>
        <div className="form-container">
          <div className="group-container">
            <div className="title">LEASING:</div>
            <div className="content">
              <div className="row">
                <div className="input-group">
                  <label className="label">ANEXO:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese anexo"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">NOMBRE:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese nombre"
                      readOnly={true}
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">FEC. INICIO:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese fecha de inicio"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">FEC. FIN:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese fecha de fin"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="group-container">
            <div className="title">NEGOCIO:</div>
            <div className="content">
              <div className="row">
                <div className="input-group">
                  <label className="label">EMPRESA:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese empresa"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">SEDE:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">ÁREA FUNCIONAL:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese área funcional"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">ÁREA OPERATIVA:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese área operativa"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="group-container">
            <div className="title">USUARIO:</div>
            <div className="content">
              <div className="row">
                <div className="input-group">
                  <label className="label">DNI:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese dni"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">CARGO:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      readOnly={true}
                      placeholder="Ingrese cargo"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group"></div>
              </div>
              <br />
              <div className="row">
                <div className="input-group">
                  <label className="label">NOMBRE:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      readOnly={true}
                      placeholder="Ingrese nombre"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">CENTRO DE COSTOS:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      readOnly={true}
                      placeholder="Ingrese centro de costos"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">DESCRIPCIÓN CC:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      readOnly={true}
                      placeholder="Ingrese descripción de centro de costos"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="group-container">
            <div className="title">EQUIPO:</div>
            <div className="content">
              <div className="row">
                <div className="input-group">
                  <label className="label">TIPO:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">NOMBRE:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">DISCO DURO:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-group">
                  <label className="label">MODELO:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">MARCA:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">PROCESADOR:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-group">
                  <label className="label">SERIE:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">MEMORIA:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">SISTEMA OPERATIVO:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-group">
                  <label className="label">SERIE MONITOR:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">NRO PARTE:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group"></div>
              </div>
            </div>
          </div>
          <br />
          <div className="group-container">
            <div className="title">APLICACIONES OPCIONALES:</div>
            <div className="content">
              <div className="row">
                <ul>
                  <li>
                    <label>
                      <input type="checkbox" />
                      &nbsp;QUIKVIEW
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      &nbsp;OFIPLAN
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      &nbsp;AUTOCAD
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      &nbsp;ONE DRIVE
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      &nbsp;SOLIDWORKS
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      &nbsp;SIGU
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <br />
          <div className="group-container">
            <div className="title">COSTOS DEL EQUIPO:</div>
            <div className="content">
              <div className="row">
                <div className="input-group">
                  <label className="label">COSTO LEASING MENSUAL:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">COSTO TOTAL DEL EQUIPO:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group"></div>
              </div>
            </div>
          </div>
          <br />
          <div className="group-container">
            <div className="title">PROVEEDOR:</div>
            <div className="content">
              <div className="row">
                <div className="input-group">
                  <label className="label">EMPRESA:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">NRO. GUÍA:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="input-group">
                  <label className="label">FEC. DE INGRESO:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Ingrese la sede"
                      onChange={(e) => {
                        e.preventDefault();
                        this.changeCodigoinventarioSearch(
                          e.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btns">
            {inventario.isReadOnly ? (
              <>
                {user.usuario_perfil === "A" ? (
                  <>
                    <button className="btn" type="button" onClick={() => {}}>
                      GUARDAR
                    </button>
                    &nbsp;
                  </>
                ) : null}
                <button
                  className="btn btn-red"
                  type="button"
                  //   onClick={() => {
                  //     let vista = "renderBusquedainventario";
                  //     if (user.usuario_perfil === "A") vista = "renderInicio";
                  //     this.cambiarVista(vista, {
                  //       searchinventario: { ...this.searchinventarioEmpty },
                  //     });
                  //   }}
                >
                  REGRESAR
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn"
                  type="button"
                  //   onClick={() =>
                  //     inventario.codigo === 0
                  //       ? this.guardarinventario()
                  //       : this.guardarinventarioDetalle()
                  //   }
                >
                  ENVIAR
                </button>
                &nbsp;
                <button
                  className="btn btn-red"
                  type="button"
                  onClick={() => this.cancelarinventario()}
                >
                  CANCELAR
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { vista } = this.state;
    // const { user } = this.props;
    return (
      <div className="inventario-container">
        <div className="nav-side-section">
          <Profile />
          <NavSide />
        </div>
        <div className="content-section">
          <div className="content-container">{this[vista]()}</div>
        </div>
      </div>
    );
  }

  nuevoRegistro() {
    this.setState({ vista: "renderRegistro" });
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLogin: state.isLogin,
    catalogoList: state.catalogoList,
    categoriaList: state.categoriaList,
    urgenciaList: state.urgenciaList,
    tipoinventarioList: state.tipoinventarioList,
    estadoinventarioList: state.estadoinventarioList,
    usuarioAsignadoList: state.usuarioAsignadoList,
  };
};

export default connect(mapStateToProps, null)(Inventario);
