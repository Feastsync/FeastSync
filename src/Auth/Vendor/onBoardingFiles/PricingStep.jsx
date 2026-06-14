import React, { useState, useEffect } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";
import {createPricing,getAllPricing,} from "../../../Redux/features/authslice";
import { useDispatch } from "react-redux";
import { message } from "antd";
import "./css/PricingStep.css";

const PricingStep = ({ onNext, onBack, onSkip, percentComplete = 60 }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPricing())
      .unwrap()
      .then((data) => {
        console.log("All Pricing:", data);
      })
      .catch((err) => {
        console.log("Pricing Error:", err);
      });
  }, [dispatch]);

  const [startingPrice, setStartingPrice] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!startingPrice || !packageName || !packageDescription) {
      return message.warning("Please fill in all fields before continuing.");
    }

    setIsSubmitting(true);

    const sanitizedPrice = startingPrice.replace(/,/g, "").trim();

    const result = await dispatch(
      createPricing({
        packagePrice: sanitizedPrice,
        packageDescription,
        packageName: packageName,
      })
    );

    setIsSubmitting(false);

    if (createPricing.fulfilled.match(result)) {
      message.success("Pricing package created successfully!");
      console.log("Created Pricing:", result.payload);
      onNext();
    } else {
      message.error(result.payload || "Pricing creation failed");
    }
  };

  return (
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
        <button className="ps-btn-skip" onClick={onSkip}>
          Skip for Now
        </button>

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