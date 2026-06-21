import React from 'react'
import "../Css/Vendorheader2.css"
import Times from "../../assets/logos/Times.svg"
import { useNavigate } from 'react-router-dom'

const Vendorheader2 = () => {
  const navigate = useNavigate();
  return (
    <div className="vendorheader2-banner">
      <div className="vendorheader2-left">
        <div className="vendorheader2-profile-wrapper">
          <div className="vendorheader2-avatar-circle">DJ</div>
          <div className="vendorheader2-status-dot"></div>
        </div>
        
        <div className="vendorheader2-info">
          <h1 className="vendorheader2-name">DJ Kolade, Lagos, Nigeria.</h1>
          <div className="vendorheader2-meta-row">
            <div className="vendorheader2-kyc-badge">
              <span className="vendorheader2-circle-check"></span>
              <span>KYC Verified</span>
            </div>
            <span className="vendorheader2-booking-id">Booking #FS-CO512 · Event completed</span>
          </div>
        </div>
      </div>

      <div className="vendorheader2-close" onClick={() => navigate("/userdashboard")}>
        <img src={Times} alt="" />
      </div>
    </div>
  )
}

export default Vendorheader2
