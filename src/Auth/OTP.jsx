import { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOTP,
  verifyResetOTP,
  clearError,
  resendOTP,
  forgotPassword,
} from "../Redux/features/authslice";
import { Input, App } from "antd";
import "./Css/OTP.css";
import FeastLogo from "../assets/logos/Headerlogo.png";
import Button from "../Props/Button.jsx";
import Otpimg from "../assets/BackgroundImage/OtpImage.png";
import { IoArrowBack } from "react-icons/io5";

const OTPVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { message } = App.useApp();

  const { isLoading, error } = useSelector((state) => state.auth);

  const inputs = useRef([]);
  const redirectedRef = useRef(false);
  const mountedRef = useRef(false);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [resendingReset, setResendingReset] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);

  const email = location.state?.email;
  const accountType = location.state?.accountType || "user";
  const isForgotPassword = location.state?.isForgotPassword || false;

  useEffect(() => {
    if (!email && !redirectedRef.current) {
      redirectedRef.current = true;
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    if (error) {
      const errorText = typeof error === "string" ? error : error?.message || "An error occurred";
      message.error(errorText);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleInput = (e, index) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val.length === 1 && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      message.error("Please enter complete 4-digit OTP");
      return;
    }

    try {
      if (isForgotPassword) {
        await dispatch(
          verifyResetOTP({ email, otp: otpCode, accountType })
        ).unwrap();

        navigate("/reset-password", {
          state: { email, otp: otpCode, accountType },
        });
      } else {
        await dispatch(
          verifyOTP({ email, otp: otpCode, accountType })
        ).unwrap();

        message.success("Account verified successfully!");
        navigate("/login");
      }
    } catch (err) {
      message.error(err || "Verification failed");
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      if (isForgotPassword) {
        setResendingReset(true);
        await dispatch(forgotPassword({ email, accountType })).unwrap();
        setResendingReset(false);
      } else {
        setResendingOtp(true);
        await dispatch(resendOTP({ email, accountType })).unwrap();
        setResendingOtp(false);
      }

      message.success("New OTP sent to your email");
      setCountdown(60);
      setOtp(["", "", "", ""]);
      inputs.current[0]?.focus();
    } catch (err) {
      setResendingReset(false);
      message.error(err || "Resend failed");
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-container">
        <div className="otp-left">
          <div className="otp-logo-wrap">
            <img src={FeastLogo} alt="Logo" className="otp-logo" />
            <span className="otp-logo-text">FeastSync</span>
          </div>

          <Link
            to={
              isForgotPassword
                ? "/forgot-password"
                : accountType === "vendor"
                ? "/vendor/signup"
                : "/user/signup"
            }
            className="otp-back-wrap"
          >
            <span className="otp-back-icon-box">
              <IoArrowBack size={18} />
            </span>
            <span className="otp-back-text">Back</span>
          </Link>

          <div className="otp-header">
            <h1>{isForgotPassword ? "Reset Password" : "OTP verification"}</h1>
            <p>Enter OTP code sent to {email}</p>
          </div>

          <p className="otp-label">Input OTP</p>

          <div className="otp-boxes">
            {[0, 1, 2, 3].map((index) => (
              <Input
                key={index}
                className="otp-box"
                maxLength={1}
                value={otp[index]}
                ref={(el) => (inputs.current[index] = el)}
                onChange={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <Button
            onClick={handleVerify}
            className="otp-verify-btn"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : isForgotPassword ? "Continue" : "Verify OTP"}
          </Button>

          <p className="otp-resend">
            Didn't receive the code?{" "}
            {countdown > 0 ? (
              <span style={{ color: "#888" }}>Resend in {countdown}s</span>
            ) : (
              <span
                onClick={handleResend}
                style={{ color: "#330159", cursor: "pointer", fontWeight: 600 }}
              >
                {resendingReset || resendingOtp ? "Sending..." : "Resend"}
              </span>
            )}
          </p>
        </div>

        <div className="otp-right">
          <img src={Otpimg} alt="OTP" />
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
