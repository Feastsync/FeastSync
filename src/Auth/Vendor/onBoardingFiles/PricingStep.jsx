import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { message, notification } from "antd";
import { createPricing, getAllPricing} from "../../../Redux/features/authslice";
import { useDispatch, useSelector } from "react-redux";
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

  // useEffect(() => {
  //   if (pricingPackages?.length > 0) {
  //     const existing = pricingPackages[0];
  //     setProfileData((prev) => ({
  //       ...prev,
  //       pricing: {
  //         startingPrice: existing.packagePrice?.toString() || "",
  //         packageName: existing.packageName || "",
  //         packageDescription: existing.packageDescription || "",
  //       },
  //     }));
  //   }
  // }, [pricingPackages]);

  const handleChange = (field, value) => {
  setProfileData((prev) => ({
    ...prev,
    pricing: {
      ...prev.pricing,
      [field]: value,
    },
  }));
};


  const handleSave = async () => {
  const {
    startingPrice,
    packageName,
    packageDescription,
  } = profileData?.pricing || {};

  if (!startingPrice || !packageName || !packageDescription) {
    return message.warning(
      "Please fill in all fields before saving."
    );
  }

  const alreadyExists = pricingPackages?.some(
    (pkg) =>
      (pkg.packageName || pkg.pacakageName)?.toLowerCase() ===
      packageName.toLowerCase()
  );

  if (alreadyExists) {
    return notification.warning({
      message: "Package Already Added",
      description: `${packageName} package has already been added. Please select another package.`,
      placement: "topRight",
    });
  }

  try {
    await dispatch(
    createPricing({
      packagePrice: startingPrice,
      packageDescription,
      packageName,
    })
    ).unwrap();

    await dispatch(getAllPricing());

    notification.success({
      message: "Package Saved Successfully",
      description:
        packageName === "basic"
          ? "Basic Package has been saved successfully. Please select Standard Package next."
          : packageName === "standard"
          ? "Standard Package has been saved successfully. Please select Premium Package next."
          : "Premium Package has been saved successfully. You can now continue to the next step.",
      placement: "topRight",
      duration: 5,
    });

    setProfileData((prev) => ({
      ...prev,
      pricing: {
        startingPrice: "",
        packageName: "",
        packageDescription: "",
      },
    }));
  } catch (error) {
    notification.error({
      message: "Save Failed",
      description:
        error || "Unable to save package. Please try again.",
      placement: "topRight",
    });
  }
};

const handleContinue = () => {
  if (!pricingPackages?.length) {
    return message.warning(
      "Please save at least one package before continuing."
    );
  }

  setProfileData((prev) => ({
    ...prev,
    pricingPackages,
  }));

  onNext();
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
        <div className="ps-footer-left">
          <button className="ps-btn-save"
          onClick={handleSave}
          >
            Save
          </button>
        </div>
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