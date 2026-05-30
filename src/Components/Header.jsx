import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Css/Header.css"
import Headerlogo from '../assets/logos/Headerlogo.png'
import Button from "../Props/Button.jsx"

const Header = () => {
  return (
    <nav className='header_container'>
      <div className='header_wrapper'>
        
        <div className='header_left'>
          <img src={Headerlogo} alt="FeastSync Logo" className='logo_img' />
          <h2 className='logo_text'>FeastSync</h2>
        </div>

        <div className='header_middle'>
          <NavLink to="/" className='nav_link' end>Home</NavLink>
          <NavLink to="/about" className='nav_link'>About</NavLink>
          <NavLink to="/howitworks" className='nav_link'>How it works</NavLink>
          <NavLink to="/vendors" className='nav_link'>Vendors</NavLink>
          <NavLink to="/services" className='nav_link'>Services</NavLink>
          <NavLink to="/contact" className='nav_link'>Contact</NavLink>
        </div>

        <div className='header_right'>
         <h2 className='header_login'> Login </h2>
          <Button btnText="Get Started" className="header_getstarted_btn"/>
        </div>

      </div>
    </nav>
  )
}

export default Header