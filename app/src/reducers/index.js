const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isLogin: action.payload != null,
      };
    case "SET_LIST_CARPETACOMPARTIDA":
      return { ...state, carpetaCompartidaList: action.payload };
    case "SET_LIST_CATALOGO":
      return { ...state, catalogoList: action.payload };
    case "SET_LIST_CATEGORIA":
      return { ...state, categoriaList: action.payload };
    case "SET_LIST_URGENCIA":
      return { ...state, urgenciaList: action.payload };
    case "SET_LIST_TIPOTICKET":
      return { ...state, tipoTicketList: action.payload };
    case "SET_LIST_TIPOPERMISO":
      return { ...state, tipoPermisoList: action.payload };
    case "SET_LIST_USUARIOASIGNADO":
      return { ...state, usuarioAsignadoList: action.payload };
    case "SET_LIST_ESTADOTICKET":
      return { ...state, estadoTicketList: action.payload };
    default:
      return state;
  }
};

export default reducer;
