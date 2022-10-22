import React, { useContext } from "react";
//contexts
import AuthContext from "../context/auth/AuthContext";
//components
import Button from "../components/Button";
import GoalList from "../components/GoalList";
import { useEffect } from "react";

function Home() {
  const { logout, dispatch, user, name } = useContext(AuthContext);

  if (!user)
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
  else
    return (
      <div>
        <h1 className="d-flex justify-content-center my-5">Welcome {name}!</h1>
        <div className="d-grid col-6 gap-2">
          <Button
            text="Create Goal"
            to="/new-goal"
            bsc="btn btn-dark mx-5 my-5 "
          />
        </div>

        <h2 className="px-5">Your Goals:</h2>

        <GoalList />
      </div>
    );
}

export default Home;
