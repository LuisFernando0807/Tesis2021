import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import logoPamolsaSvg from "../assets/Logo_Pamolsa.svg";

import "./styles/Login.scss";

class Login extends React.Component {
  state = {
    usuario: "",
    contraseña: "",
    errorUsuario: "",
    errorContraseña: "",
    errorLogin: "",
  };

  render() {
    const { state, props } = this;
    const { usuario, contraseña, errorUsuario, errorContraseña, errorLogin } =
      state;
    const { user } = props;
    if (user != null) {
      return <Redirect to="/" />;
    }

    return (
      <form
        className="form-login"
        onSubmit={(e) => {
          e.preventDefault();
          this.submitLogin();
        }}
      >
        <img className="logo" src={logoPamolsaSvg} alt="" height="134" />
        <div className="input">
          <label>USUARIO</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => {
              e.preventDefault();
              this.changeUsuario(e.currentTarget.value);
            }}
          />
        </div>
        {errorUsuario === "" ? null : (
          <div className="label-error">{errorUsuario}</div>
        )}
        <div className="input">
          <label>CONTRASEÑA</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => {
              e.preventDefault();
              this.changePassword(e.currentTarget.value);
            }}
          />
        </div>
        {errorContraseña === "" ? null : (
          <div className="label-error">{errorContraseña}</div>
        )}
        <div className="button">
          <button type="submit">ACCEDER</button>
        </div>
        {errorLogin === "" ? null : (
          <div className="label-error">{errorLogin}</div>
        )}
      </form>
    );
  }

  changeUsuario = (value) => this.setState({ usuario: value });

  changePassword = (value) => this.setState({ contraseña: value });

  submitLogin() {
    const { usuario, contraseña } = this.state;
    let errorUsuario = "",
      errorContraseña = "";
    let formValido = usuario !== "" && contraseña !== "";

    if (usuario === "") errorUsuario = "Debe ingresar usuario";
    if (contraseña === "") errorContraseña = "Debe ingresar contraseña";

    if (formValido) {
      let url = `http://localhost:3030/usuario/obtener-por-correo/${usuario}`;
      fetch(url)
        .then((r) => r.json())
        .then((data) => this.getResponseLogin(data));
    } else this.setState({ errorUsuario, errorContraseña });
  }

  getResponseLogin(data) {
    const { contraseña } = this.state;
    if (data == null) {
      this.setState({ errorLogin: "Usuario no existe" });
    } else {
      let clave = atob(data.usuario_clave);
      if (clave !== contraseña) {
        this.setState({ errorLogin: "Contraseña no existe" });
        // return;
      } else {
        let user = { ...data };
        delete user.usuario_clave;
        let navList = [
          {
            text: "SOLICITUD DE SERVICIO",
            children: [
              {
                text: "CATALOGO DE SOLICITUDES",
                link: "/service-desk",
                vista: "renderCatalogoServicio",
              },
              {
                text: "BÚSQUEDA DE SOLICITUDES",
                link: "/service-desk",
                vista: "renderBusquedaTicket",
              },
            ],
          },
          {
            text: "FORMATOS",
            children: [
              { text: "PERMISOS ESPECIALES", link: "/" },
              { text: "CREACIÓN DE USUARIO Y CORREO", link: "/" },
            ],
          },
          {
            text: "MANUALES",
            children: [
              { text: "CAMBIO DE CONTRASEÑA", link: "/" },
              { text: "CONTACTO LINEA 25000 CON LÍNEA EXTERNA", link: "/" },
            ],
          },
          // {
          //   text: "ENCUESTAS",
          //   children: [
          //     { text: "DILIGENCIADAS", link: "/" },
          //     { text: "NO DILIGENCIADAS", link: "/" },
          //   ],
          // },
        ];

        if (data.usuario_perfil === "A")
          navList = [
            {
              text: "SOLICITUD DE SERVICIO",
              children: [
                {
                  text: "CATALOGO DE SOLICITUDES",
                  link: "/service-desk",
                  vista: "renderCatalogoServicio",
                },
                {
                  text: "BÚSQUEDA DE SOLICITUDES",
                  link: "/service-desk",
                  vista: "renderBusquedaTicket",
                },
              ],
            },
            // {
            //   text: "CONSULTAS",
            //   children: [
            //     { text: "ADM. FILE SERVER", link: "/" },
            //     { text: "BÚSQUEDA DE SOLICITUD", link: "/" },
            //   ],
            // },
            {
              text: "MATENIMIENTO",
              children: [{ text: "USUARIOS", link: "/" }],
            },
          ];
        user.navList = navList;
        localStorage.setItem("user", btoa(JSON.stringify(user)));
        this.getDataApiInitial(() => this.props.setUser(user));
      }
    }
  }

  getDataApiInitial(fn = () => {}) {
    let urlList = [
      `http://localhost:3030/carpetas-compartidas/listar`,
      `http://localhost:3030/catalogo/listar`,
      `http://localhost:3030/categoria/listar`,
      `http://localhost:3030/usuario/listar-asignados`,
    ];
    let fecthList = urlList.map((x) => fetch(x));
    const {
      setListCarpetaCompartida,
      setListCatalogo,
      setListCategoria,
      setListUrgencia,
      setListTipoTicket,
      setListTipoPermiso,
      setListUsuarioAsignado,
      setListEstadoTicket,
    } = this.props;
    Promise.all(fecthList)
      .then((r) => Promise.all(r.map((x) => x.json())))
      .then(([dataCarpetaCompartida, dataCatalogo, dataCategoria, dataUsuarioAsignado]) => {
        let dataUrgencia = ["Bajo", "Medio", "Alto"];
        let dataTipoTicket = ["Incidente", "Petición"];
        let dataTipoPermiso = ["Lectura", "Lectura/Escritura"];
        let dataEstadoTicket = [
          { estado_codigo: "A", estado_nombre: "Abierto", estado_tipo: "I" },
          { estado_codigo: "P", estado_nombre: "Proceso", estado_tipo: "" },
          { estado_codigo: "X", estado_nombre: "Anulado", estado_tipo: "" },
          { estado_codigo: "C", estado_nombre: "Cerrado", estado_tipo: "F" },
        ];

        localStorage.setItem(
          "carpetaCompartidaList",
          btoa(JSON.stringify(dataCarpetaCompartida || []))
        );
        localStorage.setItem(
          "catalogoList",
          btoa(JSON.stringify(dataCatalogo || []))
        );
        localStorage.setItem(
          "categoriaList",
          btoa(JSON.stringify(dataCategoria || []))
        );
        localStorage.setItem(
          "urgenciaList",
          btoa(JSON.stringify(dataUrgencia || []))
        );
        localStorage.setItem(
          "tipoTicketList",
          btoa(JSON.stringify(dataTipoTicket || []))
        );
        localStorage.setItem(
          "tipoPermisoList",
          btoa(JSON.stringify(dataTipoPermiso || []))
        );
        localStorage.setItem(
          "usuarioAsignadoList",
          btoa(JSON.stringify(dataUsuarioAsignado || []))
        );
        localStorage.setItem(
          "estadoTicketList",
          btoa(JSON.stringify(dataEstadoTicket || []))
        );

        setListCarpetaCompartida(dataCarpetaCompartida || []);
        setListCatalogo(dataCatalogo || []);
        setListCategoria(dataCategoria || []);
        setListUrgencia(dataUrgencia || []);
        setListTipoTicket(dataTipoTicket || []);
        setListTipoPermiso(dataTipoPermiso || []);
        setListUsuarioAsignado(dataUsuarioAsignado || []);
        setListEstadoTicket(dataEstadoTicket || []);
        fn();
      });
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (payload) => dispatch({ type: "SET_USER", payload }),
    setListCarpetaCompartida: (payload) =>
      dispatch({ type: "SET_LIST_CARPETACOMPARTIDA", payload }),
    setListCatalogo: (payload) =>
      dispatch({ type: "SET_LIST_CATALOGO", payload }),
    setListCategoria: (payload) =>
      dispatch({ type: "SET_LIST_CATEGORIA", payload }),
    setListUrgencia: (payload) =>
      dispatch({ type: "SET_LIST_URGENCIA", payload }),
    setListTipoTicket: (payload) =>
      dispatch({ type: "SET_LIST_TIPOTICKET", payload }),
    setListTipoPermiso: (payload) =>
      dispatch({ type: "SET_LIST_TIPOPERMISO", payload }),
    setListUsuarioAsignado: (payload) =>
      dispatch({ type: "SET_LIST_USUARIOASIGNADO", payload }),
    setListEstadoTicket: (payload) =>
      dispatch({ type: "SET_LIST_ESTADOTICKET", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
