import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import "./Css/Header.css" // uncomment this back
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
    <nav className='feastHeader_container'>
      <div className='feastHeader_wrapper'>
        <div className='feastHeader_left'>
          <img src={Headerlogo} alt="FeastSync Logo" className='feastHeader_logoImg' />
          <h2 className='feastHeader_logoText'>FeastSync</h2>
        </div>

        <div className='feastHeader_menuIcon' onClick={() => setIsOpen(!isOpen)}>
          {isOpen? <FaTimes /> : <FaBars />}
        </div>

        <div className={`feastHeader_middle ${isOpen? "active" : ""}`}>
          <NavLink to="/" className='feastHeader_navLink' onClick={closeMenu} end>Home</NavLink>
          <NavLink to="/about" className='feastHeader_navLink' onClick={closeMenu}>About</NavLink>
          <NavLink to="/howitworks" className='feastHeader_navLink' onClick={closeMenu}>How it works</NavLink>
          <NavLink to="/vendors" className='feastHeader_navLink' onClick={closeMenu}>Vendors</NavLink>
          <NavLink to="/services" className='feastHeader_navLink' onClick={closeMenu}>Services</NavLink>
          <NavLink to="/contact" className='feastHeader_navLink' onClick={closeMenu}>Contact</NavLink>

          <div className="feastHeader_right">
            <Button
              btnText="Get Started"
              className="feastHeader_getstartedBtn"
              onClick={() => { Nav('/signup'); closeMenu(); }}
            />
            <h2 onClick={() => { Nav('/login'); closeMenu(); }} className='feastHeader_login'>
              Login
            </h2>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header