import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { message, notification } from "antd";
import { createPricing, getAllPricing } from "../../../Redux/features/authslice";
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
      return message.warning("Please fill in all fields before saving.");
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
        description: error || "Unable to save package. Please try again.",
        placement: "topRight",
      });
    }
  };

  const handleContinue = () => {
    const savedNames = (pricingPackages || []).map((pkg) =>
      (pkg.packageName || pkg.pacakageName || "").toLowerCase()
    );

    const requiredPackages = ["basic", "standard", "premium"];
    
    const missingPackages = requiredPackages.filter(
      (pkg) => !savedNames.includes(pkg)
    );

    if (missingPackages.length > 0) {
      const formattedMissing = missingPackages
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(", ");
        
      return message.warning(
        `Kindly fill in all packages. Missing: ${formattedMissing}`
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
            <p className="ps-subtext">Set your three (3) starting prices</p>
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

        {/* Visual List of Saved Packages */}
        {pricingPackages && pricingPackages.length > 0 && (
          <div className="ps-saved-list" style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px dashed #e8e8e8" }}>
            <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#333" }}>Saved Packages ({pricingPackages.length}/3)</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {pricingPackages.map((pkg, idx) => {
                const name = pkg.packageName || pkg.pacakageName || "";
                const price = pkg.packagePrice || "";
                return (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "6px", border: "1px solid #eee" }}>
                    <div>
                      <strong style={{ textTransform: "capitalize", fontSize: "13px" }}>{name} Package</strong>
                      <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#666", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "250px" }}>{pkg.packageDescription}</p>
                    </div>
                    <span style={{ fontWeight: "600", color: "#1890ff", fontSize: "13px" }}>₦{Number(price).toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="ps-footer">
        <div className="ps-footer-left">
          <button className="ps-btn-save" onClick={handleSave}>
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
