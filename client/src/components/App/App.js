import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import AccountBox from "../AccountBox/AccountBox";
import Main from "../Main/Main";

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

  return (
    <div className="App">
      <header>
        <nav className="nav_bar">
          <Link to={!!userName ? "/main" : "/home"}>
            {!!userName ? userName : "VPath"}
          </Link>
          <div className="user">
            <Link className="signup" to="/sign_up">
              SignUp
            </Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home name={userName} id={userId} />} />
        <Route path="/home" element={<Home name={userName} id={userId} />} />
        <Route path="/main" element={<Main name={userName} id={userId} />} />
        <Route path="/sign_up" element={<AccountBox accountForm="signup" />} />
        <Route
          path="/Login"
          element={<AccountBox accountForm="login" handleLogin={handleLogin} />}
        />
      </Routes>
    </div>
  );
}

export default App;
