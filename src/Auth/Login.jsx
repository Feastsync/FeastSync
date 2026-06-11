import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/features/authslice";
import { message } from "antd";
import Input from "../Props/Imp";
import Button from "../Props/Button";
import "./Css/Login.css";
import HeeaderLogo from "../assets/logos/Headerlogo.png";
import LoginPic from "../assets/BackgroundImage/LoginPic.jpeg"
import axios from "axios";

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [accountType, setAccountType] = useState("vendor"); // Default to vendor like Figma
  const [EmailErrorMsg, setEmailErrorMsg] = useState({ err: false, msg: "", name: "" });
  const [PasswordErrorMsg, setPasswordErrorMsg] = useState({ err: false, msg: "", name: "" });

  const validateEmail = (value) => {
    if (value.trim() === "") {
      setEmailErrorMsg({ err: true, name: "email", msg: "Email must not be empty" });
      return false;
    } else if (!EmailRegex.test(value)) {
      setEmailErrorMsg({ err: true, name: "email", msg: "Please enter a valid Email" });
      return false;
    } else {
      setEmailErrorMsg({ err: false, name: "", msg: "" });
      return true;
    }
  };

  const validatePassword = (value) => {
    if (value.trim() === "") {
      setPasswordErrorMsg({ err: true, name: "password", msg: "Password must not be empty" });
      return false;
    } else {
      setPasswordErrorMsg({ err: false, name: "", msg: "" });
      return true;
    }
  };

  const HoldEmail = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
    if (EmailErrorMsg.err) setEmailErrorMsg({ err: false, name: "", msg: "" });
  };

  const HoldPassword = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
    if (PasswordErrorMsg.err) setPasswordErrorMsg({ err: false, name: "", msg: "" });
  };

  const handleValidationAndSubmit = async() => {
    const isEmailValid = validateEmail(userInfo.email);
    const isPasswordValid = validatePassword(userInfo.password);

    if (!isEmailValid || !isPasswordValid) {
      message.error("Please fill in all fields correctly.");
      return;
    }

    try {
      const result = await dispatch(
        login({
          email: userInfo.email,
          password: userInfo.password,
          accountType: accountType,
        })
      ).unwrap();

      message.success("Login successful!");
      
      if (result.accountType === 'vendor' || result.vendor) {
        navigate("/vendordashboard");
      } else {
        navigate("/userdashboard");
      }
    } catch (err) {
      message.error(err || "Invalid email or password");
    }
    const status = error.response

  };


  return (
    <div className="vl-page">
      <div className="vl-left">
        <div className="vl-form-container">
          <div className="vl-logo">
            <img src={HeeaderLogo} alt="FeastSync Logo" className="vl-logo-img" />
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
              className={`vl-input${EmailErrorMsg.err ? " vl-input--error" : ""}`}
            />
            {EmailErrorMsg.err && EmailErrorMsg.name === "email" && (
              <span className="vl-error-text">{EmailErrorMsg.msg}</span>
            )}
          </div>

          <div className="vl-field-group">
            <label className="vl-label">Password</label>
            <div className="vl-password-wrap">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={userInfo.password}
                onChange={HoldPassword}
                onBlur={() => validatePassword(userInfo.password)}
                onFocus={() => setPasswordErrorMsg({ err: false, name: "", msg: "" })}
                className={`vl-input vl-input--password${PasswordErrorMsg.err ? " vl-input--error" : ""}`}
              />
              <button
                type="button"
                className="vl-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
              </button>
            </div>
            {PasswordErrorMsg.err && PasswordErrorMsg.name === "password" && (
              <span className="vl-error-text">{PasswordErrorMsg.msg}</span>
            )}
          </div>

          {/* THIS MATCHES YOUR FIGMA - CHECKBOXES + FORGOT PASSWORD */}
          <div className="vl-role-row">
            <div className="vl-checkbox-group">
              <label className="vl-checkbox-label">
                <input
                  type="radio"
                  name="accountType"
                  value="vendor"
                  checked={accountType === "vendor"}
                  onChange={(e) => setAccountType(e.target.value)}
                />
                <span>Vendor</span>
              </label>
              
              <label className="vl-checkbox-label">
                <input
                  type="radio"
                  name="accountType"
                  value="user"
                  checked={accountType === "user"}
                  onChange={(e) => setAccountType(e.target.value)}
                />
                <span>Client/User</span>
              </label>
            </div>
            
            <Link 
              to={accountType === "vendor" ? "/vendor/forgot-password" : "/forgot-password"} 
              className="vl-forgot"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            btnText={isLoading ? "Logging in..." : "Login"}
            className="vl-login-btn"
            onClick={handleValidationAndSubmit}
            disabled={isLoading}
          />

          <p className="vl-register-text">
            Don't have an account yet?{" "}
            <Link 
              to={accountType === "vendor" ? "/vendor/onboarding" : "/onboarding"} 
              className="vl-register-link"
            >
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