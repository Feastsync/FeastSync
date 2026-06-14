import React from "react";
import { FiX, FiChevronDown } from "react-icons/fi";
import "./css/BankStep.css";

const nigerianBanks = [
  "AB Microfinance Bank",
  "Access Bank",
  "Accion MFB",
  "Addosser Microfinance Bank",
  "ALAT by Wema",
  "Carbon",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Eyowo",
  "FairMoney MFB",
  "FCMB",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "Fina Trust MFB",
  "Globus Bank",
  "GoMoney",
  "GTBank",
  "Heritage Bank",
  "Jaiz Bank",
  "Keystone Bank",
  "Kuda Bank",
  "LAPO Microfinance Bank",
  "Lotus Bank",
  "Mintyn Bank",
  "Mkobo MFB",
  "Moniepoint MFB",
  "OPay",
  "Optimus Bank",
  "PalmPay",
  "Parallex Bank",
  "Polaris Bank",
  "Premium Trust Bank",
  "Providus Bank",
  "Rubies MFB",
  "Sparkle",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "SunTrust Bank",
  "TAJ Bank",
  "Titan Trust Bank",
  "UBA",
  "Union Bank",
  "Unity Bank",
  "VFD Microfinance Bank",
  "Wema Bank",
  "Zenith Bank",
].sort();

const BankStep = ({
 onNext,
  onBack,
  onSkip,
  percentComplete = 40,
  profileData,
  setProfileData,
}) => {
  const accountNumberRegex = /^[0-9]{10}$/;

  const isFormValid =
    profileData.stateOfResidence.trim() !== "" &&
    profileData.bankName.trim() !== "" &&
    accountNumberRegex.test(profileData.accountNumber);

  const handleContinue = () => {
    if (!isFormValid) return;
    onNext?.();
  };

  return (
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
            Account name must match the name on your ID exactly. Payouts follow
            the 70/30 escrow split — 30% released 24 hours after event
            completion and organiser confirmation.
          </p>
        </div>

        <div className="bank-form-section">
          <h3>Bank Details</h3>

          <div className="bank-field">
            <label>State of Residence</label>

            <input
              type="text"
              placeholder="Enter your state of residence"
              value={profileData.stateOfResidence}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  stateOfResidence: e.target.value,
                }))
              }
            />
          </div>

          <div className="bank-field">
            <label>Select Bank</label>

            <div className="bank-select-wrapper">
              <select
                value={profileData.bankName}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    bankName: e.target.value,
                  }))
                }
              >
                <option value="">Select your bank</option>

                {nigerianBanks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>

              <FiChevronDown className="bank-select-icon" />
            </div>
          </div>

          <div className="bank-field">
            <label>Enter Account Number</label>

            <input
              type="text"
              placeholder="Enter your 10-digit account number"
              value={profileData.accountNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 10) {
                  setProfileData((prev) => ({
                    ...prev,
                    accountNumber: value,
                  }));
                }
              }}
              maxLength={10}
            />

            {profileData.accountNumber &&
              profileData.accountNumber.length !== 10 && (
                <small
                  style={{
                    color: "red",
                    display: "block",
                    marginTop: "5px",
                  }}
                >
                  Account number must be exactly 10 digits
                </small>
              )}
          </div>
        </div>
      </div>

      <div className="bank-modal-footer">
        <button className="bank-btn-text" onClick={onSkip}>
          Skip for Now
        </button>

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