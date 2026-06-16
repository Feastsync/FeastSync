import React from 'react'
import { useState } from 'react'
import "../Admin/AdminSignup.css"
import { Button } from 'antd'
import { FaArrowLeft } from "react-icons/fa6"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const Adminsignup = () => {
     const [password, setPassword] = useState("")
      const [confirmPassword, setConfirmPassword] = useState("")
      const [showPassword, setShowPassword] = useState(false)
      const [showConfirm, setShowConfirm] = useState(false)
    
  return (
    <div  className='adminHolder'>
     <div className='adminContainer'>
         <div className='adminImage'><img src="public/About/Icon.png" alt="" /></div>
     <form className='adminForm'>
         <div className='adminInputHolder'>
            <label htmlFor="">Enter your name</label>
        <div className='adminInput'>
            <input type="text" placeholder='first name'/>
        </div>
      </div>

       <div className='adminInputHolder'>
         <label htmlFor="">Enter your last name</label>
      <div className='adminInput'>
          <input type="text" placeholder='last name'/>
      </div>
      </div>

       <div className='adminInputHolder'>
         <label htmlFor="">password</label>
       <div className='adminInput'>
         <input 
               type= { showPassword ? "text" : "Password"} 
               value={password}
               onChange={(e)=> setPassword (e.target.value)}
               placeholder='Enter your password'/>
                <span
                onClick={()=> setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>
       </div>
      </div>

       <div className='adminInputHolder'>
         <label htmlFor="">password</label>
         <div className='adminInput'>
            <input type={showConfirm ? "text" : "Password"}
                   value={confirmPassword}
                   onChange={(e) =>setConfirmPassword(e.target.value)}
                   placeholder='Repeat password'/>
                   <span 
                   onClick={()=> setShowConfirm(!showConfirm)}>
                    {showConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
                   </span>
         </div>
      </div>
      <div className='adminTerms'>
        <p>By signing up I agree with <span>terms and conditions</span></p>
      </div>
      <Button className='adminButton'>sign up</Button>
       </form>
     </div>
    </div>
  )
}

export default Adminsignup
