import { useReducer, createContext } from "react";
import authReducer from "./AuthReducer";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const AuthContext = createContext();

const user = JSON.parse(localStorage.getItem("user"));

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: user ? user : null,
    name: user ? user.name : null,
    loggedIn: user ? true : false,
    isSuccess: false,
  };

  const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      const user = localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "SUCCESS" });
    }

    return response.data;
  };

  const login = async (userData) => {
    const response = await axios.post(API_URL + "/login", userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN", payload: userData.name });
      dispatch({ type: "SUCCESS" });
    }
  };

  const logout = () => localStorage.removeItem("user");

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        user: state.user,
        name: state.name,
        loggedIn: state.loggedIn,
        isSuccess: state.isSuccess,
        dispatch,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
