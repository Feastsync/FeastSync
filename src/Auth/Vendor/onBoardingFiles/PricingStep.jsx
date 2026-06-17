import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { getAllPricing } from "../../../Redux/features/authslice";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import "./css/PricingStep.css";

const PricingStep = ({
  onNext,
  onBack,
  percentComplete = 80,
  profileData,
  setProfileData,
}) => {
  const dispatch = useDispatch();
  const { pricingPackages } = useSelector((s) => s.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    startingPrice = "",
    packageName = "",
    packageDescription = "",
  } = profileData?.pricing || {};

  useEffect(() => {
    dispatch(getAllPricing());
  }, [dispatch]);

  useEffect(() => {
    if (pricingPackages?.length > 0) {
      const existing = pricingPackages[0];
      setProfileData((prev) => ({
        ...prev,
        pricing: {
          startingPrice: existing.packagePrice?.toString() || "",
          packageName: existing.packageName || "",
          packageDescription: existing.packageDescription || "",
        },
      }));
    }
  }, [pricingPackages]);

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, [field]: value },
    }));
  };

  const handleContinue = async () => {
    if (!startingPrice || !packageName || !packageDescription) {
      return message.warning("Please fill in all fields before continuing.");
    }
    setIsSubmitting(true);
    const sanitizedPrice = startingPrice.replace(/,/g, "").trim();
    setProfileData((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, startingPrice: sanitizedPrice },
    }));
    setIsSubmitting(false);
    onNext({ sanitizedPrice });
  };

  return (
    <div className="ps-modal">
      <div className="ps-header">
        <div className="ps-header-top">
          <div>
            <h2>Pricing & Packages</h2>
            <p className="ps-subtext">Set your start price</p>
          </div>
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
              onChange={(e) => handleChange("startingPrice", e.target.value)}
            />
          </div>
        </div>

        <div className="ps-field">
          <label>Package Name</label>
          <div className="ps-select-wrap">
            <select
              value={packageName}
              onChange={(e) => handleChange("packageName", e.target.value)}
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
            placeholder="Whats included....."
            value={packageDescription}
            onChange={(e) => handleChange("packageDescription", e.target.value)}
          />
        </div>
      </div>

      <div className="ps-footer">
        <div className="ps-footer-right">
          <button className="ps-btn-back" onClick={onBack}>
            Back
          </button>
          <button
            className="ps-btn-continue"
            onClick={handleContinue}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;