import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//contexts
import GoalContext from "../context/goal/GoalContext";
import AuthContext from "../context/auth/AuthContext";
import { toast } from "react-toastify";

function NewGoal() {
  const navigate = useNavigate();

  const { dispatch, posted, createGoal } = useContext(GoalContext);

  const { user } = useContext(AuthContext);

  const [formdata, setFormData] = useState({
    goalName: "",
    goalDescription: "",
  });

  const { goalName, goalDescription } = formdata;

  useEffect(() => {
    if (posted) {
      dispatch({ type: "POST_RESET" });
      navigate("/");
    }
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (goalName === "") {
      toast.error("A goal must have a name");
    } else if (goalDescription === "") {
      toast.error("A goal must have a description");
    } else {
      const goalData = {
        goalName,
        goalDescription,
      };
      console.log(goalData);
      createGoal(goalData);
      dispatch({ type: "POSTED" });
    }
  };

  return (
    <>
      <div className="mt-4">
        <h1 className="d-flex justify-content-center h-100">
          <br />
          New Goal
        </h1>
      </div>

      <section className="form inputBox d-flex justify-content-center">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="goalname">Goal Name:</label>
            <input
              type="text"
              className="form-control"
              id="goalName"
              name="goalName"
              value={goalName}
              onChange={onChange}
              placeholder="Please enter goal name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="goalDescription">Description:</label>
            <input
              type="text"
              className="form-control"
              id="goalDescription"
              name="goalDescription"
              value={goalDescription}
              onChange={onChange}
              placeholder="Please enter goal name"
              required
            />
          </div>

          <div className="form-group btn btn-outline-primary my-2">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewGoal;
