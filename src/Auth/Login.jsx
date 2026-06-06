import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import Input from "../Props/Imp";
import Button from "../Props/Button";
import "./Css/Login.css";
import HeeaderLogo from "../assets/logos/Headerlogo.png";
import LoginPic from "../assets/BackgroundImage/LoginPic.jpeg"

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [EmailErrorMsg, setEmailErrorMsg] = useState({
    err: false,
    msg: "",
    name: "",
  });
  const [PasswordErrorMsg, setPasswordErrorMsg] = useState({
    err: false,
    msg: "",
    name: "",
  });

  const validateEmail = (value) => {
    if (value.trim() === "") {
      setEmailErrorMsg({
        err: true,
        name: "email",
        msg: "Email must not be empty",
      });
      return false;
    } else if (!EmailRegex.test(value)) {
      setEmailErrorMsg({
        err: true,
        name: "email",
        msg: "Please enter a valid Email",
      });
      return false;
    } else {
      setEmailErrorMsg({ err: false, name: "", msg: "" });
      return true;
    }
  };

  const validatePassword = (value) => {
    if (value.trim() === "") {
      setPasswordErrorMsg({
        err: true,
        name: "password",
        msg: "Password must not be empty",
      });
      return false;
    } else {
      setPasswordErrorMsg({ err: false, name: "", msg: "" });
      return true;
    }
  };

  const HoldEmail = (e) => {
    const NewEmail = e.target.value;
    setUserInfo({...userInfo, email: NewEmail });
    if (EmailErrorMsg.err) {
      setEmailErrorMsg({ err: false, name: "", msg: "" });
    }
  };

  const HoldPassword = (e) => {
    const NewPass = e.target.value;
    setUserInfo({...userInfo, password: NewPass });
    if (PasswordErrorMsg.err) {
      setPasswordErrorMsg({ err: false, name: "", msg: "" });
    }
  };

  const handleValidationAndSubmit = () => {
    const isEmailValid = validateEmail(userInfo.email);
    const isPasswordValid = validatePassword(userInfo.password);

    if (!isEmailValid ||!isPasswordValid) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields correctly.",
        icon: "error",
        confirmButtonColor: "#330159",
        confirmButtonText: "Back to Login",
      });
      return;
    }

    if (role === "vendor") {
      navigate("/vendordashboard", {
        state: {
          showOnboarding: true,
          vendorName: "Adeyemi"
        }
      });
    } else {
      navigate("/userdashboard");
    }
  };

  return (
    <div className="vl-page">
      <div className="vl-left">
        <div className="vl-form-container">
          <div className="vl-logo">
            <img
              src={HeeaderLogo}
              alt="FeastSync Logo"
              className="vl-logo-img"
            />
            <div className="vl-logo-text">FeastSync</div>
          </div>

          <h1 className="vl-title">LOG IN</h1>
          <p className="vl-subtitle">
            Welcome back, please sign in to your account.
          </p>

          <div className="vl-field-group">
            <label className="vl-label">Enter email</label>
            <Input
              type="email"
              placeholder="Your email address"
              value={userInfo.email}
              onChange={HoldEmail}
              onBlur={() => validateEmail(userInfo.email)}
              onFocus={() => setEmailErrorMsg({ err: false, name: "", msg: "" })}
              className={`vl-input${EmailErrorMsg.err? " vl-input--error" : ""}`}
            />
            {EmailErrorMsg.err && EmailErrorMsg.name === "email" && (
              <span className="vl-error-text">{EmailErrorMsg.msg}</span>
            )}
          </div>

          <div className="vl-field-group">
            <label className="vl-label">Password</label>
            <div className="vl-password-wrap">
              <Input
                type={showPassword? "text" : "password"}
                placeholder="Enter your password"
                value={userInfo.password}
                onChange={HoldPassword}
                onBlur={() => validatePassword(userInfo.password)}
                onFocus={() => setPasswordErrorMsg({ err: false, name: "", msg: "" })}
                className={`vl-input vl-input--password${PasswordErrorMsg.err? " vl-input--error" : ""}`}
              />
              <button
                type="button"
                className="vl-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword? (
                  <FaRegEyeSlash size={18} />
                ) : (
                  <FaRegEye size={18} />
                )}
              </button>
            </div>
            {PasswordErrorMsg.err && PasswordErrorMsg.name === "password" && (
              <span className="vl-error-text">{PasswordErrorMsg.msg}</span>
            )}
          </div>

          <div className="vl-role-row">
            <div className="vl-roles">
              <label className="vl-role-option">
                <input
                  type="checkbox"
                  checked={role === "vendor"}
                  onChange={() => setRole("vendor")}
                  className="vl-checkbox"
                />
                <span className="vl-role-label">Vendor</span>
              </label>
              <label className="vl-role-option">
                <input
                  type="checkbox"
                  checked={role === "client"}
                  onChange={() => setRole("client")}
                  className="vl-checkbox"
                />
                <span className="vl-role-label">Client/User</span>
              </label>
            </div>
            <Link to="/forgot-password" className="vl-forgot">
              Forgot password?
            </Link>
          </div>

          <Button
            btnText="Login"
            className="vl-login-btn"
            onClick={handleValidationAndSubmit}
          />

          <p className="vl-register-text">
            Don't have an account yet?{" "}
            <Link to="/onboarding" className="vl-register-link">
              REGISTER HERE
            </Link>
          </p>
        </div>
      </div>

      <img className="vl-right" src={LoginPic} alt="" />
    </div>
  );
};

export default Login;