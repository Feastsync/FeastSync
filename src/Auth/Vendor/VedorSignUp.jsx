import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import Swal from "sweetalert2";
// import Input from "../../Props/Ip";
import Input from "../../Props/Imp";
import Button from "../../Props/Button";
import "../Css/VendorSignUp.css";
import FeastLogo from "../../assets/logos/Headerlogo.png";
import GoogleLogo from "../../assets/logos/GoogleLogo.png"
import signup from "../../assets/BackgroundImage/SignUP.jpeg"

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VendorSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [userInfo, setUserInfo] = useState({
    businessName: "", firstName: "", lastName: "",
    phone: "", email: "", password: "", confirmPassword: "",
  });

  const [BusinessNameError, setBusinessNameError] = useState({ err: false, name: "", msg: "" });
  const [FirstNameError, setFirstNameError] = useState({ err: false, name: "", msg: "" });
  const [LastNameError, setLastNameError] = useState({ err: false, name: "", msg: "" });
  const [PhoneError, setPhoneError] = useState({ err: false, name: "", msg: "" });
  const [EmailError, setEmailError] = useState({ err: false, name: "", msg: "" });
  const [PasswordError, setPasswordError] = useState({ err: false, name: "", msg: "" });
  const [ConfirmPasswordError, setConfirmPasswordError] = useState({ err: false, name: "", msg: "" });

  const HoldBusinessName = (e) => {
    const val = e.target.value;
    setUserInfo({ ...userInfo, businessName: val });
    if (val.trim() === "") {
      setBusinessNameError({ err: true, name: "businessName", msg: "Business name must not be empty" });
    } else {
      setBusinessNameError({ err: false, name: "", msg: "" });
    }
  };

  const HoldFirstName = (e) => {
    const val = e.target.value;
    setUserInfo({ ...userInfo, firstName: val });
    if (val.trim() === "") {
      setFirstNameError({ err: true, name: "firstName", msg: "First name must not be empty" });
    } else {
      setFirstNameError({ err: false, name: "", msg: "" });
    }
  };

  const HoldLastName = (e) => {
    const val = e.target.value;
    setUserInfo({ ...userInfo, lastName: val });
    if (val.trim() === "") {
      setLastNameError({ err: true, name: "lastName", msg: "Last name must not be empty" });
    } else {
      setLastNameError({ err: false, name: "", msg: "" });
    }
  };

  const HoldPhone = (e) => {
    const val = e.target.value;
    setUserInfo({ ...userInfo, phone: val });
    if (val.trim() === "") {
      setPhoneError({ err: true, name: "phone", msg: "Phone number must not be empty" });
    } else {
      setPhoneError({ err: false, name: "", msg: "" });
    }
  };

  const HoldEmail = (e) => {
    const val = e.target.value;
    setUserInfo({ ...userInfo, email: val });
    if (val.trim() === "") {
      setEmailError({ err: true, name: "email", msg: "Email must not be empty" });
    } else if (!EmailRegex.test(val)) {
      setEmailError({ err: true, name: "email", msg: "Please enter a valid email" });
    } else {
      setEmailError({ err: false, name: "", msg: "" });
    }
  };

  const HoldPassword = (e) => {
    const val = e.target.value;
    setUserInfo({ ...userInfo, password: val });
    if (val.trim() === "") {
      setPasswordError({ err: true, name: "password", msg: "Password must not be empty" });
    } else {
      setPasswordError({ err: false, name: "", msg: "" });
    }
  };

  const HoldConfirmPassword = (e) => {
    const val = e.target.value;
    setUserInfo({ ...userInfo, confirmPassword: val });
    if (val.trim() === "") {
      setConfirmPasswordError({ err: true, name: "confirmPassword", msg: "Please confirm your password" });
    } else if (val !== userInfo.password) {
      setConfirmPasswordError({ err: true, name: "confirmPassword", msg: "Passwords do not match" });
    } else {
      setConfirmPasswordError({ err: false, name: "", msg: "" });
    }
  };

  const handleSubmit = () => {
    let hasError = false;

    if (userInfo.businessName.trim() === "") {
      setBusinessNameError({ err: true, name: "businessName", msg: "Business name must not be empty" });
      hasError = true;
    }
    if (userInfo.firstName.trim() === "") {
      setFirstNameError({ err: true, name: "firstName", msg: "First name must not be empty" });
      hasError = true;
    }
    if (userInfo.lastName.trim() === "") {
      setLastNameError({ err: true, name: "lastName", msg: "Last name must not be empty" });
      hasError = true;
    }
    if (userInfo.phone.trim() === "") {
      setPhoneError({ err: true, name: "phone", msg: "Phone number must not be empty" });
      hasError = true;
    }
    if (userInfo.email.trim() === "") {
      setEmailError({ err: true, name: "email", msg: "Email must not be empty" });
      hasError = true;
    } else if (!EmailRegex.test(userInfo.email)) {
      setEmailError({ err: true, name: "email", msg: "Please enter a valid email" });
      hasError = true;
    }
    if (userInfo.password.trim() === "") {
      setPasswordError({ err: true, name: "password", msg: "Password must not be empty" });
      hasError = true;
    }
    if (userInfo.confirmPassword.trim() === "") {
      setConfirmPasswordError({ err: true, name: "confirmPassword", msg: "Please confirm your password" });
      hasError = true;
    } else if (userInfo.confirmPassword !== userInfo.password) {
      setConfirmPasswordError({ err: true, name: "confirmPassword", msg: "Passwords do not match" });
      hasError = true;
    }

    if (hasError) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields correctly.",
        icon: "error",
        confirmButtonColor: "#330159",
        confirmButtonText: "Back to Sign Up",
      });
      return;
    }

    // console.log("Submitting:", userInfo);
  };

  return (
    <div className="vr-page">
      <div className="vr-container">
        <div className="vr-left">
            <div className="vr-logo-container">
         <img src={FeastLogo} alt="Logo" className="vr-logo" />
          <span className="vr-logo-text">FeastSync</span>
                </div>
                <Link to="/onboarding" className="vr-back">← Back</Link>         
          <div className="vr-header">
            <h1>Vendors Registration</h1>
            <p>Create an Account and get started with <strong>FEASTSYNC</strong></p>
          </div>

          <form className="vr-form">
            <div className="vr-field">
              <label>Business/Nickname</label>
              <Input placeholder="Your stage name" value={userInfo.businessName} onBlur={() => setBusinessNameError({ err: false, name: "", msg: "" })} onChange={HoldBusinessName} />
              {BusinessNameError.err && BusinessNameError.name === "businessName" && (
                <span className="vr-error">{BusinessNameError.msg}</span>
              )}
            </div>

            <div className="vr-field">
              <label>Enter first name as seen on government ID</label>
              <Input placeholder="Your first name" value={userInfo.firstName} onBlur={() => setFirstNameError({ err: false, name: "", msg: "" })} onChange={HoldFirstName} />
              {FirstNameError.err && FirstNameError.name === "firstName" && (
                <span className="vr-error">{FirstNameError.msg}</span>
              )}
            </div>

            <div className="vr-field">
              <label>Enter Last name as seen on government ID</label>
              <Input placeholder="Your last name" value={userInfo.lastName} onBlur={() => setLastNameError({ err: false, name: "", msg: "" })} onChange={HoldLastName} />
              {LastNameError.err && LastNameError.name === "lastName" && (
                <span className="vr-error">{LastNameError.msg}</span>
              )}
            </div>

            <div className="vr-field">
              <label>Phone Number</label>
              <Input placeholder="Your phone Number" value={userInfo.phone} onBlur={() => setPhoneError({ err: false, name: "", msg: "" })} onChange={HoldPhone} />
              {PhoneError.err && PhoneError.name === "phone" && (
                <span className="vr-error">{PhoneError.msg}</span>
              )}
            </div>

            <div className="vr-field">
              <label>Enter email</label>
              <Input type="email" placeholder="Your email address" value={userInfo.email} onBlur={() => setEmailError({ err: false, name: "", msg: "" })} onChange={HoldEmail} />
              {EmailError.err && EmailError.name === "email" && (
                <span className="vr-error">{EmailError.msg}</span>
              )}
            </div>

            <div className="vr-field">
              <label>Password</label>
              <div className="vr-password-wrap">
                <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={userInfo.password} onBlur={() => setPasswordError({ err: false, name: "", msg: "" })} onChange={HoldPassword} />
                <button type="button" className="vr-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
              </div>
              {PasswordError.err && PasswordError.name === "password" && (
                <span className="vr-error">{PasswordError.msg}</span>
              )}
            </div>

            <div className="vr-field">
              <label>Confirm Password</label>
              <div className="vr-password-wrap">
                <Input type={showConfirm ? "text" : "password"} placeholder="Enter your password" value={userInfo.confirmPassword} onBlur={() => setConfirmPasswordError({ err: false, name: "", msg: "" })} onChange={HoldConfirmPassword} />
                <button type="button" className="vr-eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
              </div>
              {ConfirmPasswordError.err && ConfirmPasswordError.name === "confirmPassword" && (
                <span className="vr-error">{ConfirmPasswordError.msg}</span>
              )}
            </div>

            <Button btnText="Sign up as a vendor" className="vr-submit-btn" onClick={handleSubmit} />
            <p className="vr-or">OR</p>
            {/* <Button  btnText="Continue with Google" className="vr-google-btn" /> */}
            <Button className="vr-google-btn">
      <div className="vr-btn-content">
        <img src={GoogleLogo} alt="Google" className="vr-btn-icon" />
      <span>Continue with Google</span>
       </div>
           </Button>
          </form>
        </div>

        <div className="vr-right">
          <img src={signup} alt="Sign up" />
        </div>
      </div>
    </div>
  );
};

export default VendorSignUp;