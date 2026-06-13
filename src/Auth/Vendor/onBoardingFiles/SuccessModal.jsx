import React, { useEffect } from "react";
import "./css/SuccessModal.css";
import handShake from "../../../assets/logos/handshake.png";
const SuccessModal = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-modal">
      <img className="success-icon" src={handShake} alt="" />
      <p className="success-text">
        Your KYC is been process by the Admin, a confirmation email will be sent
        to your registered name above
      </p>
    </div>
  );
};

export default SuccessModal;
