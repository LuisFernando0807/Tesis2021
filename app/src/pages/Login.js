import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import logoPamolsaSvg from "../assets/Logo_Pamolsa.svg";

import "./styles/Login.scss";

class Login extends React.Component {
  render() {
    const { props } = this;
    if (props.user != null) {
      return <Redirect to="/" />;
    }

    return (<form className="form-login">
        <img className="logo" src={logoPamolsaSvg} alt="" height="134" />
        <div className="input">
          <label>USUARIO</label>
          <input name="usuario" type="text" />
        </div>
        <div className="input">
          <label>CONTRASEÑA</label>
          <input name="usuario" type="text" />
        </div>
        <div className="button">
          <button type="submit">ACCEDER</button>
        </div>
      </form>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProp, null)(Login);
