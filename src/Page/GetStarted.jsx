import React from 'react'
import Button from '../Props/Button'
import "../Page/Css/GetStarted.css"
import { GoPerson } from "react-icons/go";
import { FaDotCircle } from "react-icons/fa";
import Headerlogo from '../assets/logos/Headerlogo.png'
const GetStarted = () => {
  return (
    <div className='getStartedContainer'>

              <div className='header_left'>
                <img src={Headerlogo} alt="FeastSync Logo" className='logo_img' />
                <h2 className='logo_text'>FeastSync</h2>
              </div>
     
      <p className='getStartedContainerText'>Create an account and get started with FeastSync</p>
      <p>Choose an account type</p>
      <div className='getStartedContainerBox'>
         <div style={{backgroundColor:"#330159",color:"white",}}>
          <GoPerson className='getStartedicon1'/>
      <section className='handler'>
          <p className='getStartedName'>Personal</p>
        <p>Register as a host/event organiser</p>
      </section>
        <FaDotCircle className='getStartedicon2'/>
         </div>
         <div>
           <GoPerson className='getStartedicon1'/>
       <section className='handler'>
         <p className='getStartedName'>vendors</p>
        <p>Register as our feaster/vendors</p>
       </section>
        <FaDotCircle className='getStartedicon2'/>
        </div>
      </div>
      <div className='getStartedContainerbtn'>
      <Button btnText="Go back to home"/>
      </div>
    </div>
  )
}

export default GetStarted
