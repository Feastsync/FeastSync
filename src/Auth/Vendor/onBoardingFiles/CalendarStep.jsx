import React from "react";
import { IoClose } from "react-icons/io5";
import "./css/CalendarStep.css";

const CalendarStep = ({ onNext, onBack }) => {
  return (
    <div className="cs-overlay">
      <div className="cs-modal">
        <div className="cs-header">
          <div>
            <h2>Availability Calendar</h2>
            <p>You need to complete your profile before accessing vendor features</p>
            <div className="cs-progress-bar">
              <div className="cs-progress-fill" style={{width: '100%'}} />
            </div>
          </div>
          <button className="cs-close" onClick={onBack}>
            <IoClose size={24} />
          </button>
        </div>

        <div className="cs-body">
          <h3 className="cs-section-title">Set Your Availability</h3>
          <p className="cs-subtitle">Configure when you're available for bookings</p>
          
          <div className="cs-calendar-placeholder">
            <p>Calendar component goes here</p>
            <span>Mark unavailable dates and set working hours</span>
          </div>
        </div>

        <div className="cs-footer">
          <button className="cs-btn-text">Skip for Now</button>
          <div className="cs-btn-group">
            <button className="cs-btn-outline" onClick={onBack}>Back</button>
            <button className="cs-btn-primary" onClick={onNext}>Complete Setup</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarStep;