import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../Redux/features/authslice";
import { message } from "antd";
import Button from "../Props/Button";
import { FaArrowLeft } from "react-icons/fa6";
import "../Auth/Css/ForgotPassword.css";

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const params = new URLSearchParams(location.search);
  const { isLoading, accountType } = useSelector((state) => state.auth);

  const currentRole = params.get("role") || accountType || "user";

  const [email, setEmail] = useState("");

  const handleSendOTP = async () => {
    if (email.trim() === "") {
      message.error("Please enter your email address");
      return;
    }

    if (!EmailRegex.test(email)) {
      message.error("Please enter a valid email address");
      return;
    }

    try {
      await dispatch(
        forgotPassword({ email, accountType: currentRole })
      ).unwrap();

      message.success("Recovery OTP sent to your email");

      navigate("/verify-otp", {
        state: {
          email,
          accountType: currentRole,
          isForgotPassword: true,
        },
      });
    } catch (err) {
      message.error(typeof err === "string" ? err : "Failed to send OTP");
    }
  };

  return (
    <div>
      <div className="forgotPasswordLogo">
        <div className="forgetPasswordLogo"></div>
      </div>

      <div className="forgotPaswwordContainer">
        <div className="forgotPasswordHolder">
          <div className="forgotPasswordButton">
            <Button onClick={() => navigate("/login")}>
              <p>
                <FaArrowLeft />
              </p>
            </Button>
            <p>Back</p>
          </div>

          <div className="forgotPasswordAssurance">
            <p className="forgotPasswordText">Forgot Password?</p>
            <p className="forgotPasswordLink">
              No worries. Enter your email address and we'll send you an OTP
              to reset your password.
            </p>
          </div>

          <div className="passwordEmail">
            <section className="passwordEmailWrapper">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>

            <Button onClick={handleSendOTP} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send recovery OTP"}
            </Button>

            <p>
              Remember your password?{" "}
              <span
                style={{
                  color: "#330159",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>

        <div className="forgotPasswordImage">
          <img src="../public/About/Icon.png" alt="Forgot Password Icon" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;