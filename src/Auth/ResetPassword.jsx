import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearError } from '../Redux/features/authslice'
import { message } from 'antd'
import Button from '../Props/Button'
import Headerlogo from '../assets/logos/Headerlogo.png'
import { FaArrowLeft } from "react-icons/fa6"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import "../Auth/Css/ResetPassword.css"

const ResetPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const { isLoading, error } = useSelector((state) => state.auth)

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const email = location.state?.email
  const otp = location.state?.otp

  useEffect(() => {
    if (!email ||!otp) {
      message.error("Invalid reset session. Please start over.")
      navigate("/forgot-password")
    }
  }, [email, otp, navigate])

  useEffect(() => {
    if (error) {
      message.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleSubmit = async () => {
    if (!password ||!confirmPassword) {
      return message.error("Please fill in both fields")
    }
    if (password.length < 6) {
      return message.error("Password must be at least 6 characters")
    }
    if (password!== confirmPassword) {
      return message.error("Passwords do not match")
    }

    try {
      await dispatch(resetPassword({ 
        email, 
        otp, 
        password, 
        confirmPassword
      })).unwrap()
      message.success("Password reset successfully! Please login")
      navigate("/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='resetPasswordBox'>
      <div className='forgotPasswordLogo'>
        <div className='resetPasswordLogo'>
          <div className='header_left'>
            <img onClick={() => navigate('/')} src={Headerlogo} alt="FeastSync Logo" className='logo_img' />
            <h2 className='logo_text'>FeastSync</h2>
          </div>
        </div>
      </div>

      <div className='resetPasswordButton'>
        <Button onClick={() => navigate('/forgot-password')}>
          <p><FaArrowLeft /></p>
        </Button>
        <p>Back</p>
      </div>

      <div className='resetPaswwordContainer'>
        <div className='resetPasswordHolder'>
          <div className='resetPasswordAssurance'>
            <p className='resetPasswordText'>Reset Password</p>
            <p className='resetPasswordLink'>Enter a new password for {email}</p>
          </div>

          <div className='resetpasswordEmail'>
            <section>
              <label htmlFor="password">New Password</label>
              <div>
                <input
                  type={showPassword? "text" : "password"}
                  id="password"
                  placeholder='Enter new password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>
            </section>

            <section>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div>
                <input
                  type={showConfirm? "text" : "password"}
                  id="confirmPassword"
                  placeholder='Confirm new password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>
            </section>

            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading? "Resetting..." : "Reset Password"}
            </Button>
          </div>
        </div>

        <div className='resetPasswordImage'>
          <img src="/About/amico.png" alt="" className='imageHolder' />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword