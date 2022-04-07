import "./AccountBox.css";
import LoginTitle from "./LoginTitle";
import SignUpTitle from "./SignUpTitle";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
function AccountBox({ accountForm, handleLogin }) {
  return (
    <div>
      <div className="box_container">
        <div className="top_container">
          <div className="back_drop" />
          {accountForm === "signup" ? <SignUpTitle /> : <LoginTitle />}
        </div>
        <div className="bottom_container">
          {accountForm === "signup" ? (
            <SignUpForm />
          ) : (
            <LoginForm handleLogin={handleLogin} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountBox;
