import React from "react";
import "./css/Welcome.css";

const WelcomeModal = ({ vendorName = "", onContinue }) => {
  const stageName =
    typeof vendorName === "string" && vendorName.trim()
      ? vendorName.trim().split(/\s+/)[0]
      : "there";

  return (
    <div className="welcome-card">
      <h2 className="welcome-title">Welcome, {stageName}</h2>

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
    </div>
  );
};

export default WelcomeModal;