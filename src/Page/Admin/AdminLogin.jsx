import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../Redux/features/authslice.js";
import { message } from "antd";
import Imp from "../../Props/Imp.jsx";
import Button from "../../Props/Button.jsx";
import "./css/AdminLogin.css";
import LoginPic from "/About/Frame 98.png";

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminLoading, isAdminLoggedIn, adminError } = useSelector(
    (state) => state.auth,
  );

  const [showPassword, setShowPassword] = useState(false);
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
    setUserInfo({ ...userInfo, email: e.target.value });
    if (EmailErrorMsg.err) setEmailErrorMsg({ err: false, name: "", msg: "" });
  };

  const HoldPassword = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
    if (PasswordErrorMsg.err)
      setPasswordErrorMsg({ err: false, name: "", msg: "" });
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [isAdminLoggedIn, navigate]);

  const handleValidationAndSubmit = async () => {
    const isEmailValid = validateEmail(userInfo.email);
    const isPasswordValid = validatePassword(userInfo.password);

    if (!isEmailValid || !isPasswordValid) {
      message.error("Please fill in all fields correctly.");
      return;
    }

    try {
      await dispatch(
        adminLogin({
          email: userInfo.email,
          password: userInfo.password,
        }),
      ).unwrap();
      message.success("Admin login successful!");
      navigate("/admin/dashboard");
    } catch (err) {
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.message || "Invalid admin credentials";
      message.error(errorMessage);
    }
  };

  return (
    <div className="vl-page">
        <div className="adminLoginImage">
            <img className="vl-right" src={LoginPic} alt="" />
        </div>
      <div className="vl-left">
        <div className="vl-form-container">
          <div className="vl-field-group">
            <label className="vl-label">Enter email</label>
            <Imp
              type="email"
              placeholder="Your email address"
              value={userInfo.email}
              onChange={HoldEmail}
              onBlur={() => validateEmail(userInfo.email)}
              onFocus={() =>
                setEmailErrorMsg({ err: false, name: "", msg: "" })
              }
              className={`vl-input${EmailErrorMsg.err ? " vl-input--error" : ""}`}
            />
            {EmailErrorMsg.err && EmailErrorMsg.name === "email" && (
              <span className="vl-error-text">{EmailErrorMsg.msg}</span>
            )}
          </div>

          <div className="vl-field-group">
            <label className="vl-label">Password</label>
            <div className="vl-password-wrap">
              <Imp
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={userInfo.password}
                onChange={HoldPassword}
                onBlur={() => validatePassword(userInfo.password)}
                onFocus={() =>
                  setPasswordErrorMsg({ err: false, name: "", msg: "" })
                }
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
            <div className="vl-checkbox-group"> 
            </div>

            <Link to="/admin/forgot" className="vl-forgot">
              Forgot password?
            </Link>
          </div>

          <Button
            btnText={adminLoading ? "Logging in..." : "Login"}
            className="vl-login-btn"
            onClick={handleValidationAndSubmit}
            disabled={adminLoading}
          />

          {adminError && (
            <p className="vl-error-text" style={{ marginTop: 12 }}>
              {typeof adminError === "string" ? adminError : "Admin login failed."}
            </p>
          )}

          <p className="vl-register-text">
            Forgot your admin password? <Link to="/admin/forgot" className="vl-register-link">
              Reset here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
