import React, { useState } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";
import "./css/BankStep.css";
import { useNavigate } from "react-router-dom";

const BankStep = ({ onNext, onBack, onSkip, percentComplete = 20 }) => {
  const [state, setState] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const navigate = useNavigate()

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="bank-modal-overlay">
      <div className="bank-modal">
        <div className="bank-modal-header">
          <div className="bank-header-top">
            <h2>Bank Information</h2>
            <button className="bank-close" onClick={onSkip}>
              <FiX size={24} />
            </button>
          </div>
          
          <p className="bank-subtext">
            You need to complete your profile before accessing vendor features
          </p>

          <div className="bank-progress-bar">
            <div 
              className="bank-progress-fill" 
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>
        </div>

        <div className="bank-modal-body">
          <div className="bank-warning">
            <div className="bank-warning-bar"></div>
            <p>
              Account name must match the name on your ID exactly. Payouts follow the 70/30 escrow split — 30% released 24 hours after event completion and organiser confirmation.
            </p>
          </div>

          <div className="bank-form-section">
            <h3>Bank Details</h3>

            <div className="bank-field">
              <label>Select State of Residency</label>
              <div className="bank-select-wrapper">
                <select value={state} onChange={(e) => setState(e.target.value)}>
                  <option value=""></option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Kano">Kano</option>
                </select>
                <FiChevronDown className="bank-select-icon" />
              </div>
            </div>

            <div className="bank-field">
              <label>Select Bank</label>
              <div className="bank-select-wrapper">
                <select value={bank} onChange={(e) => setBank(e.target.value)}>
                  <option value=""></option>
                  <option value="GTBank">GTBank</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="UBA">UBA</option>
                  <option value="First Bank">First Bank</option>
                </select>
                <FiChevronDown className="bank-select-icon" />
              </div>
            </div>

            <div className="bank-field">
              <label>Enter Account Number</label>
              <input 
                type="text" 
                placeholder="Your account with same name on ID"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                maxLength="10"
              />
            </div>
          </div>
        </div>

        <div className="bank-modal-footer">
          <button className="bank-btn-text" onClick={()=> navigate("/")}>
            Skip for Now
          </button>
          <div className="bank-footer-actions">
            <button className="bank-btn-secondary" onClick={onBack}>
              Back
            </button>
            <button 
              className="bank-btn-primary" 
              onClick={handleContinue}
              disabled={!state || !bank || !accountNumber}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankStep;