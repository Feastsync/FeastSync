import React from "react";
import "./css/SuccessModal.css";
import handShake from "../../../assets/logos/handshake.png";
const SuccessModal = ({ onClose, isLoading, error }) => {
  return (
    <div className="success-modal">
      <img className="success-icon" src={handShake} alt="" />

      <p className="success-text">
        Your KYC is being processed by the Admin. A confirmation email will be
        sent to your registered email address.
      </p>

      {error && (
        <p className="success-error">{error}</p>
      )}

      <button
        className="success-btn"
        onClick={onClose}
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Finish Setup"}
      </button>
    </div>
  );
};

export default SuccessModal;