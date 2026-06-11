import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../Redux/features/authslice'
import { message } from 'antd'
import Headerlogo from '../assets/logos/Headerlogo.png'
import Button from '../Props/Button'
import { FaArrowLeft } from "react-icons/fa6"
import "../Auth/Css/ForgotPassword.css"
import Header from '../Components/Header';

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ForgetPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.auth)

  const [email, setEmail] = useState("")

  const handleSendOTP = async () => {
    if (email.trim() === "") {
      message.error("Please enter your email address")
      return
    }

    if (!EmailRegex.test(email)) {
      message.error("Please enter a valid email address")
      return
    }

    try {
      await dispatch(forgotPassword(email)).unwrap()
      message.success("Recovery OTP sent to your email")
      navigate('/verify-otp', { state: { email, accountType: 'user', isForgotPassword: true } })
    } catch (err) {
      message.error(err || "Failed to send OTP")
    }
  }

  return (
    <div>
         <div className='forgotPasswordLogo'>
            <div className='forgetPasswordLogo'>
                        <Header />
                   </div>
         </div>

              <div className='forgotPaswwordContainer'>
                <div className='forgotPasswordHolder'>
                  <div className='forgotPasswordButton'>
                     <Button>
                      <p> <FaArrowLeft /></p>
                     </Button>
                     <p>Back</p>
                  </div>

                  <div className='forgotPasswordAssurance'>
                    <p className='forgotPasswordText'>Forgot Password?</p>
                    <p className='forgotPasswordLink'>No worries Enter your email address and we'll send you a 
                      link to reset your password.</p>
                  </div>

                  <div className='passwordEmail'>
                    <section className='passwordEmailWrapper'>
                      <label htmlFor="">Email Address</label>
                    <input type="email"
                           name="" id="" 
                           placeholder='Your email address'
                           onChange={(e)=>setEmail(e.target.value)}
                           />
                    </section>
                    <Button >Send recovery OTP</Button>
                    <p>Remember your password? <span style={{color:'#330159', fontWeight:"bold"}}>Sign in</span></p>
                  </div>
                </div>
                <div className='forgotPasswordImage'>
                  <img src="../public/About/Icon.png" alt="Forgot Password Icon" />
                </div>
              </div>
    </div>
  )
}

export default ForgetPassword