import React, { useContext } from "react";
//contexts
import AuthContext from "../context/auth/AuthContext";
import GoalContext from "../context/goal/GoalContext";

//components
import LinkButton from "../components/LinkButton";
import GoalList from "../components/GoalList";
import { useEffect } from "react";


function Home() {
  const { getGoals } = useContext(GoalContext);
  const { loggedIn, dispatch, user, name } = useContext(AuthContext);

  if (loggedIn){
  return (
    <div>
      <h1 className="d-flex justify-content-center my-5">Welcome {name}!</h1>
      <div className="d-grid col-6 gap-2">
        <LinkButton
          text="Create Goal"
          too="/new-goal"
          bootStrapClass="btn btn-dark mx-5 my-5 "
        />
      </div>

      <h2 className="px-5">Your Goals:</h2>

      <GoalList />
    </div>
  );
  }else{
  return (
    <div>
      <h1 className="d-flex justify-content-center my-5">
        Please sign up or log in to begin tracking your progress
      </h1>
      <p className="d-flex justify-content-center fs-4">
        All it takes is an email address and free account to start improving
        your life
      </p>
    </div>
  );
  }
}

export default Home;
