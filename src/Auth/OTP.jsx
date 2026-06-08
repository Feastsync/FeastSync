import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "antd";
import "./Css/OTP.css";
import FeastLogo from "../assets/logos/Headerlogo.png";
import Button from "../Props/Button.jsx";
import Otpimg from "../assets/BackgroundImage/OtpImage.png"
import { IoArrowBack } from "react-icons/io5";

const OTPVerification = () => {
  const navigate = useNavigate();
  const inputs = useRef([]);
  const Navigate = useNavigate();
  const handleInput = (e, index) => {
    const val = e.target.value;
    if (val.length === 1 && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputs.current[index - 1].focus();
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
         <Link to="/login" className="otp-back-wrap">
           <span className="otp-back-icon-box" onClick={() => navigate("/forgot-password")} >
            <IoArrowBack size={18} />
          </span>
          <span className="otp-back-text">Back</span>
       </Link>
          
          <div className="otp-header">
            <h1>OTP verification</h1>
            <p>Enter your email address to receive a recovery link</p>
          </div>

          <p className="otp-label">Input OTP</p>
          <div className="otp-boxes">
            {[0, 1, 2, 3].map((index) => (
              <Input
                key={index}
                className="otp-box"
                maxLength={1}
                ref={(el) => (inputs.current[index] = el)}
                onChange={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <Button onClick={() => Navigate("/login")} className="otp-verify-btn">
            Verify OTP
          </Button>
          <p className="otp-resend">Didn't receive the code? <span>Resend</span></p>
        </div>

        <div className="otp-right">
          <img src={Otpimg}/>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;