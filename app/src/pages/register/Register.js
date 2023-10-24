import React, { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../store/actions/authActions";
import { GuardLayout } from "../../layouts/GuardLayout";

const Register = (props) => {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      await dispatch(register(user));
      navigate("/");
    }
  };
  return (
    <GuardLayout {...props}>
      <div className="register">
        <div className="register-wrapper">
          <div className="register-left">
            <h3 className="register-logo">Connectio</h3>
            <span className="register-desc">
              Connect with friends and the world around you on Connectio.
            </span>
          </div>
          <div className="register-right">
            <form onSubmit={handleSubmit} className="register-box">
              <input
                placeholder="Username"
                type="text"
                className="register-input"
                ref={username}
                required
              />
              <input
                placeholder="Email"
                type="email"
                className="register-input"
                ref={email}
                required
              />
              <input
                placeholder="Password"
                type="password"
                className="register-input"
                required
                ref={password}
                minLength={6}
              />
              <input
                placeholder="Password Again"
                type="password"
                className="register-input"
                ref={passwordAgain}
                required
              />
              <button type="submit" className="register-btn">
                Sign Up
              </button>
              <button
                type="button"
                onClick={(e) => {
                  navigate("/login");
                  e.preventDefault();
                }}
                className="register-login-btn"
              >
                Log into Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </GuardLayout>
  );
};

Register.defaultProps = {
  guestGuard: true,
};
export default Register;
