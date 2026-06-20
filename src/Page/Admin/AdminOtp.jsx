import { Button } from 'antd'
import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import "../../Page/Admin/admincss/adminOtp.css"

const adminOtp = () => {
  return (
    <div className='adminOtpHolder'>
    <div className='adminOtpContainer'>
      <div className='adminImage'>
        <img src="/About/Frame 98.png" alt="" />
      </div>
      <div className='adminOtpVerfication'>
                <div className="adminOtpButton">
                    <Button onClick={() => navigate("/login")}>
                      <p>
                        <FaArrowLeft />
                      </p>
                    </Button>
                    <span>Back</span>
                </div>
                <div className='adminOtpWrapper'>
             <div className='adminOtpText'>
                    <p className='otpVerifyText'>OTP verification</p>
                    <p>Enter your email address to recieve link</p>
             </div>
                <div className='adminOtpInputOTP'>
                    <p>Input OTP</p>
                    <div className='adminOtpInput'>
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                    </div>
                </div>
                <Button className='adminVerifyOtpButton'>Verify OTP</Button>
              <div className='adminOtpResend'>
                  <p>Didn't receive the code? <span>Resend</span></p>
              </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default adminOtp
