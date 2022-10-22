import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

//Pages
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewGoal from "./pages/NewGoal";

//context
import { AuthProvider } from "./context/auth/AuthContext";
import { GoalProvider } from "./context/goal/GoalContext";

function App() {
  return (
    <>
      <AuthProvider>
        <GoalProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/new-goal" element={<PrivateRoute />}>
                <Route path="/new-goal" element={<NewGoal />} />
              </Route>
            </Routes>
          </Router>
          <ToastContainer />
        </GoalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
