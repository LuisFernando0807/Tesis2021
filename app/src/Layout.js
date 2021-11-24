import React from "react";
import Header from "./components/Header";
import { useHistory } from "react-router";

function Layout(props) {
  const history = useHistory();

  return (
    <>
      <Header history={history} />
      {props.children}
    </>
  );
}

export default Layout;
