import React, { useState } from 'react'
import Headerlogo from '../assets/logos/Headerlogo.png'
import Button from '../Props/Button'
import { FaArrowLeft } from "react-icons/fa6";
import "../Auth/Css/ForgotPassword.css"
import axios from 'axios';
const ForgetPassword = () => {
  return (
    <div>
         <div className='forgotPasswordLogo'>
          <div className='header_left'>
                <img src={Headerlogo} alt="FeastSync Logo" className='logo_img' />
                <h2 className='logo_text'>FeastSync</h2>
              </div>
         </div>

              <div className='forgotPaswwordContainer'>
                <div className='forgotPasswordHolder'>
                  <div className='forgotPasswordButton'>
                     <Button>
                       <FaArrowLeft />
                     </Button>
                     <p>Back</p>
                  </div>

                  <div className='forgotPasswordAssurance'>
                    <p className='forgotPasswordText'>Forgot Password?</p>
                    <p className='forgotPasswordLink'>No worries Enter your email address and we'll send you a 
                      link to reset your password.</p>
                  </div>

                  <div className='passwordEmail'>
                    <label htmlFor="">Email Address</label>
                    <input type="email"
                           name="" id="" 
                           placeholder='Your email address'
                           onChange={(e)=>setEmail(e.target.value)}
                           />
                    <Button >Send recovery OTP</Button>
                    <p>Remember your password? <span style={{color:'#330159', fontWeight:"bold"}}>Sign in</span></p>
                  </div>
                </div>
                <div className='forgotPasswordImage'>
                  <img src="src/assets/logos/Icon.png" alt="" />
                </div>
              </div>
    </div>
  )
}

export default ForgetPassword
