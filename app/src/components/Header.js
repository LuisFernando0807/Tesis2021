import React from "react";
import { connect } from "react-redux";
import iconoAyudaSvg from "../assets/icono_ayuda 1.svg";
// import Util from "../helper/util";

import "./styles/Header.scss";

class Header extends React.Component {
  render() {
    const { isLogin, user } = this.props;

    return (
      <div className="header">
        <h3 className="header-title">PORTAL DE MESA DE AYUDA TI</h3>
        {isLogin === false ? (
          <div className="header-help">
            <p className="header-help-text">Ayuda&nbsp;</p>
            <img
              className="header-help-icon"
              src={iconoAyudaSvg}
              alt=""
              height="63"
            />
          </div>
        ) : (
          <div className="user-account">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                this.cerrarSesion();
              }}
            >
              <strong>CERRAR SESIÓN</strong>
            </a>
            &nbsp; &nbsp; &nbsp;
            <strong>
              {user.usuario_nombre} {user.usuario_apellido}
            </strong>
          </div>
        )}
      </div>
    );
  }

  cerrarSesion() {
    const { setUser } = this.props;
    localStorage.clear();
    setUser(null);
    this.props.history.push("/login");
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
    setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
