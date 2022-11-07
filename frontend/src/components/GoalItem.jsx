import React,{useContext, useEffect} from "react";
import { Link,Navigate, useNavigate } from "react-router-dom";

//context
import GoalContext from "../context/goal/GoalContext";

function GoalItem({goalName, goalDescription,goalId, }) {
  
  const {deleteGoal} = useContext(GoalContext)

  const navigate = useNavigate();
  
  //Deletes Goal
  const Delete = () => {
    console.log("Goal Item:" + goalId)
    deleteGoal(goalId);
    document.getElementById(goalId).remove()
  }
  //navigate user to edit goal 
  const goToEdit = () => {

    navigate(`/:${goalId}`)
  }

  return (
    <li id={goalId} className="m-5 p-2 card ">
      <div className="d-flex justify-content-end">
        <button className="btn btn-success m-3" onClick={goToEdit}>
          Edit Goal
        </button>
      </div>
      <h3 className="d-flex justify-content-center p-2 m-2">{goalName}</h3>
      <p className="p-3 m-2">{goalDescription}</p>
      <div className="d-flex justify-content-end">
        <button className="btn btn-success m-3" onClick={Delete}>Goal Completed</button>
      </div>
    </li>
  );
}

export default GoalItem;
