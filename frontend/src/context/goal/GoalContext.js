import { useReducer, createContext, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
//Reducer
import goalReducer from "./GoalReducer";
import axios from "axios";

//context
import AuthContext from "../auth/AuthContext";

const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const initialState = {
    goals: [],
    goal: {},
    goalname: "",
    goalDescription: "",
    posted: false,
    loading: false,
  };

  const [state, dispatch] = useReducer(goalReducer, initialState);

  const { user } = useContext(AuthContext);

  const API_URL = "http://localhost:5000/api/goals";

  const createGoal = async (goalData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios.post(API_URL, goalData, config);
    dispatch({ type: "GOAL_POSTED" });

    return response.data;
  };

  const getGoals = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios.get(API_URL, config);
    dispatch({ type: "GOALS_LOADING", payload: response.data });
  };

  return (
    <GoalContext.Provider
      value={{
        ...state,
        goals: state.goals,
        goal: state.goal,
        goalname: state.goalname,
        goalDescription: state.goalDescription,
        posted: state.posted,
        loading: state.posted,
        dispatch,
        createGoal,
        getGoals,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export default GoalContext;
