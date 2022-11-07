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
    goal: {_id: "3",user:"3",goalname: "a",goalDescription:"a",__v:"0"},
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

    return response.data;
  };

  const getGoal = async (id) => {
    const GETGOAL_API =  (API_URL + "/" + id)
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.get(GETGOAL_API, config);
    dispatch({type: "GOAL_LOADING", payload: response.data});
    
    return response.data;
  }

  const deleteGoal = async (id) => {
    const DELETE_API =  (API_URL + "/" + id)
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.delete(DELETE_API, config);
    
    return response.data;
  }

  const updateGoal = async (id,goalData) => {
    const UPDATE_API = (API_URL + "/" + id)
    console.log('active')
    console.log(UPDATE_API)
    console.log(goalData)
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    }
    const response = await axios.put(UPDATE_API,goalData,config)

    return response.data;
  }

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
        getGoal,
        deleteGoal,
        updateGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export default GoalContext;
