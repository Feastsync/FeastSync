import { useNavigate } from "react-router-dom";
import Button from "../Props/Button.jsx";
import "./Css/BookingRequest.css";

export default function BookingRequest() {
  const navigate = useNavigate();

  const handleAccept = () => {
  
  };

  const handleDecline = () => {
   
  };

  return (
    <div className="Booking_request_container">
      
  
      <div className="Booking_request_topbar">
        <div className="Booking_request_topbar_left">
          <Button 
            className="Booking_request_back_btn" 
            onClick={() => navigate(-1)}
          >
            <span className="Booking_request_back_icon">←</span> Back
          </Button>
          <div className="Booking_request_timer">
            <h1 className="Booking_request_time">23h 41m</h1>
            <p className="Booking_request_time_label">Remaining to respond</p>
          </div>
        </div>
        <div className="Booking_request_topbar_right">
          <span className="Booking_request_megaphone">📢</span>
          <span className="Booking_request_new_text">New request</span>
        </div>
      </div>

     
      <div className="Booking_request_vendor_banner">
        <div className="Booking_request_vendor_left">
          <div className="Booking_request_avatar_wrap">
            <div className="Booking_request_avatar">DJ</div>
            <span className="Booking_request_online_dot"></span>
          </div>
          <div className="Booking_request_vendor_info">
            <h2 className="Booking_request_vendor_name">DJ Kolade, Lagos, Nigeria.</h2>
            <div className="Booking_request_vendor_meta">
              <span className="Booking_request_kyc_badge">
                <span className="Booking_request_check">✓</span> KYC Verified
              </span>
              <span className="Booking_request_status">Online</span>
            </div>
          </div>
        </div>
        <div className="Booking_request_vendor_actions">
          <button onClick={()=>navigate("/chats")} className="Booking_request_icon_btn">
            <span >💬</span>
          </button>
          <button className="Booking_request_icon_btn">
            <span>📅</span>
          </button>
        </div>
      </div>

      <p className="Booking_request_notice">
        All messages through FEASTSYNC are audit-trail locked. Payments are held in escrow via Korapay until event completion. Do not move conversations off-platform.
      </p>

     
      <div className="Booking_request_section">
        <h3 className="Booking_request_section_title">Event details</h3>
        <div className="Booking_request_details_grid">
          <div className="Booking_request_detail_row">
            <span className="Booking_request_detail_label">Event date:</span>
            <span className="Booking_request_detail_value">Saturday, 14 June 2025</span>
          </div>
          <div className="Booking_request_detail_row">
            <span className="Booking_request_detail_label">Venue:</span>
            <span className="Booking_request_detail_value">Monarch Hall, Victoria Island, Lagos</span>
          </div>
          <div className="Booking_request_detail_row">
            <span className="Booking_request_detail_label">Event Type:</span>
            <span className="Booking_request_detail_value">Traditional wedding ceremony</span>
          </div>
          <div className="Booking_request_detail_row">
            <span className="Booking_request_detail_label">Guest count:</span>
            <span className="Booking_request_detail_value">400 - 500 guests</span>
          </div>
          <div className="Booking_request_detail_row">
            <span className="Booking_request_detail_label">Duration:</span>
            <span className="Booking_request_detail_value">All day</span>
          </div>
          <div className="Booking_request_detail_row">
            <span className="Booking_request_detail_label">Services:</span>
            <span className="Booking_request_detail_value">DJ set — full event coverage</span>
          </div>
        </div>
      </div>

      <div className="Booking_request_section">
        <h3 className="Booking_request_section_title">Proposed package</h3>
        <div className="Booking_request_package">
          <div className="Booking_request_package_row">
            <span className="Booking_request_package_name">Standard wedding package</span>
            <span className="Booking_request_package_price">₦250,000</span>
          </div>
          <p className="Booking_request_package_desc">
            Includes: sound equipment, 2× assistants, set-up & breakdown
          </p>
        </div>
      </div>

     
      <div className="Booking_request_section">
        <p className="Booking_request_note">
          <strong>Organiser note:</strong> Looking for an experienced DJ who can blend highlife, afrobeats and R&B. Previous event experience with large crowds preferred. Setup access from 2:00 PM."
        </p>
      </div>

   
      <div className="Booking_request_actions">
        <Button 
          className="Booking_request_accept_btn"
          onClick={handleAccept}
          btnText="Accept"
        />
        <Button 
          className="Booking_request_decline_btn"
          onClick={handleDecline}
          btnText="Decline"
        />
      </div>

    </div>
  );
}