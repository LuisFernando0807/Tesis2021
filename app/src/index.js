import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from './reducers'
// import reportWebVitals from './reportWebVitals';

const initialState = {
  user: localStorage.user == null ? null : JSON.parse(atob(localStorage.user)),
  isLogin: localStorage.user != null,
  carpetaCompartidaList: localStorage.carpetaCompartidaList == null ? null : JSON.parse(atob(localStorage.carpetaCompartidaList)),
  catalogoList: localStorage.catalogoList == null ? null : JSON.parse(atob(localStorage.catalogoList)),
  categoriaList: localStorage.categoriaList == null ? null : JSON.parse(atob(localStorage.categoriaList)),
  urgenciaList: localStorage.urgenciaList == null ? null : JSON.parse(atob(localStorage.urgenciaList)),
  tipoTicketList: localStorage.tipoTicketList == null ? null : JSON.parse(atob(localStorage.tipoTicketList)),
  tipoPermisoList: localStorage.tipoPermisoList == null ? null : JSON.parse(atob(localStorage.tipoPermisoList)),
  estadoTicketList: localStorage.estadoTicketList == null ? null : JSON.parse(atob(localStorage.estadoTicketList)),
  usuarioAsignadoList: localStorage.usuarioAsignadoList == null ? null : JSON.parse(atob(localStorage.usuarioAsignadoList)),
};

const store = createStore(reducer, initialState);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
