import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaBars, FaTimes } from 'react-icons/fa'
import { logout } from '../Redux/features/authslice'
import Headerlogo from '../assets/logos/Headerlogo.png'
import Bell from '../assets/logos/Bell.png'
import Button from '../Props/Button.jsx'
import "./Css/Header.css"
import "../Auth/Css/Userheader.css"
import { persistor } from '../Redux/app/store'
import { logoutUser } from '../Redux/features/authslice'
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoggedIn, userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  const getInitials = (user) => {
    if (!user) return 'U'
    const first = user.firstName?.[0] || ''
    const last = user.lastName?.[0] || ''
    return (first + last).toUpperCase()
  }

    const handleLogout = () => {
  dispatch(logoutUser()).finally(() => {
     persistor.purge()
    navigate('/login')
    closeMenu()
  })
}

  if (isLoggedIn) {
    return (
      <nav className="userheader">
        <div className="userheader_wrapper">

          <div className="userheader_left">
            <img
              src={Headerlogo}
              alt="Logo"
              className="userheader_logo_img"
              onClick={() => navigate('/')}
            />
            <span className="userheader_logo_text">FeastSync</span>
          </div>

          <div className={`userheader_middle ${isOpen ? 'active' : ''}`}>
            <NavLink to="/" className="userheader_nav_link" onClick={closeMenu} end>Home</NavLink>
            <NavLink to="/about" className="userheader_nav_link" onClick={closeMenu}>About</NavLink>
            <NavLink to="/howitworks" className="userheader_nav_link" onClick={closeMenu}>How it works</NavLink>
            <NavLink to="/vendors" className="userheader_nav_link" onClick={closeMenu}>Vendors</NavLink>
            <NavLink to="/services" className="userheader_nav_link" onClick={closeMenu}>Services</NavLink>
            <NavLink to="/contact" className="userheader_nav_link" onClick={closeMenu}>Contact</NavLink>
          </div>

    
          <div className="userheader_right">
            <div className="userheader_notification_wrapper">
              <img src={Bell} alt="Notifications" className="userheader_bell_icon" />
            </div>
            <div onClick={()=> navigate("/userdashboard")} className="userheader_profile_wrapper">
              <div className="userheader_avatar_circle">
                <span>{getInitials(userInfo)}</span>
                <div className="userheader_status_dot"></div>
              </div>
              <span className="userheader_profile_name">
                {userInfo?.firstName} {userInfo?.lastName}
              </span>
            </div>
            <button className="userheader-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="menu_icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>

        </div>
      </nav>
    )
  }

  return (
    <nav className='feastHeader_container'>
      <div className='feastHeader_wrapper'>

        <div className='feastHeader_left'>
          <img
            onClick={() => navigate('/')}
            src={Headerlogo}
            alt="FeastSync Logo"
            className='feastHeader_logoImg'
          />
          <h2 className='feastHeader_logoText'>FeastSync</h2>
        </div>

        <div className={`feastHeader_middle ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" className='feastHeader_navLink' onClick={closeMenu} end>Home</NavLink>
          <NavLink to="/about" className='feastHeader_navLink' onClick={closeMenu}>About</NavLink>
          <NavLink to="/howitworks" className='feastHeader_navLink' onClick={closeMenu}>How it works</NavLink>
          <NavLink to="/vendors" className='feastHeader_navLink' onClick={closeMenu}>Vendors</NavLink>
          <NavLink to="/services" className='feastHeader_navLink' onClick={closeMenu}>Services</NavLink>
          <NavLink to="/contact" className='feastHeader_navLink' onClick={closeMenu}>Contact</NavLink>
        </div>

        <div className={`feastHeader_right ${isOpen ? 'active' : ''}`}>
          <h2
            onClick={() => { navigate('/login'); closeMenu() }}
            className='feastHeader_login'
          >
            Login
          </h2>
          <Button
            btnText="Get Started"
            className="feastHeader_getstartedBtn"
            onClick={() => { navigate('/onboarding'); closeMenu() }}
          />
        </div>

        <div className='feastHeader_menuIcon' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>
    </nav>
  )
}

export default Header