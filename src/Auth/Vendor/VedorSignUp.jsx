import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { signupVendor } from "../../Redux/features/vendorslice";
import { vendorSignupSchema } from "../../Validations/vendorSchema";
import Button from "../../Props/Button";
import "../Css/VendorSignUp.css";
import FeastLogo from "../../assets/logos/Headerlogo.png";
import GoogleLogo from "../../assets/logos/GoogleLogo.png";
import signup from "../../assets/BackgroundImage/SignUP.jpeg";
import Input from "../../Props/Input";

const VendorSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.vendor);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});

  const [userInfo, setUserInfo] = useState({
    stageName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

const handleChange = (e) => {
  const { name, value } = e.target;
  let updatedValue = value;

  if (name === "phoneNumber") {
    updatedValue = value.replace(/\D/g, "").slice(0, 11);
  }

  const updatedUserInfo = {
   ...userInfo,
    [name]: updatedValue,
  };

  setUserInfo(updatedUserInfo);

  // Validate this single field immediately
  const fieldSchema = vendorSignupSchema.shape[name];
  if (fieldSchema) {
    const result = fieldSchema.safeParse(updatedValue);
    if (!result.success) {
      setErrors((prev) => ({
       ...prev,
        [name]: result.error.issues[0].message,
      }));
    } else {
      // Clear error if field is now valid
      setErrors((prev) => {
        const newErrors = {...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  // Special case: if password changes, re-check confirmPassword
  if (name === "password" && userInfo.confirmPassword) {
    if (updatedValue!== userInfo.confirmPassword) {
      setErrors((prev) => ({
       ...prev,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = {...prev };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  }

  // Special case: if confirmPassword changes, check against password
  if (name === "confirmPassword") {
    if (updatedValue!== updatedUserInfo.password) {
      setErrors((prev) => ({
       ...prev,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = {...prev };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  }
};

const handleBlur = (e) => {
  const { name, value } = e.target;

  // On blur, validate even if empty so user sees error before moving on
  const fieldSchema = vendorSignupSchema.shape[name];
  if (fieldSchema) {
    const result = fieldSchema.safeParse(value);
    if (!result.success) {
      setErrors((prev) => ({
       ...prev,
        [name]: result.error.issues[0].message,
      }));
    }
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = vendorSignupSchema.safeParse(userInfo);

    if (!validation.success) {
      const fieldErrors = {};

      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });

      setErrors(fieldErrors);

      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix the highlighted fields",
        confirmButtonColor: "#330159",
      });

      return;
    }

    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...dataToSend } = userInfo;

      const result = await dispatch(signupVendor(dataToSend));

      if (signupVendor.fulfilled.match(result)) {
        await Swal.fire({
          icon: "success",
          title: "Account Created",
          text: "OTP has been sent to your email",
          confirmButtonColor: "#330159",
        });

        navigate("/verify-otp", {
          state: {
            email: userInfo.email,
            accountType: "vendor",
          },
        });
      }

      if (signupVendor.rejected.match(result)) {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: result.payload || "Something went wrong",
          confirmButtonColor: "#330159",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred",
        confirmButtonColor: "#330159",
      });
    }
  };

  return (
    <div className="vr-page">
      <div className="vr-container">
        <div className="vr-left">
          <div className="vr-logo-container">
            <img src={FeastLogo} alt="Logo" className="vr-logo" />
            <span className="vr-logo-text">FeastSync</span>
          </div>
          <Link to="/onboarding" className="vr-back">
            ← Back
          </Link>
          <div className="vr-header">
            <h1>Vendors Registration</h1>
            <p>
              Create an Account and get started with <strong>FEASTSYNC</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="vr-form">
            <div className="vr-field">
              <label>Business/Nickname</label>
              <Input
                name="stageName"
                placeholder="Your stage name"
                value={userInfo.stageName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.stageName && (
                <span className="vr-error">{errors.stageName}</span>
              )}
            </div>

            <div className="vr-field">
              <label>Enter first name as seen on government ID</label>
              <Input
                name="firstName"
                placeholder="Your first name"
                value={userInfo.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="vr-error">{errors.firstName}</span>
              )}
            </div>

            <div className="vr-field">
              <label>Enter Last name as seen on government ID</label>
              <Input
                name="lastName"
                placeholder="Your last name"
                value={userInfo.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && (
                <span className="vr-error">{errors.lastName}</span>
              )}
            </div>

            <div className="vr-field">
              <label>Phone Number</label>
              <Input
                name="phoneNumber"
                placeholder="Your phone Number"
                value={userInfo.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={11}
                inputMode="numeric"
              />
              {errors.phoneNumber && (
                <span className="vr-error">{errors.phoneNumber}</span>
              )}
            </div>

            <div className="vr-field">
              <label>Enter email</label>
              <Input
                type="email"
                name="email"
                placeholder="Your email address"
                value={userInfo.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && <span className="vr-error">{errors.email}</span>}
            </div>

            <div className="vr-field">
              <label>Password</label>
              <div className="vr-password-wrap">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={userInfo.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="vr-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={18} />
                  ) : (
                    <FaRegEye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <span className="vr-error">{errors.password}</span>
              )}
            </div>

            <div className="vr-field">
              <label>Confirm Password</label>

              <div className="vr-password-wrap">
                <Input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={userInfo.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <button
                  type="button"
                  className="vr-eye-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? (
                    <FaRegEyeSlash size={18} />
                  ) : (
                    <FaRegEye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <span className="vr-error">{errors.confirmPassword}</span>
              )}
            </div>

            <Button
              btnText={
                isLoading ? "Creating Account..." : "Sign up as a vendor"
              }
              className="vr-submit-btn"
              type="submit"
              disabled={
                isLoading || userInfo.password !== userInfo.confirmPassword
              }
            />
            {error && <p className="vr-error">{error}</p>}
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