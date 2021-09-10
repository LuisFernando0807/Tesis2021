const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USUARIO":
        return {
            ...state,
            user: action.payload
        }
    default:
        return state;
  }

};

export default reducer;
