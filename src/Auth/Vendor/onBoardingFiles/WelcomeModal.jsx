import React from "react";
import "./css/Welcome.css";

const WelcomeModal = ({ vendorName = "Adeyemi", onContinue, onSkip }) => {
  return (
    <div className="welcome-card">
      <h2 className="welcome-title">Welcome, {vendorName}</h2>

      <p className="welcome-desc">
        Complete your vendor verification to start receiving bookings and
        payouts.
      </p>

      <button
        type="button"
        className="welcome-btn-primary"
        onClick={onContinue}
      >
        Continue verification
      </button>

      <button type="button" className="welcome-btn-text" onClick={onSkip}>
        Skip for now
      </button>
    </div>
  );
};

export default WelcomeModal;
