import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import Imp from "../Props/Imp";
import Button from "../Props/Button";
import VendorOnboarding from "./Vendor/onBoardingFiles/VendorOnboarding.jsx";
import "./Css/Login.css";
import HeeaderLogo from "../assets/logos/Headerlogo.png";
import signup from "../assets/BackgroundImage/SignUP.jpeg"

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false); // <-- Add thi
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

  const HoldEmail = (e) => {
    const NewEmail = e.target.value;
    setUserInfo({ ...userInfo, email: NewEmail });

    if (NewEmail.trim() === "") {
      setEmailErrorMsg({
        err: true,
        name: "email",
        msg: "Email must not be empty",
      });
    } else if (!EmailRegex.test(NewEmail)) {
      setEmailErrorMsg({
        err: true,
        name: "email",
        msg: "Please enter a valid Email",
      });
    } else {
      setEmailErrorMsg({ err: false, name: "", msg: "" });
    }
  };

  const HoldPassword = (e) => {
    const NewPass = e.target.value;
    setUserInfo({ ...userInfo, password: NewPass });

    if (NewPass.trim() === "") {
      setPasswordErrorMsg({
        err: true,
        name: "password",
        msg: "Password must not be empty",
      });
    } else {
      setPasswordErrorMsg({ err: false, name: "", msg: "" });
    }
  };

  const handleValidationAndSubmit = () => {
    let hasError = false;

    if (userInfo.email.trim() === "") {
      setEmailErrorMsg({
        err: true,
        name: "email",
        msg: "Email must not be empty",
      });
      hasError = true;
    } else if (!EmailRegex.test(userInfo.email)) {
      setEmailErrorMsg({
        err: true,
        name: "email",
        msg: "Please enter a valid Email",
      });
      hasError = true;
    }

    if (userInfo.password.trim() === "") {
      setPasswordErrorMsg({
        err: true,
        name: "password",
        msg: "Password must not be empty",
      });
      hasError = true;
    }

    if (hasError) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields correctly.",
        icon: "error",
        confirmButtonColor: "#330159",
        confirmButtonText: "Back to Login",
      });
      return;
    }

    // No API yet - just show onboarding for vendors
    if (role === "vendor") {
      setShowOnboarding(true); // <-- Show modal instead of navigate
    } else {
      navigate("/userdashboard");
    }
  };

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    navigate("/vendordashboard"); // Go to dashboard after completing/skipping
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
                className={`vl-input vl-input--password${PasswordErrorMsg.err ? " vl-input--error" : ""}`}
              />
              <button
                type="button"
                className="vl-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
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
            btnText={isLoading ? "Logging in..." : "Login"}
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

      <img className="vl-right" src="" alt="" />

      <VendorOnboarding
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
      />
    </div>
  );
};

export default Login;