import React, { useState } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";
import "./css/PricingStep.css";
import { useNavigate } from "react-router-dom";

const PricingStep = ({ onNext, onBack, onSkip, percentComplete = 60 }) => {
  const nav = useNavigate()
  const [startingPrice, setStartingPrice] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");

  return (
    <div className="ps-overlay">
      <div className="ps-modal">

        <div className="ps-header">
          <div className="ps-header-top">
            <div>
              <h2>Pricing & Packages</h2>
              <p className="ps-subtext">Set your start price</p>
            </div>
            <button className="ps-close" onClick={onSkip}>
              <FiX size={22} />
            </button>
          </div>
          <div className="ps-progress-bar">
            <div className="ps-progress-fill" style={{ width: `${percentComplete}%` }} />
          </div>
        </div>

        <div className="ps-body">
          <div className="ps-field">
            <label>Starting Price</label>
            <div className="ps-input-prefix-wrap">
              <span className="ps-prefix">₦</span>
              <input
                type="text"
                placeholder="50,000"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="ps-field">
            <label>Package Name</label>
            <div className="ps-select-wrap">
              <select
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
              >
                <option value="">Select package</option>
                <option value="basic">Basic Package</option>
                <option value="standard">Standard Package</option>
                <option value="premium">Premium Package</option>
                <option value="custom">Custom Package</option>
              </select>
              <FiChevronDown className="ps-select-icon" />
            </div>
          </div>

          <div className="ps-field">
            <label>Package Description</label>
            <textarea
              rows={5}
              placeholder="Whats included....."
              value={packageDescription}
              onChange={(e) => setPackageDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="ps-footer">
          <button className="ps-btn-skip" onClick={()=> nav("/")}>Skip for Now</button>
          <div className="ps-footer-right">
            <button className="ps-btn-back" onClick={onBack}>Back</button>
            <button className="ps-btn-continue" onClick={onNext}>Continue</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingStep;