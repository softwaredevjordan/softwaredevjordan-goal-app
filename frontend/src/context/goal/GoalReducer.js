const goalReducer = (state, action) => {
  switch (action.type) {
    case "GOALS_LOADING":
      return {
        ...state,
        loading: true,
        goals: action.payload,
      };
      case "GOAL_LOADING":
      return {
        ...state,
        loading: true,
        goal: action.payload,
      };
    case "LOADED":
      return {
        ...state,
        loading: false,
      };
    case "GOAL_POSTED":
      return {
        ...state,
        posted: true,
      };
    case "POST_RESET":
      return {
        ...state,
        posted: false,
      };

    default:
      return state;
  }
};

export default goalReducer;
