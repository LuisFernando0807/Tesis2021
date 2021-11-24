import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import imgGestionInventarios from "../assets/icon_inventario 1.svg";
import imgServiceDesk from "../assets/icon_servicedesk 1.svg";
import imgGestionFileServer from "../assets/icon_fileserver 1.svg";

import "./styles/Home.scss";
// import Util from "../helper/util";

class Home extends React.Component {
  // constructor(props) {
  //   new Util().initLogin(props);
  //   super(props);
  // }

  render() {
    const { user } = this.props;
    if (user == null) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="home-container">
        <div className="title">
          <h3>
            SELECCIONE EL SERVICIO
            <br />A GESTIONAR
          </h3>
        </div>
        <div className="list-container">
          <ul className="list">
            <li className="item">
              <Link to="/gestion-inventario" className="btn">
                <div className="img">
                  <img
                    src={imgGestionInventarios}
                    alt="Gestión de Inventarios"
                  />
                </div>
                <div className="text">Gestión de Inventarios</div>
              </Link>
            </li>
            <li className="item">
              <Link to="/service-desk" className="btn">
                <div className="img">
                  <img src={imgServiceDesk} alt="Service Desk" />
                </div>
                <div className="text">Service Desk</div>
              </Link>
            </li>
            <li className="item">
              <Link to="/gestion-file-server" className="btn">
                <div className="img">
                  <img
                    src={imgGestionFileServer}
                    alt="Gestión de File Server"
                  />
                </div>
                <div className="text">Gestión de File Server</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLogin: state.isLogin,
  };
};

export default connect(mapStateToProps, null)(Home);