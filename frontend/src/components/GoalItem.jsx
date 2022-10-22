import React from "react";
import { Link } from "react-router-dom";
//constexts

function GoalItem(goalName, goalDescription) {
  return (
    <li>
      <Link>
        <h5>{goalName}</h5>
        <p>{goalDescription}</p>
      </Link>
    </li>
  );
}

export default GoalItem;
