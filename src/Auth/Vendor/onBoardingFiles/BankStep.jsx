import React from "react";
import { FiChevronDown } from "react-icons/fi";
import "./css/BankStep.css";
import { nigerianBanks } from "../../../mock/moc";

const BankStep = ({
  onNext,
  onBack,
  percentComplete = 40,
  profileData,
  setProfileData,
}) => {
  const safeProfile = profileData || {};
  const accountNumberRegex = /^[0-9]{10}$/;

  const updateField = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

const isFormValid =
  (safeProfile.stateOfResidence || "").trim() !== "" &&
  (safeProfile.bankCode || "").trim() !== "" &&
  accountNumberRegex.test(safeProfile.accountNumber || "");

  const handleContinue = () => {
    if (!isFormValid) return;
    setProfileData((prev) => ({
      ...prev,
      stateOfResidence: prev.stateOfResidence || "",
      bankName: prev.bankName || "",
      accountNumber: prev.accountNumber || "",
    }));
    onNext();
  };

  return (
    <div className="bank-modal">
      <div className="bank-modal-header">
        <div className="bank-header-top">
          <h2>Bank Information</h2>
        </div>
        <p className="bank-subtext">Add your bank details for secure payouts</p>
        <div className="bank-progress-bar">
          <div className="bank-progress-fill" style={{ width: `${percentComplete}%` }} />
        </div>
      </div>

      <div className="bank-modal-body">
        <div className="bank-warning">
          <div className="bank-warning-bar"></div>
          <p>
            Ensure your account name matches your ID. Payouts follow the 70/30
            escrow system.
          </p>
        </div>

        <div className="bank-form-section">
          <h3>Bank Details</h3>

          <div className="bank-field">
            <label>State of Residence</label>
            <input
              type="text"
              placeholder="Enter your state of residence"
              value={safeProfile.stateOfResidence || ""}
              onChange={(e) => updateField("stateOfResidence", e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
            />
          </div>

<div className="bank-field">
  <label>Select Bank</label>
  <div className="bank-select-wrapper">
    <select
      value={safeProfile.bankCode || ""}
      onChange={(e) => {
        const selected = nigerianBanks.find(b => b.code === e.target.value);
        setProfileData((prev) => ({
          ...prev,
          bankName: selected?.name || "",
          bankCode: selected?.code || "",
        }));
      }}
    >
      <option value="">Select your bank</option>
      {nigerianBanks.map((bank) => (
        <option key={bank.code} value={bank.code}>{bank.name}</option>
      ))}
    </select>
    <FiChevronDown className="bank-select-icon" />
  </div>
</div>

          <div className="bank-field">
            <label>Account Number</label>
            <input
              type="text"
              placeholder="Enter your 10-digit account number"
              value={safeProfile.accountNumber || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) updateField("accountNumber", value);
              }}
              maxLength={10}
            />
            {safeProfile.accountNumber && safeProfile.accountNumber.length !== 10 && (
              <small style={{ color: "red", marginTop: "5px", display: "block" }}>
                Account number must be exactly 10 digits
              </small>
            )}
          </div>
        </div>
      </div>

      <div className="bank-modal-footer">
        <div className="bank-footer-actions">
          <button className="bank-btn-secondary" onClick={onBack}>
            Back
          </button>
          <button
            type="button"
            className="bank-btn-primary"
            onClick={handleContinue}
            disabled={!isFormValid}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankStep;