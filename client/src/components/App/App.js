import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import AccountBox from "../AccountBox/AccountBox";
import Main from "../Main/Main";
import Footer from "./Footer";

function App() {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    const response = await axios.post("/api/sessions", data);
    setUserId(response.data.userId);
    setUsername(
      response.data.userName.slice(0, 1).toUpperCase() +
        response.data.userName.slice(1)
    );
    navigate("/main");
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUserId("");
    setUsername("");
  };

  return (
    <div className="App">
      <header>
        <nav className="nav_bar">
          <Link
            to={!!userName ? "/main" : "/home"}
            style={{ textDecoration: "none" }}
          >
            <h1>{!!userName ? userName : "VPath"}</h1>
          </Link>
          <div className="user">
            <Link
              className="signup"
              to="/sign_up"
              style={{ textDecoration: "none" }}
            >
              {!!userName ? (
                <h1 onClick={handleLogout}>Logout</h1>
              ) : (
                <h1>Sign Up</h1>
              )}
            </Link>
          </div>
        </nav>
      </header>
      <Footer />
      <Routes>
        <Route path="/" element={<Home name={userName} id={userId} />} />
        <Route
          path="/home"
          element={<Home userName={userName} userId={userId} />}
        />
        <Route
          path="/main"
          element={<Main userName={userName} userId={userId} />}
        />
        <Route
          path="/sign_up"
          element={
            <AccountBox accountForm="signup" handleLogin={handleLogin} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
