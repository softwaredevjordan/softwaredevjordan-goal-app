import React, { useContext, useEffect } from "react";

//contexts
import AuthContext from "../context/auth/AuthContext";
import GoalContext from "../context/goal/GoalContext";
import GoalItem from "./GoalItem";

//components

function GoalList() {
  const { getGoals, goals, loading, dispatch } = useContext(GoalContext);
  const { user } = useContext(AuthContext);
  const elements = [];
  const listGoals = () => {
    {
      elements.map((goal) => (
        <GoalItem
          key={goals.id}
          goalName={goal.goalName}
          goalDescription={goal.goalDescription}
        />
      ));
    }
  };
  // Zach this is where the problem lies. I want the site to check the GoalContext and rerender when goals array changes. I thought no dependency array would accomplish it but it didnt. I have used varibles in the dependency array and that did not work either. I either get an array with 0 or the array with the correct amount of goals but it is on a infinite loop.
  useEffect(() => {
    if (user) {
      getGoals();
      dispatch({ type: "GOALS_LOADED" });
      console.log(goals);
    }
  }, [loading]);
  if (!loading) {
    return (
      <>
        {
          <ul>
            {goals.map((goal) => (
              <GoalItem
                key={goal.id}
                goalName={goal.goalName}
                goalDescription={goal.goalDescription}
              />
            ))}

            {/* {elements.map((goal) => (
            <GoalItem
              goalName={goal.goalName}
              goalDescription={goal.goalDescription}
            />
          ))} */}
          </ul>
        }
      </>
    );
  }
}

export default GoalList;
