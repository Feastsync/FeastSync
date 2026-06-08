import React, { useState } from 'react'
import Button from '../Props/Button'
import Headerlogo from '../assets/logos/Headerlogo.png'
import { FaArrowLeft } from "react-icons/fa6";
import "../Auth/Css/ResetPassword.css"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [Password , setPassword]=useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]=useState(false)
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePassword =()=>{
    setShowPassword((showPassword)=>!showPassword)
  }
  return (
   <div className='resetPasswordBox'>
        <div className='forgotPasswordLogo'>
                   <div className='resetPasswordLogo'>
                           <div className='header_left'>
                                 <img src={Headerlogo} alt="FeastSync Logo" className='logo_img' />
                                 <h2 className='logo_text'>FeastSync</h2>
                               </div>
                          </div>
                          </div>
          <div className='resetPasswordButton'>
                     <Button>
                       <p><FaArrowLeft /></p>
                     </Button>
                     <p>Back</p>
                  </div>

             <div className='resetPaswwordContainer'>
                <div className='resetPasswordHolder'>
                  <div className='resetPasswordAssurance'>
                    <p className='resetPasswordText'>Reset Password?</p>
                    <p className='resetPasswordLink'>Enter your email address to recieve a recovery link</p>
                  </div>

                  <div className='resetpasswordEmail'>
                  
                  <section>
                      <label htmlFor=""> Create Password</label>
                   <div>
                     <input type={showPassword ? "text" : "password"}
                           name="" id="" 
                           placeholder='Enter your password'
                           value={Password}
                           onChange={(e)=>setPassword(e.target.value)}
                           /> <span onClick={handlePassword}>{showPassword ?<FaRegEyeSlash />:<FaRegEye />} </span>
                             </div>
                  </section>

                  <section>
                     <label htmlFor=""> Reset Password</label>
                   <div>
                     <input type={showConfirm ? "text" : "password"}
                           name="" id="" 
                           placeholder='Enter your password'
                           value={confirmPassword}
                           onChange={(e)=>setConfirmPassword(e.target.value)}/>
                          <span onClick={()=>setShowConfirm(!showConfirm)}>{showConfirm ?<FaRegEyeSlash />:<FaRegEye />} </span>
                   </div>
                  </section>
               
                   <Button >Submit</Button>
              
                 </div>
          </div>
                <div className='resetPasswordImage'>
                  <img src="public/About/amico.png" alt="" className='imageHolder'/>
                </div>
              </div>
    </div>
  )
}

export default ResetPassword
