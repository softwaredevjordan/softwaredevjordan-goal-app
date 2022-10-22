const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    case "SUCCESS":
      return {
        ...state,
        isSuccess: true,
      };
    case "RESET":
      return {
        ...state,
        isSuccess: false,
      };
    default:
      return state;
  }
};

export default authReducer;
