import React, { useEffect } from "react";
import "./css/SuccessModal.css";

const SuccessModal = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-overlay">
      <div className="success-modal">
        <div className="success-icon">🤝</div>
        <p className="success-text">
          Your KYC is been process by the Admin, a confirmation
          email will be sent to your registered name above
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;