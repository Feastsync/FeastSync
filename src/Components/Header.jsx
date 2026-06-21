import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IoChatbubbleEllipsesOutline, IoChevronDownOutline, IoNotificationsOutline } from 'react-icons/io5'
import { MdDashboard, MdLogout } from 'react-icons/md'
import Headerlogo from '../assets/logos/Headerlogo.png'
import Button from '../Props/Button.jsx'
import "./Css/Header.css"
import "../Auth/Css/Userheader.css"
import { persistor } from '../Redux/app/store'
import { logoutUser } from '../Redux/features/authslice'
import useAuth from '../lib/Myauth.jsx'

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoggedIn, activeUser, isVendor } = useAuth()

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAvatarDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  const getInitials = (user) => {
    if (!user) return 'U'
    const first = user.firstName?.[0] || user.stageName?.[0] || ''
    const last = user.lastName?.[0] || ''
    return (first + last).toUpperCase()
  }

  const confirmLogout = async () => {
    setShowLogoutModal(false)
    setAvatarDropdownOpen(false)
    closeMobile()
    await dispatch(logoutUser())
    await persistor.purge()
    navigate('/login')
  }

  const handleDashboard = () => {
    setAvatarDropdownOpen(false)
    closeMobile()
    navigate(isVendor ? '/vendordashboard' : '/userdashboard')
  }

  if (isLoggedIn && !isVendor) {
    return (
      <>
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

      
            <div className={`userheader_middle ${mobileOpen ? 'active' : ''}`}>
              <div className="userheader_mobile_profile">
                <div className="userheader_mobile_avatar">
                  {getInitials(activeUser)}
                  <span className="userheader_mobile_avatar_dot" />
                </div>
                <div>
                  <div className="userheader_mobile_name">
                    {activeUser?.firstName} {activeUser?.lastName}
                  </div>
                  <div className="userheader_mobile_status">Online</div>
                </div>
              </div>

              <NavLink to="/" className="userheader_nav_link" onClick={closeMobile} end>Home</NavLink>
              <NavLink to="/about" className="userheader_nav_link" onClick={closeMobile}>About</NavLink>
              <NavLink to="/howitworks" className="userheader_nav_link" onClick={closeMobile}>How it works</NavLink>
              <NavLink to="/vendors" className="userheader_nav_link" onClick={closeMobile}>Vendors</NavLink>
              <NavLink to="/services" className="userheader_nav_link" onClick={closeMobile}>Services</NavLink>
              <NavLink to="/contact" className="userheader_nav_link" onClick={closeMobile}>Contact</NavLink>
              <div className="userheader_mobile_actions">
                <button className="userheader_mobile_action_btn" onClick={() => { navigate('/notifications'); closeMobile() }}>
                  <IoNotificationsOutline size={20} /> Notifications
                </button>
                <button className="userheader_mobile_action_btn" onClick={handleDashboard}>
                  <MdDashboard size={20} /> My Dashboard
                </button>
                <button
                  className="userheader_mobile_action_btn userheader_mobile_logout"
                  onClick={() => setShowLogoutModal(true)}
                >
                  <MdLogout size={20} /> Logout
                </button>
              </div>
            </div>
            <div className="userheader_right">
              <button className="userheader_icon_btn userheader_desktop_only" aria-label="Notifications">
                <IoNotificationsOutline className="userheader_bell_icon" />
              </button>
              <button
                className="userheader_icon_btn"
                aria-label="Messages"
                onClick={() => navigate('/chats')}
              >
                <IoChatbubbleEllipsesOutline className="userheader_chat_icon" />
              </button>
              <div className="userheader_avatar_wrapper userheader_desktop_only" ref={dropdownRef}>
                <button
                  className="userheader_avatar_btn"
                  onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
                  aria-label="Account menu"
                  aria-expanded={avatarDropdownOpen}
                >
                  <div className="userheader_avatar_circle">
                    <span>{getInitials(activeUser)}</span>
                    <div className="userheader_status_dot" />
                  </div>
                  <IoChevronDownOutline
                    className={`userheader_chevron ${avatarDropdownOpen ? 'open' : ''}`}
                  />
                </button>

                {avatarDropdownOpen && (
                  <div className="userheader_dropdown">
                    <div className="userheader_dropdown_inner">
                    {/* Profile info */}
                    <div className="userheader_dropdown_profile">
                      <div className="userheader_dropdown_avatar">
                        {getInitials(activeUser)}
                        <div className="userheader_dropdown_avatar_dot" />
                      </div>
                      <div>
                        <div className="userheader_dropdown_name">
                          {activeUser?.firstName} {activeUser?.lastName}
                        </div>
                        <div className="userheader_dropdown_email">
                          {activeUser?.email}
                        </div>
                      </div>
                    </div>

                    <div className="userheader_dropdown_divider" />

                    <button className="userheader_dropdown_item" onClick={handleDashboard}>
                      <MdDashboard size={17} />
                      My Dashboard
                    </button>

                    <div className="userheader_dropdown_divider" />

                    <button
                      className="userheader_dropdown_item userheader_dropdown_logout"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      <MdLogout size={17} />
                      Logout
                    </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="userheader_hamburger"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

          </div>
        </nav>
        {mobileOpen && (
          <div className="userheader_overlay" onClick={closeMobile} />
        )}
        {showLogoutModal && (
          <div className="userheader_modal_backdrop" onClick={() => setShowLogoutModal(false)}>
            <div className="userheader_modal" onClick={(e) => e.stopPropagation()}>
              <div className="userheader_modal_icon">
                <MdLogout size={28} />
              </div>
              <h3 className="userheader_modal_title">Log out?</h3>
              <p className="userheader_modal_text">
                You'll need to sign in again to access your account.
              </p>
              <div className="userheader_modal_actions">
                <button
                  className="userheader_modal_cancel"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="userheader_modal_confirm"
                  onClick={confirmLogout}
                >
                  Yes, log out
                </button>
              </div>
            </div>
          </div>
        )}
      </>
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

        <div className={`feastHeader_middle ${mobileOpen ? 'active' : ''}`}>
          <NavLink to="/" className='feastHeader_navLink' onClick={closeMobile} end>Home</NavLink>
          <NavLink to="/about" className='feastHeader_navLink' onClick={closeMobile}>About</NavLink>
          <NavLink to="/howitworks" className='feastHeader_navLink' onClick={closeMobile}>How it works</NavLink>
          <NavLink to="/vendors" className='feastHeader_navLink' onClick={closeMobile}>Vendors</NavLink>
          <NavLink to="/services" className='feastHeader_navLink' onClick={closeMobile}>Services</NavLink>
          <NavLink to="/contact" className='feastHeader_navLink' onClick={closeMobile}>Contact</NavLink>
        </div>

        <div className={`feastHeader_right ${mobileOpen ? 'active' : ''}`}>
          <h2
            onClick={() => { navigate('/login'); closeMobile() }}
            className='feastHeader_login'
          >
            Login
          </h2>
          <Button
            btnText="Get Started"
            className="feastHeader_getstartedBtn"
            onClick={() => { navigate('/onboarding'); closeMobile() }}
          />
        </div>

        <div className='feastHeader_menuIcon' onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>
    </nav>
  )
}

export default Header