import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import Swal from "sweetalert2"
import { signupUser, resetSignup } from "../../Redux/features/userslice"
import Button from "../../Props/Button"
import "../Css/UserSignUp.css"
import FeastLogo from "../../assets/logos/Headerlogo.png"
import SignUp from "../../assets/BackgroundImage/SignUP.jpeg"
import Imp from "../../Props/Imp"

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const UserSignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, error, otpSent, signupEmail } = useSelector(state => state.user)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [userInfo, setUserInfo] = useState({
    firstName: "", lastName: "",
    phone: "", email: "", password: "", confirmPassword: "",
  })

  const [FirstNameError, setFirstNameError] = useState({ err: false, name: "", msg: "" })
  const [LastNameError, setLastNameError] = useState({ err: false, name: "", msg: "" })
  const [PhoneError, setPhoneError] = useState({ err: false, name: "", msg: "" })
  const [EmailError, setEmailError] = useState({ err: false, name: "", msg: "" })
  const [PasswordError, setPasswordError] = useState({ err: false, name: "", msg: "" })
  const [ConfirmPasswordError, setConfirmPasswordError] = useState({ err: false, name: "", msg: "" })

  useEffect(() => {
    if (otpSent && signupEmail) {
      navigate('/verify-otp', { state: { email: signupEmail, accountType: 'user' } })
      dispatch(resetSignup())
    }
  }, [otpSent, signupEmail, navigate, dispatch])

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonColor: "#330159",
      })
    }
  }, [error])

  const HoldFirstName = (e) => {
    const val = e.target.value
    setUserInfo({...userInfo, firstName: val })
    if (val.trim() === "") {
      setFirstNameError({ err: true, name: "firstName", msg: "First name must not be empty" })
    } else {
      setFirstNameError({ err: false, name: "", msg: "" })
    }
  }

  const HoldLastName = (e) => {
    const val = e.target.value
    setUserInfo({...userInfo, lastName: val })
    if (val.trim() === "") {
      setLastNameError({ err: true, name: "lastName", msg: "Last name must not be empty" })
    } else {
      setLastNameError({ err: false, name: "", msg: "" })
    }
  }

  const HoldPhone = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 11)
    setUserInfo({...userInfo, phone: val })
    if (val.trim() === "") {
      setPhoneError({ err: true, name: "phone", msg: "Phone number must not be empty" })
    } else if (val.length !== 10 && val.length !== 11) {
      setPhoneError({ err: true, name: "phone", msg: "Phone number must be 10 or 11 digits" })
    } else {
      setPhoneError({ err: false, name: "", msg: "" })
    }
  }

  const HoldEmail = (e) => {
    const val = e.target.value
    setUserInfo({...userInfo, email: val })
    if (val.trim() === "") {
      setEmailError({ err: true, name: "email", msg: "Email must not be empty" })
    } else if (!EmailRegex.test(val)) {
      setEmailError({ err: true, name: "email", msg: "Please enter a valid email" })
    } else {
      setEmailError({ err: false, name: "", msg: "" })
    }
  }

  const HoldPassword = (e) => {
    const val = e.target.value
    setUserInfo({...userInfo, password: val })
    if (val.trim() === "") {
      setPasswordError({ err: true, name: "password", msg: "Password must not be empty" })
    } else {
      setPasswordError({ err: false, name: "", msg: "" })
    }
  }

  const HoldConfirmPassword = (e) => {
    const val = e.target.value
    setUserInfo({...userInfo, confirmPassword: val })
    if (val.trim() === "") {
      setConfirmPasswordError({ err: true, name: "confirmPassword", msg: "Please confirm your password" })
    } else if (val!== userInfo.password) {
      setConfirmPasswordError({ err: true, name: "confirmPassword", msg: "Passwords do not match" })
    } else {
      setConfirmPasswordError({ err: false, name: "", msg: "" })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let hasError = false

    if (userInfo.firstName.trim() === "") {
      setFirstNameError({ err: true, name: "firstName", msg: "First name must not be empty" })
      hasError = true
    }
    if (userInfo.lastName.trim() === "") {
      setLastNameError({ err: true, name: "lastName", msg: "Last name must not be empty" })
      hasError = true
    }
    if (userInfo.phone.trim() === "") {
      setPhoneError({ err: true, name: "phone", msg: "Phone number must not be empty" })
      hasError = true
    }
    if (userInfo.email.trim() === "") {
      setEmailError({ err: true, name: "email", msg: "Email must not be empty" })
      hasError = true
    } else if (!EmailRegex.test(userInfo.email)) {
      setEmailError({ err: true, name: "email", msg: "Please enter a valid email" })
      hasError = true
    }
    if (userInfo.password.trim() === "") {
      setPasswordError({ err: true, name: "password", msg: "Password must not be empty" })
      hasError = true
    }
    if (userInfo.confirmPassword.trim() === "") {
      setConfirmPasswordError({ err: true, name: "confirmPassword", msg: "Please confirm your password" })
      hasError = true
    } else if (userInfo.confirmPassword!== userInfo.password) {
      setConfirmPasswordError({ err: true, name: "confirmPassword", msg: "Passwords do not match" })
      hasError = true
    }

    if (hasError) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields correctly.",
        icon: "error",
        confirmButtonColor: "#330159",
        confirmButtonText: "Back to Sign Up",
      })
      return
    }

    const dataToSend = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phoneNumber: userInfo.phone,
      password: userInfo.password,
      confirmPassword: userInfo.confirmPassword
    }
    dispatch(signupUser(dataToSend))
  }

  return (
    <div className="cr-page">
      <div className="cr-container">
        <div className="cr-left">
          <div className="cr-logo-container">
            <img src={FeastLogo} alt="Logo" className="cr-logo" />
            <span className="cr-logo-text">FeastSync</span>
          </div>
          
          <Link to="/onboarding" className="cr-back">← Back</Link>
          
          <div className="cr-header">
            <h1>Client Registration</h1>
            <p>Create an Account and get started with <strong>FEASTSYNC</strong></p>
          </div>

          <form className="cr-form" onSubmit={handleSubmit}>
            <div className="cr-field">
              <label>Enter first name as seen on government ID</label>
              <Imp 
                placeholder="Your first name" 
                value={userInfo.firstName} 
                onBlur={() => setFirstNameError({ err: false, name: "", msg: "" })} 
                onChange={HoldFirstName} 
              />
              {FirstNameError.err && FirstNameError.name === "firstName" && (
                <span className="cr-error">{FirstNameError.msg}</span>
              )}
            </div>

            <div className="cr-field">
              <label>Enter Last name as seen on government ID</label>
              <Imp 
                placeholder="Your last name" 
                value={userInfo.lastName} 
                onBlur={() => setLastNameError({ err: false, name: "", msg: "" })} 
                onChange={HoldLastName} 
              />
              {LastNameError.err && LastNameError.name === "lastName" && (
                <span className="cr-error">{LastNameError.msg}</span>
              )}
            </div>

            <div className="cr-field">
              <label>Phone Number</label>
              <Imp 
                placeholder="Your Phone Number" 
                value={userInfo.phone} 
                onBlur={() => setPhoneError({ err: false, name: "", msg: "" })} 
                onChange={HoldPhone} 
              />
              {PhoneError.err && PhoneError.name === "phone" && (
                <span className="cr-error">{PhoneError.msg}</span>
              )}
            </div>

            <div className="cr-field">
              <label>Enter email</label>
              <Imp 
                type="email" 
                placeholder="Your email address" 
                value={userInfo.email} 
                onBlur={() => setEmailError({ err: false, name: "", msg: "" })} 
                onChange={HoldEmail} 
              />
              {EmailError.err && EmailError.name === "email" && (
                <span className="cr-error">{EmailError.msg}</span>
              )}
            </div>

            <div className="cr-field">
              <label>Password</label>
              <div className="cr-password-wrap">
                <Imp 
                  type={showPassword? "text" : "password"} 
                  placeholder="Enter your password" 
                  value={userInfo.password} 
                  onBlur={() => setPasswordError({ err: false, name: "", msg: "" })} 
                  onChange={HoldPassword} 
                />
                <button type="button" className="cr-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
              </div>
              {PasswordError.err && PasswordError.name === "password" && (
                <span className="cr-error">{PasswordError.msg}</span>
              )}
            </div>

            <div className="cr-field">
              <label>Confirm Password</label>
              <div className="cr-password-wrap">
                <Imp 
                  type={showConfirm? "text" : "password"} 
                  placeholder="Enter your password" 
                  value={userInfo.confirmPassword} 
                  onBlur={() => setConfirmPasswordError({ err: false, name: "", msg: "" })} 
                  onChange={HoldConfirmPassword} 
                />
                <button type="button" className="cr-eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
              </div>
              {ConfirmPasswordError.err && ConfirmPasswordError.name === "confirmPassword" && (
                <span className="cr-error">{ConfirmPasswordError.msg}</span>
              )}
            </div>

            <Button btnText={isLoading? "Signing up..." : "Sign up as a client"} className="cr-submit-btn" type="submit" disabled={isLoading} />

          </form>
        </div>

        <div className="cr-right">
          <img src={SignUp} alt="Sign up" />
        </div>
      </div>
    </div>
  )
}

export default UserSignUp