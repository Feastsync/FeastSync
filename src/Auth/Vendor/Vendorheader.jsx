import React, { useState, useEffect } from 'react';
import "../Css/Vendorheader.css";
import Headerlogo2 from "../../assets/logos/Headerlogo2.svg";
import Bellicon2 from "../../assets/logos/Bellicon2.svg";
import Messageicon from "../../assets/logos/Messageicon.svg";
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Vendorheader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className='vendorheader-container'>
      <div className='vendorheader-wrapper'>
        <div className='vendorheader-left' onClick={() => { nav('/'); closeMenu(); }}>
          <img src={Headerlogo2} alt="FeastSync Logo" className='logo-img' />
          <h2 className='logo-text'>FeastSync</h2>
        </div>
        
        <div className={`vendorheader-right ${isOpen ? "active" : ""}`}>
          <button className='icon-btn' aria-label="Wallet" onClick={() => { nav('/wallet/transactions'); closeMenu(); }}>
            <img src={Messageicon} alt="" className='nav-icon1' />
            <span className='vendorheader-navLabel'>Messages</span>
          </button>
          
          <button className='icon-btn notification-btn' aria-label="Notifications" onClick={() => { nav("/notifications"); closeMenu(); }}>
            <div className='icon-wrapper'>
              <img src={Bellicon2} alt="" className='nav-icon' />
              <span className='notification-badge'>1</span>
            </div>
            <span className='vendorheader-navLabel'>Notifications</span>
          </button>
          
          <div className='vendorheader-footerActions'>
            <div className='avatar-circle'>DK</div>
            <button className='edit-profile-btn' onClick={() => { nav('/profile/edit'); closeMenu(); }}>Edit Profile</button>
          </div>
        </div>

        <div className='vendorheader_menuIcon' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Vendorheader;