import React, { useState } from "react";
import view from "../Images/view.png";
import hide from "../Images/visibility.png";
import "./SignUpForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password2: "",
      textType: "password",
      img: "hide",
      playExpandingAnimation: props.playExpandingAnimation,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    delete data.password2;
    axios
      .post("/api/users", data)
      .then((res) => res.data)
      .then((userName) => console.log(userName));
    this.state.playExpandingAnimation();
  };

  handleChange = (event) => {
    if (event.target.name == "password") {
      this.setState({
        password: event.target.value,
      });
    } else {
      this.setState({
        password2: event.target.value,
      });
    }
  };

  switchView = () => {
    if (this.state.textType == "password") {
      this.setState({
        textType: "text",
      });
    } else {
      this.setState({
        textType: "password",
      });
    }
  };

  checkPassword = (password, password2) => {
    const hasCapital = /[A-Z]/g.test(password);
    const hasLetter = /[a-z]/g.test(password);
    const hasNumber = /[0-9]/g.test(password);
    const hasLength = password.length > 9;
    const hasSpecial =
      /\W/g.test(password) && /\D/g.test(password) && /\S/g.test(password)
        ? "green"
        : "red";
    const isSame = password == password2;
    if (
      hasCapital &&
      hasLength &&
      hasLetter &&
      hasNumber &&
      hasSpecial &&
      isSame
    ) {
      return false;
    } else {
      return true;
    }
  };

  displayMessage = (password, password2) => {
    if (!!password) {
      const capitalColor = /[A-Z]/g.test(password) ? "green" : "red";
      const letterColor = /[a-z]/g.test(password) ? "green" : "red";
      const numberColor = /[0-9]/g.test(password) ? "green" : "red";
      const lengthColor = password.length > 9 ? "green" : "red";
      const specialCharColor =
        /\W/g.test(password) && /\D/g.test(password) && /\S/g.test(password)
          ? "green"
          : "red";
      const compareColor = password == password2 ? "green" : "red";
      return (
        <div className="message">
          <p>Password needs contain: </p>
          <p className="capital" style={{ color: capitalColor }}>
            At least one capital letter
          </p>

          <p className="letter" style={{ color: letterColor }}>
            At least one lower letter
          </p>
          <p className="number" style={{ color: numberColor }}>
            At least one number
          </p>
          <p className="special" style={{ color: specialCharColor }}>
            At least one special character
          </p>
          <p className="length" style={{ color: lengthColor }}>
            At least 10 characters
          </p>
          <p className="compare" style={{ color: compareColor }}>
            Match with each other
          </p>
        </div>
      );
    }
  };

  render = () => {
    const { textType } = this.state;
    return (
      <div className="form_container">
        <form action="" onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <input
            type={this.state.textType}
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <img
            src={textType == "password" ? hide : view}
            alt=""
            onClick={this.switchView}
          />
          <input
            type={this.state.textType}
            name="password2"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          <button
            className="submit"
            disabled={this.checkPassword(
              this.state.password,
              this.state.password2
            )}
          >
            Sign Up
          </button>
        </form>

        {this.displayMessage(this.state.password, this.state.password2)}
      </div>
    );
  };
}

export default SignUpForm;
