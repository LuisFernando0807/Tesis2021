import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import iconoAyudaSvg from '../assets/icono_ayuda 1.svg';

import "./styles/NavSide.scss";

class NavSide extends React.Component {
  render() {
    // const [user] = useState(localStorage.user == null ? null : JSON.parse(atob(localStorage.user)));

    const { user } = this.props;

    return (
      <ul className="nav-section">
        <li className="title">PANEL</li>
        {user.navList.map((x, i) => {
          return (
            <li key={i} className="menu">
              <span>{x.text}</span>
              <ul className="nav-list">
                {x.children.map((y, ii) => {
                  let { vista } = y;
                  let to = { pathname: y.link };
                  if (vista !== undefined) to = { ...to, vista };
                  return (
                    <li key={ii} className="item">
                      <Link className="link" {...{ to: to }}>
                        &gt; {y.text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLogin: state.isLogin,
  };
};

export default connect(mapStateToProps, null)(NavSide);
