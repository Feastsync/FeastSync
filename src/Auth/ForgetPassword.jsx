import React, { useState } from 'react'
import Headerlogo from '../assets/logos/Headerlogo.png'
import Button from '../Props/Button'
import { FaArrowLeft } from "react-icons/fa6";
import "../Auth/Css/ForgotPassword.css"
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div>
         <div className='forgotPasswordLogo'>
            <div className='resetPasswordLogo'>
                          <div className='feastHeader_left'>
                            <img onClick={()=> Nav('/')} src={Headerlogo} alt="FeastSync Logo" className='feastHeader_logoImg' />
                            <h2 className='feastHeader_logoText'>FeastSync</h2>
                          </div>
                   </div>
         </div>

              <div className='forgotPaswwordContainer'>
                <div className='forgotPasswordHolder'>
                  <div className='forgotPasswordButton'>
                     <Button onClick={() => navigate('signup')}>
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
                    <section className='passwordEmailWrapper'>
                      <label htmlFor="">Email Address</label>
                    <input type="email"
                           name="" id="" 
                           placeholder='Your email address'
                           onChange={(e)=>setEmail(e.target.value)}
                           />
                    <Button onClick={() => navigate('/verify-otp')}>Send recovery OTP</Button>
                    <p>Remember your password? <span style={{color:'#330159', fontWeight:"bold", cursor:"pointer"}} onClick={() => navigate('/login')}> Sign in </span></p>
                    </section>
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
