import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
// import "./Css/Header.css"
import Headerlogo from '../assets/logos/Headerlogo.png'
import Button from "../Props/Button.jsx"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const Nav = useNavigate()

  useEffect(() => {
    document.body.style.overflow = isOpen? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className='header_container'>
      <div className='header_wrapper'>
        <div className='header_left'>
          <img src={Headerlogo} alt="FeastSync Logo" className='logo_img' />
          <h2 className='logo_text'>FeastSync</h2>
        </div>

        <div className='menu_icon' onClick={() => setIsOpen(!isOpen)}>
          {isOpen? <FaTimes /> : <FaBars />}
        </div>

        <div className={`header_middle ${isOpen? "active" : ""}`}>
          <NavLink to="/" className='nav_link' onClick={closeMenu} end>Home</NavLink>
          <NavLink to="/about" className='nav_link' onClick={closeMenu}>About</NavLink>
          <NavLink to="/howitworks" className='nav_link' onClick={closeMenu}>How it works</NavLink>
          <NavLink to="/vendors" className='nav_link' onClick={closeMenu}>Vendors</NavLink>
          <NavLink to="/services" className='nav_link' onClick={closeMenu}>Services</NavLink>
          <NavLink to="/contact" className='nav_link' onClick={closeMenu}>Contact</NavLink>

          <div className="header_right">
            <Button
              btnText="Get Started"
              className="header_getstarted_btn"
              onClick={() => { Nav('/signup'); closeMenu(); }}
            />
            <h2 onClick={() => { Nav('/login'); closeMenu(); }} className='header_login'>
              Login
            </h2>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header