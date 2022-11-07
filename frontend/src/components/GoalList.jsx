import React, { useContext, useEffect } from "react";

//contexts
import AuthContext from "../context/auth/AuthContext";
import GoalContext from "../context/goal/GoalContext";

import GoalItem from "./GoalItem";


function GoalList() {
  
  const { getGoals, goals, loading, dispatch, } = useContext(GoalContext);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    if (user) {
      getGoals();
      dispatch({ type: "LOADED" });
      console.log(goals);
    }
  }, [loading]);

  if (!loading && user && goals) 
    return (
      <>
          <ul className="list-unstyled">
            {goals.map((goal) => (
            <GoalItem
              key={goal._id}
              goalName={goal.goalName}
              goalDescription={goal.goalDescription}
              goalId={goal._id}
            />
          ))}
          </ul>
        
      </>
    );
  
}

export default GoalList;
