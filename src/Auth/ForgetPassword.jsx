import React, { useState } from 'react'
import Headerlogo from '../assets/logos/Headerlogo.png'
import Button from '../Props/Button'
import { FaArrowLeft } from "react-icons/fa6";
import "../Auth/Css/ForgotPassword.css"
import Header from '../Components/Header';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div>
         <div className='forgotPasswordLogo'>
            <div className='resetPasswordLogo'>
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
