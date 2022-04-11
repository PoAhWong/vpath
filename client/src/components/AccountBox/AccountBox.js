import "./AccountBox.css";
import LoginTitle from "./LoginTitle";
import SignUpTitle from "./SignUpTitle";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(30deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(30deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

function AccountBox({ accountForm, handleLogin }) {
  const [isExpanded, setExpanded] = useState(false);
  const [form, setForm] = useState(accountForm);
  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
      setForm(form === "signup" ? "login" : "signup");
    }, expandingTransition.duration * 1000 - 1500);
  };

  return (
    <div>
      <div className="box_container">
        <div className="top_container">
          <motion.div
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
            className="back_drop"
          />
          {form === "signup" ? <SignUpTitle /> : <LoginTitle />}
        </div>
        <div className="bottom_container">
          {form === "signup" ? (
            <SignUpForm playExpandingAnimation={playExpandingAnimation} />
          ) : (
            <LoginForm handleLogin={handleLogin} />
          )}
          <h6>
            {form === "signup"
              ? "Already have an account?"
              : "Don't have an account yet?"}
            <a className="switch" href="#" onClick={playExpandingAnimation}>
              {form === "signup" ? "Login" : "Sign Up"}
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default AccountBox;
