import React from 'react';
import "../Css/Vendorheader.css";
import Headerlogo2 from "../../assets/logos/Headerlogo2.svg";
import Bellicon2 from "../../assets/logos/Bellicon2.svg";
import Messageicon from "../../assets/logos/Messageicon.svg";
import { useNavigate } from 'react-router-dom';

const Vendorheader = () => {
    const nav = useNavigate()
  return (
    <header className='vendorheader-container'>
        <div className='vendorheader-wrapper'>
            <div className='vendorheader-left'>
                 <img src={Headerlogo2} alt="FeastSync Logo" className='logo-img' />
                 <h2 className='logo-text'>FeastSync</h2>
            </div>
            
            <div className='vendorheader-right'>
                <button className='icon-btn' aria-label="Wallet">
                    <img onClick={()=> nav('/wallet/transactions')} src={Messageicon} alt="" className='nav-icon1' />
                </button>
                
                <button className='icon-btn notification-btn' aria-label="Notifications">
                    <img onClick={()=> nav("/notifications")} src={Bellicon2} alt="" className='nav-icon' />
                    <span className='notification-badge'>1</span>
                </button>
                
                <div className='avatar-circle'>DK</div>
                
                <button className='edit-profile-btn'>Edit Profile</button>
            </div>
        </div>
    </header>
  );
};

export default Vendorheader;
