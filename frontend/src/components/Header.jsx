// Bootstrap loses alot of functionality when used with react

//React Packages
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

//Bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
//Context
import AuthContext from "../context/auth/AuthContext";
import { useEffect } from "react";

function Header() {
  const { logout, dispatch, user, name } = useContext(AuthContext);

  const navigate = useNavigate();

  //creating the functions that is called everytime the logout button is pressed
  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    logout();
    navigate("/");
  };
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        className="justify-content-start flex-start px-3"
      >
        <div className="d-flex  justify-content-start w-50 ">
          <Navbar.Brand className="mx-5">
            <Link className="text-reset text-decoration-none ml-2" to="/">
              Goals
            </Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Link>
              <Link className="text-reset text-decoration-none" to="/register">
                Register
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="text-reset text-decoration-none" to="/login">
                Login
              </Link>
            </Nav.Link>
            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
          </Nav>
        </div>
        <div className="w-50 d-flex align-items-center justify-content-end ">
          <p className="text-white small mx-4 mb-0 align-self-center">
            {user ? `${name} is logged in` : "No one is logged in"}
          </p>
        </div>
      </Navbar>
    </>
  );
}

export default Header;
