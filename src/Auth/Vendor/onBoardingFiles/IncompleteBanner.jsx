import React from "react";
import "./css/IncompleteBanner.css";

const IncompleteBanner = ({ onComplete }) => {
  return (
    <div className="ib-overlay">
      <div className="ib-banner">
        <div className="ib-icon">i</div>
        <div className="ib-content">
          <h4>Profile Incomplete (25% Complete)</h4>
          <p>Your profile is not yet complete. Complete all required sections to start receiving bookings and unlock all vendor features.</p>
        </div>
        <button className="ib-btn" onClick={onComplete}>
          Complete Your Profile →
        </button>
      </div>
    </div>
  );
};

export default IncompleteBanner;