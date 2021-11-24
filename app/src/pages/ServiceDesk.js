import React from "react";
// import fs from "fs";
import Profile from "../components/Profile";
import NavSide from "../components/NavSide";
import KPICard from "../components/KPICard";

import iconIncicente from "../assets/icon_incidente 1.png";
import iconPeticion from "../assets/icon_peticion 1.png";

import "./styles/ServiceDesk.scss";
import { connect } from "react-redux";

class ServiceDesk extends React.Component {
  ticketEmpty = {
    codigo: 0,
    titulo: "",
    detalle: "",
    tipo: "",
    tipoIsReadOnly: false,
    catalogo: "",
    catalogoIsReadOnly: false,
    categoriaId: "",
    urgencia: "",
    usuarioregistro: this.props.user.usuario_codigo,
    archivoAdjunto: {},
    estado: "",
    tiposolucion: "",
    observacion: "",
    usuarioasignado: null,
    usuarioasignado_nombre: "",
    usuarioasignado_apellido: "",
    isReadOnly: false,
    getEstado: (estado) =>
      estado === "A"
        ? "Abierto"
        : estado === "P"
        ? "Proceso"
        : estado === "X"
        ? "Cancelado"
        : estado === "C"
        ? "Cerrado"
        : "",
    getTipoSolucion: (tipoSolucion) =>
      tipoSolucion === "1"
        ? "Solucionado en 1ra Línea"
        : tipoSolucion === "2"
        ? "Escalado a 2da Línea"
        : "",
  };
  searchTicketEmpty = {
    codigoTicket: "",
    resultados: null,
  };

  state = {
    vista: "renderInicio",
    listaKPI: [],
    ticket: Object.assign({}, this.ticketEmpty),
    searchTicket: Object.assign({}, this.searchTicketEmpty),
    seGuardoTicket: false,
    categoriaList: [],
    listTicketPorAtender: null,
  };

  getDataApiInitial() {
    const fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let urlList = [
      `http://localhost:3030/ticket/listar-kpi-mensual/${anio}/${mes}`,
    ];
    let fecthList = urlList.map((x) => fetch(x));
    Promise.all(fecthList)
      .then((r) => Promise.all(r.map((x) => x.json())))
      .then(([dataKPIMensual]) =>
        this.setState({
          listaKPI: (dataKPIMensual || []).map((x) =>
            Object.assign(
              {},
              { number: x.cantidad, text: x.estado_nombre.toUpperCase() }
            )
          ),
        })
      );
  }

  getDataApiBuscarTicketPorCodigo() {
    const { searchTicket } = this.state;
    let url = `http://localhost:3030/ticket/buscar-ticket/codigo/${searchTicket.codigoTicket}`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        searchTicket.resultados = data || [];
        this.setState({ searchTicket });
      });
  }

  getDataApiListarTicketPorAtender() {
    let url = `http://localhost:3030/ticket/buscar-ticket/estado/A`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        this.setState({ listTicketPorAtender: data || [] });
      });
  }

  componentDidMount() {
    this.getDataApiInitial();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.history.location.vista !== undefined) {
      this.setState(
        { vista: prevProps.history.location.vista },
        () => delete prevProps.history.location.vista
      );
    }
  }

  renderInicioU() {
    return (
      <ul className="link-list">
        <li className="link-item">
          <a
            className="link"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              this.cambiarVista("renderTicket", {
                ticket: {
                  ...this.ticketEmpty,
                  tipo: "Incidente",
                  tipoIsReadOnly: true,
                },
              });
            }}
          >
            <img src={iconIncicente} height="120" alt="Incidente" />
            <strong>INCIDENTE</strong>
          </a>
        </li>
        <li className="link-item">
          <a
            className="link"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              this.cambiarVista("renderTicket", {
                ticket: {
                  ...this.ticketEmpty,
                  tipo: "Petición",
                  tipoIsReadOnly: true,
                },
              });
            }}
          >
            <img src={iconPeticion} height="120" alt="Peticion" />
            <strong>PETICION</strong>
          </a>
        </li>
      </ul>
    );
  }

  renderInicioA() {
    const { listTicketPorAtender, ticket } = this.state;
    if (listTicketPorAtender == null) this.getDataApiListarTicketPorAtender();
    return (
      <div className="ticket-form">
        <div className="title">
          <strong>TICKETS POR ATENDER</strong>
        </div>
        <br />
        <div className="results-container">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Código</th>
                <th>Usuario</th>
                <th>Problema</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {(listTicketPorAtender || []).length === 0 ? (
                <tr>
                  <th colSpan="6">No se encontraron resultados</th>
                </tr>
              ) : (
                listTicketPorAtender.map((x, i) => {
                  let fechaRegistro = new Date(x.tkt_fecharegistro);
                  let fechaRegistroStr = fechaRegistro.toLocaleDateString(
                    "es-PE",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  );
                  let usuarioRegistro = `${x.usuarioregistro_nombre} ${x.usuarioregistro_apellido}`;
                  let estadoStr = ticket.getEstado(x.tkt_estado);
                  return (
                    <tr key={i}>
                      <td className="center">{fechaRegistroStr}</td>
                      <td className="center">{x.tkt_codigo}</td>
                      <td className="center">{usuarioRegistro}</td>
                      <td className="center">{x.tkt_detalle}</td>
                      <td className="center">{x.tkt_urgencia}</td>
                      <td className="center">{estadoStr}</td>
                      <td className="center">
                        <a
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            this.cambiarVista("renderTicket", {
                              ticket: Object.assign(
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

  renderTicketU() {
    const { ticket, categoriaList } = this.state;
    const {
      catalogoList,
      urgenciaList,
      tipoTicketList,
      usuarioAsignadoList,
      estadoTicketList,
      user,
    } = this.props;
    // console.log(ticket);
    return (
      <div className="ticket-form">
        <div className="title">
          <strong>NUEVA SOLICITUD</strong>
        </div>
        <div className="form-container">
          <div className="title-container">
            <label>TITULO:</label>
            &nbsp;
            <div className="input-container">
              <input
                type="text"
                value={ticket.titulo}
                onChange={(e) => {
                  e.preventDefault();
                  this.changeTitulo(e.currentTarget.value);
                }}
                {...{ readOnly: ticket.codigo > 0 ? true : ticket.isReadOnly }}
              />
            </div>
          </div>
          <br />
          <div className="detail-container">
            <label>DETALLE PROBLEMA:</label>
            &nbsp;
            <div className="input-container">
              <textarea
                value={ticket.detalle}
                rows="5"
                onChange={(e) => {
                  e.preventDefault();
                  this.changeDetalle(e.currentTarget.value);
                }}
                {...{ readOnly: ticket.codigo > 0 ? true : ticket.isReadOnly }}
              ></textarea>
            </div>
          </div>
          <br />
          <div className="type-container">
            <label>TIPO:</label>
            &nbsp;
            <div className="input-container">
              <select
                value={ticket.tipo}
                onChange={(e) => this.changeTipo(e.currentTarget.value)}
                {...{
                  disabled:
                    ticket.codigo > 0
                      ? true
                      : ticket.isReadOnly === false
                      ? ticket.tipoIsReadOnly
                      : ticket.isReadOnly,
                }}
              >
                <option value="">[Seleccione...]</option>
                {tipoTicketList.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <div className="catalog-container">
            <label>CATALOGO:</label>
            &nbsp;
            <div className="input-container">
              <select
                value={ticket.catalogo}
                onChange={(e) => this.changeCatalogo(e.currentTarget.value)}
                {...{
                  disabled:
                    ticket.codigo > 0
                      ? true
                      : ticket.isReadOnly === false
                      ? ticket.catalogoIsReadOnly
                      : ticket.isReadOnly,
                }}
              >
                <option value="">[Seleccione...]</option>
                {catalogoList.map((item, index) => (
                  <option key={index} value={item.catalogo_nombre}>
                    {item.catalogo_nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <div className="category-container">
            <label>CATEGORIA:</label>
            &nbsp;
            <div className="input-container">
              <select
                value={ticket.categoriaId}
                onChange={(e) => this.changeCategoria(e.currentTarget.value)}
                {...{ disabled: ticket.codigo > 0 ? true : ticket.isReadOnly }}
              >
                <option value="">[Seleccione...]</option>
                {categoriaList.map((item, index) => (
                  <option key={index} value={item.categoria_codigo}>
                    {item.categoria_descripcion}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <div className="urgency-container">
            <label>URGENCIA:</label>
            &nbsp;
            <div className="input-container">
              <select
                value={ticket.urgencia}
                onChange={(e) => this.changeUrgencia(e.currentTarget.value)}
                {...{ disabled: ticket.codigo > 0 ? true : ticket.isReadOnly }}
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
          <br />
          <div className="attached-container">
            <label>ADJUNTO:</label>
            &nbsp;
            <div className="file-container">
              <div className="input-container">
                <input
                  type="text"
                  value={ticket.archivoAdjunto.nombre || ""}
                  readOnly
                />
                {(ticket.codigo > 0 ? true : ticket.isReadOnly) ? null : (
                  <button
                    type="button"
                    className="btn"
                    onClick={() => this.openInputFile("#fle-aprobacion")}
                    {...{
                      disabled: ticket.codigo > 0 ? true : ticket.isReadOnly,
                    }}
                  >
                    ...
                  </button>
                )}
              </div>
              <input
                id="fle-aprobacion"
                type="file"
                style={{ display: "none" }}
                onChange={this.changeInputFile}
              />
            </div>
          </div>
          {user.usuario_perfil === "U" && ticket.codigo > 0 ? null : (
            <>
              {ticket.codigo === 0 ? null : (
                <>
                  <br />
                  <div className="title">
                    <strong>MODIFICACIÓN</strong>
                  </div>
                </>
              )}
              {ticket.codigo === 0 ? null : (
                <>
                  <br />
                  <div className="observation-container">
                    <label>OBSERVACIÓN:</label>
                    &nbsp;
                    <div className="input-container">
                      <textarea
                        value={ticket.observacion}
                        rows="5"
                        onChange={(e) => {
                          e.preventDefault();
                          this.changeObservacion(e.currentTarget.value);
                        }}
                        {...{ readOnly: ticket.isReadOnly }}
                      ></textarea>
                    </div>
                  </div>
                </>
              )}

              {ticket.codigo === 0 ? null : (
                <>
                  <br />
                  <div className="state-container">
                    <label>ESTADO:</label>
                    &nbsp;
                    <div className="input-container">
                      <select
                        value={ticket.estado}
                        onChange={(e) =>
                          this.changeEstado(e.currentTarget.value)
                        }
                        {...{ disabled: ticket.isReadOnly }}
                      >
                        <option value="">[Seleccione...]</option>
                        {estadoTicketList.map((item, index) => (
                          <option key={index} value={item.estado_codigo}>
                            {item.estado_nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
              {ticket.estado !== "A" || ticket.codigo === 0 ? null : (
                <>
                  <br />
                  <div className="assign-container">
                    <label>ASIGNADO:</label>
                    &nbsp;
                    <div className="input-container">
                      <select
                        value={ticket.usuarioasignado || ""}
                        onChange={(e) =>
                          this.changeUsuarioAsignado(e.currentTarget.value)
                        }
                        {...{ disabled: ticket.isReadOnly }}
                      >
                        <option value="">[Seleccione...]</option>
                        {usuarioAsignadoList.map((item, index) => (
                          <option key={index} value={item.usuario_codigo}>
                            {item.usuario_nombre} {item.usuario_apellido} (
                            {item.cargo_descripcion} - {item.aro_descripcion})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
              {ticket.estado !== "C" || ticket.codigo === 0 ? null : (
                <>
                  <br />
                  <div className="solution-type-container">
                    <label>TIPO DE SOLUCIÓN:</label>
                    &nbsp;
                    <div className="input-container">
                      <label>
                        <input
                          type="radio"
                          name="tipo-solucion"
                          value="1"
                          {...{ checked: ticket.tiposolucion === "1" }}
                          onChange={(e) => {
                            this.changeTipoSolucion(e.currentTarget.value);
                          }}
                        />
                        &nbsp;Solucionado en 1ra Línea
                      </label>
                      &nbsp;
                      <label>
                        <input
                          type="radio"
                          name="tipo-solucion"
                          value="2"
                          {...{ checked: ticket.tiposolucion === "2" }}
                          onChange={(e) => {
                            this.changeTipoSolucion(e.currentTarget.value);
                          }}
                        />
                        &nbsp;Escalado a 2da Línea
                      </label>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <div className="btns">
            {ticket.isReadOnly ? (
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
                  onClick={() => {
                    let vista = "renderBusquedaTicket";
                    if (user.usuario_perfil === "A") vista = "renderInicio";
                    this.cambiarVista(vista, {
                      searchTicket: { ...this.searchTicketEmpty },
                    });
                  }}
                >
                  REGRESAR
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn"
                  type="button"
                  onClick={() =>
                    ticket.codigo === 0
                      ? this.guardarTicket()
                      : this.guardarTicketDetalle()
                  }
                >
                  ENVIAR
                </button>
                &nbsp;
                <button
                  className="btn btn-red"
                  type="button"
                  onClick={() => this.cancelarTicket()}
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

  renderTicketA = () => this.renderTicketU();

  renderBusquedaTicketU() {
    const { searchTicket } = this.state;

    if (searchTicket.resultados == null) this.buscarTicket();

    return (
      <div className="ticket-form">
        <div className="title">
          <strong>BÚSQUEDA DE TICKETS</strong>
        </div>
        <br />
        <div className="search-container">
          <div className="input-container">
            <input
              type="text"
              value={searchTicket.codigoTicket}
              placeholder="Ingrese el código del ticket"
              onChange={(e) => {
                e.preventDefault();
                this.changeCodigoTicketSearch(e.currentTarget.value);
              }}
            />
            &nbsp;
            <button
              type="button"
              onClick={(e) => {
                this.buscarTicket();
              }}
            >
              BUSCAR
            </button>
          </div>
        </div>
        <br />
        <div className="results-container">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Código</th>
                <th>Usuario</th>
                <th>Problema</th>
                <th>Prioridad</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {(searchTicket.resultados || []).length === 0 ? (
                <tr>
                  <th colSpan="6">No se encontraron resultados</th>
                </tr>
              ) : (
                searchTicket.resultados.map((x, i) => {
                  let fechaRegistro = new Date(x.tkt_fecharegistro);
                  let fechaRegistroStr = fechaRegistro.toLocaleDateString(
                    "es-PE",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  );
                  let usuarioRegistro = `${x.usuarioregistro_nombre} ${x.usuarioregistro_apellido}`;
                  return (
                    <tr key={i}>
                      <td className="center">{fechaRegistroStr}</td>
                      <td className="center">{x.tkt_codigo}</td>
                      <td className="center">{usuarioRegistro}</td>
                      <td className="center">{x.tkt_detalle}</td>
                      <td className="center">{x.tkt_urgencia}</td>
                      <td className="center">
                        <a
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            this.cambiarVista("renderTicket", {
                              ticket: Object.assign(
                                {},
                                {
                                  codigo: 0,
                                  titulo: x.tkt_titulo,
                                  detalle: x.tkt_detalle,
                                  tipo: x.tkt_tipo,
                                  tipoIsReadOnly: false,
                                  catalogo: x.categoria_catalogo,
                                  catalogoIsReadOnly: false,
                                  categoriaId: x.tkt_categoria,
                                  urgencia: x.tkt_urgencia,
                                  usuarioregistro: x.tkt_usuarioregistro,
                                  archivoAdjunto: {
                                    nombre: x.arch_nombre,
                                    tipo: x.arch_tipocontenido,
                                  },
                                  isReadOnly: true,
                                }
                              ),
                              categoriaList: this.props.categoriaList.filter(
                                (y) =>
                                  y.categoria_catalogo === x.categoria_catalogo
                              ),
                            });
                          }}
                        >
                          Ver Detalle
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

  renderBusquedaTicketA = () => this.renderBusquedaTicketU();

  renderCatalogoServicioU() {
    const { catalogoList } = this.props;
    // var iconIncicente from "../assets/icon_incidente 1.png";

    return catalogoList.length === 0 ? null : (
      <ul className="link-list horizontal">
        {catalogoList.map((x, i) => {
          // const imgSrc = fs.readFileSync(`../assets/icon_${x.catalogo_nombre.toLowerCase()}.png`);
          const imgSrc =
            require(`./../assets/icon_${x.catalogo_nombre.toLowerCase()}.png`).default;
          return (
            <li key={i} className="link-item">
              <a
                className="link"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  this.cambiarVista("renderTicket", {
                    ticket: {
                      ...this.ticketEmpty,
                      catalogo: x.catalogo_nombre,
                      catalogoIsReadOnly: true,
                      tipoIsReadOnly: false,
                    },
                    categoriaList: this.props.categoriaList.filter(
                      (y) => y.categoria_catalogo === x.catalogo_nombre
                    ),
                  });
                }}
              >
                <img src={imgSrc} height="120" alt={x.catalogo_nombre} />
                <strong>{x.catalogo_nombre}</strong>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  renderCatalogoServicioA = () => this.renderCatalogoServicioU();

  renderMensajeU() {
    const { seGuardoTicket, ticket } = this.state;
    return (
      <div className="ticket-form">
        <div className="title">
          <h3>{`${seGuardoTicket ? "S" : "No s"}e guardó el ticket`}</h3>
        </div>
        <div className="form-container">
          <div className="btns">
            <button
              className="btn"
              type="button"
              onClick={() => this.cancelarTicket()}
            >
              REGRESAR
            </button>
            {ticket.codigo > 0 ? null : (
              <>
                &nbsp;
                <button
                  className="btn btn-red"
                  type="button"
                  onClick={() => this.registrarNuevoTicket()}
                >
                  REGISTRAR NUEVO TICKET
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  renderMensajeA = () => this.renderMensajeU();

  render() {
    const { listaKPI, vista } = this.state;
    const { user } = this.props;

    return (
      <div className="service-desk-container">
        <div className="nav-side-section">
          <Profile />
          <NavSide />
        </div>
        <div className="content-section">
          <ul className="kpi-list">
            {listaKPI.map((x, i) => (
              <KPICard key={i} {...x} />
            ))}
          </ul>
          <div className="content-container">
            {this[`${vista}${user.usuario_perfil}`]()}
          </div>
        </div>
      </div>
    );
  }

  cambiarVista(vista, state = {}) {
    let currentTicketState = { ticket: { ...this.state.ticket } };
    let stateResult = this.combineState(currentTicketState, state);
    this.setState({ vista: vista, ...stateResult });
  }

  combineState(obj, objRplc) {
    console.log(obj);
    console.log(objRplc);
    let props = Object.keys(objRplc || {});

    if (props.length === 0 && objRplc !== null) obj = {};
    else if (objRplc === null) obj = objRplc;
    else {
      for (let prop of props) {
        if (obj[prop] !== undefined) {
          if (
            typeof objRplc[prop] != "object" ||
            (typeof objRplc[prop] == "object" && typeof obj[prop] != "object")
          )
            obj[prop] = objRplc[prop];
          else obj[prop] = this.combineState(obj[prop], objRplc[prop]);
        } else obj[prop] = objRplc[prop];
      }
    }

    return obj;
  }

  changeTitulo = (value) =>
    this.setState({
      ticket: this.combineState({ ...this.state.ticket }, { titulo: value }),
    });

  changeDetalle = (value) =>
    this.setState({
      ticket: this.combineState({ ...this.state.ticket }, { detalle: value }),
    });

  changeTipo = (value) =>
    this.setState({
      ticket: this.combineState({ ...this.state.ticket }, { tipo: value }),
    });

  changeCatalogo = (value) =>
    this.setState({
      ticket: this.combineState(
        { ...this.state.ticket },
        {
          catalogo: value,
          categoriaId: "",
        }
      ),
      categoriaList:
        value === ""
          ? []
          : this.props.categoriaList.filter(
              (x) => x.categoria_catalogo === value
            ),
    });

  changeCategoria = (value) =>
    this.setState({
      ticket: this.combineState(
        { ...this.state.ticket },
        { categoriaId: value }
      ),
    });

  changeUrgencia = (value) =>
    this.setState({
      ticket: this.combineState({ ...this.state.ticket }, { urgencia: value }),
    });

  changeObservacion = (value) =>
    this.setState({
      ticket: this.combineState(
        { ...this.state.ticket },
        { observacion: value }
      ),
    });

  changeTipoSolucion = (value) =>
    this.setState({
      ticket: this.combineState(
        { ...this.state.ticket },
        { tiposolucion: value }
      ),
    });

  changeEstado = (value) =>
    this.setState({
      ticket: this.combineState(
        { ...this.state.ticket },
        { estado: value, tiposolucion: "", usuarioasignado: null }
      ),
    });

  changeUsuarioAsignado = (value) =>
    this.setState({
      ticket: this.combineState(
        { ...this.state.ticket },
        { usuarioasignado: value }
      ),
    });

  openInputFile(idSelector) {
    document.querySelector(idSelector).click();
  }

  changeInputFile = ({ currentTarget }) => {
    const { files } = currentTarget;

    var objFile = {};

    if (files.length === 0) {
      this.setState({
        ticket: this.combineState(
          { ...this.state.ticket },
          { archivoAdjunto: objFile }
        ),
      });
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

    let newTicket = this.combineState(
      { ...this.state.ticket },
      { archivoAdjunto: objFile }
    );

    // console.log(newTicket);

    this.setState({
      ticket: newTicket,
    });
  };

  guardarTicket() {
    const { ticket } = this.state;

    const formData = new FormData();
    formData.append("archivo", ticket.archivoAdjunto.file);
    formData.append("titulo", ticket.titulo);
    formData.append("detalle", ticket.detalle);
    formData.append("tipo", ticket.tipo);
    // formData.append("catalogo", ticket.catalogo);
    formData.append("categoriaId", ticket.categoriaId);
    formData.append("urgencia", ticket.urgencia);
    formData.append("usuarioregistro", ticket.usuarioregistro);
    let url = `http://localhost:3030/ticket/guardar`;

    let init = {};
    init.method = "POST";
    init.body = formData;

    fetch(url, init)
      .then((x) => x.json())
      .then((data) => {
        this.setState(
          { vista: "renderMensaje", seGuardoTicket: data },
          this.getDataApiInitial
        );
      });
  }

  guardarTicketDetalle() {
    const { ticket } = this.state;

    const data = {};
    data.codigo = ticket.codigo;
    data.observacion = ticket.observacion;
    data.tiposolucion = ticket.tiposolucion;
    data.estado = ticket.estado;
    data.usuarioasignado = ticket.usuarioasignado;
    let url = `http://localhost:3030/ticket-detalle/guardar`;

    let init = {};
    init.method = "POST";
    init.body = JSON.stringify(data);
    init.headers = {};
    init.headers["Content-Type"] = "application/json";

    fetch(url, init)
      .then((x) => x.json())
      .then((data) => {
        this.setState(
          { vista: "renderMensaje", seGuardoTicket: data },
          this.getDataApiInitial
        );
      });
  }

  cancelarTicket() {
    this.setState({
      vista: "renderInicio",
      ticket: Object.assign({}, this.ticketEmpty),
      seGuardoTicket: false,
    });
  }

  registrarNuevoTicket() {
    let { ticket } = this.state;
    let newTicket = this.combineState(this.ticketEmpty, {
      tipo: ticket.tipo,
      tipoIsReadOnly: ticket.tipoIsReadOnly,
      catalogo: ticket.catalogo,
      catalogoIsReadOnly: ticket.catalogoIsReadOnly,
    });
    this.setState({
      vista: "renderTicket",
      ticket: Object.assign({}, newTicket),
      seGuardoTicket: false,
    });
  }

  changeCodigoTicketSearch(value) {
    this.setState({
      searchTicket: this.combineState(
        { ...this.state.searchTicket },
        { codigoTicket: value }
      ),
    });
  }

  buscarTicket() {
    this.getDataApiBuscarTicketPorCodigo();
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLogin: state.isLogin,
    catalogoList: state.catalogoList,
    categoriaList: state.categoriaList,
    urgenciaList: state.urgenciaList,
    tipoTicketList: state.tipoTicketList,
    estadoTicketList: state.estadoTicketList,
    usuarioAsignadoList: state.usuarioAsignadoList,
  };
};

export default connect(mapStateToProps, null)(ServiceDesk);
