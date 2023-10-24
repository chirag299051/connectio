import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { login } from "../store/actions/authActions";

export const LoginView = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const successCallback = () => {
        const queryParams = new URLSearchParams(location.search);
        const returnUrl = queryParams.get("returnUrl");

        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        navigate(redirectURL);
      };
      setLoading(true);
      await dispatch(
        login(
          { email: email.current.value, password: password.current.value },
          successCallback
        )
      );
      // if (!user) setLoading(true);
      // else setLoading(false);
      // user && localStorage.setItem("user", JSON.stringify(user));
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">Connectio</h3>
          <span className="login-desc">
            Connect with friends and the world around you on Connectio.
          </span>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              className="login-input"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="login-input"
              ref={password}
              minLength={6}
              required
            />
            <button type="submit" className="login-btn">
              {loading ? (
                <CircularProgress size={25} color="inherit" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="login-forgot">Forgot Password</span>
            <button
              onClick={() => navigate("/register")}
              className="login-register-btn"
            >
              {loading ? (
                <CircularProgress size={25} color="inherit" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
