import React from 'react'
import Button from '../Props/Button'
import "../Page/Css/GetStarted.css"
const GetStarted = () => {
  return (
    <div className='getStartedContainer'>
      <p className='getStartedContainerText'>Create an account and get started with FeastSync</p>
      <p>Choose an account type</p>
      <div className='getStartedContainerBox'>
         <div className='box'>
        <p>Personal</p>
        <p>Register as a host/event organiser</p>
         </div>
         <div>
        <p>vendors</p>
        <p>Register as our feaster/vendors</p>
        </div>
      </div>
      <div className='getStartedContainerbtn'>
      <Button btnText="Go back to home"/>
      </div>
    </div>
  )
}

export default GetStarted
