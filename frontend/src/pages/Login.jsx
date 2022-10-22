import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//3rd party libraies
import { toast } from "react-toastify";

//context
import AuthContext from "../context/auth/AuthContext";

//svg
import { FaUser } from "react-icons/fa";

function Login() {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formdata;

  const { user, loggedIn, isSuccess, dispatch, login } = useContext(
    AuthContext
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess === true) {
      dispatch({ type: "RESET" });
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
    if (email.includes("@") === -1 && email.includes(".com") === -1) {
      toast.error("Please enter a valid email address");
    }
    const userData = {
      email,
      password,
    };
    login(userData);
  };

  return (
    <>
      <div className="mt-4">
        <h1 className="d-flex justify-content-center h-100">
          <FaUser className="mx-2 " />
          <br />
          Login
        </h1>
      </div>

      <p className="text-center fs-3 mb-5">Please Login</p>

      <section className="form inputBox d-flex justify-content-center">
        <form onSubmit={onSubmit}>
          <div className="form-group my-2">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group my-2">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
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

export default Login;
