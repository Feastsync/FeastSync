import React, { useState } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";
import { message } from "antd";
import "./css/PricingStep.css";

const PricingStep = ({
  onNext,
  onBack,
  onSkip,
  percentComplete = 75,
  profileData,
  setProfileData,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pricing = profileData?.pricing || {
    startingPrice: "",
    packageName: "",
    packageDescription: "",
  };

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
     ...prev,
      pricing: {
       ...prev.pricing,
        [field]: value,
      },
    }));
  };

  const handleContinue = async () => {
    if (
     !pricing.startingPrice ||
     !pricing.packageName ||
     !pricing.packageDescription
    ) {
      return message.warning("Please fill in all fields before continuing.");
    }

    setIsSubmitting(true);

    const sanitizedPrice = pricing.startingPrice.replace(/,/g, "").trim();

    setProfileData((prev) => ({
     ...prev,
      pricing: {
       ...prev.pricing,
        startingPrice: sanitizedPrice,
      },
    }));

    setIsSubmitting(false);
    onNext(); 
  };


  const handleBack = () => {
    onBack(); 
  };

 
  const handleSkip = () => {
    onSkip(); 
  };

  return (
    <div className="ps-modal">
      <div className="ps-header">
        <div className="ps-header-top">
          <div>
            <h2>Pricing & Packages</h2>
            <p className="ps-subtext">Set your starting price</p>
          </div>

          <button className="ps-close" onClick={handleSkip}>
            <FiX size={22} />
          </button>
        </div>

        <div className="ps-progress-bar">
          <div
            className="ps-progress-fill"
            style={{ width: `${percentComplete}%` }}
          />
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
              value={pricing.startingPrice}
              onChange={(e) =>
                handleChange("startingPrice", e.target.value)
              }
            />
          </div>
        </div>

        <div className="ps-field">
          <label>Package Name</label>
          <div className="ps-select-wrap">
            <select
              value={pricing.packageName}
              onChange={(e) =>
                handleChange("packageName", e.target.value)
              }
            >
              <option value="">Select package</option>
              <option value="basic">Basic Package</option>
              <option value="standard">Standard Package</option>
              <option value="premium">Premium Package</option>
            </select>

            <FiChevronDown className="ps-select-icon" />
          </div>
        </div>

        <div className="ps-field">
          <label>Package Description</label>
          <textarea
            rows={5}
            placeholder="What’s included..."
            value={pricing.packageDescription}
            onChange={(e) =>
              handleChange("packageDescription", e.target.value)
            }
          />
        </div>
      </div>

      <div className="ps-footer">
        <button className="ps-btn-skip" onClick={handleSkip}>
          Skip for Now
        </button>

        <div className="ps-footer-right">
          <button className="ps-btn-back" onClick={handleBack}>
            Back
          </button>

          <button
            className="ps-btn-continue"
            onClick={handleContinue}
            disabled={isSubmitting}
          >
            {isSubmitting? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;