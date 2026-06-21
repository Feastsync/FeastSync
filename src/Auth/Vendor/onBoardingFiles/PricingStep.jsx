import React, { useState, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
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
  const [touched, setTouched] = useState(false);

  const {
    startingPrice = "",
    packageName = "",
    packageDescription = "",
  } = profileData?.pricing || {};

  useEffect(() => {
    dispatch(getAllPricing());
  }, [dispatch]);

  const savedNames = (pricingPackages || []).map((pkg) =>
    (pkg.packageName || pkg.pacakageName || "").toLowerCase()
  );

  const hasAllPackages =
    savedNames.includes("basic package") &&
    savedNames.includes("standard package") &&
    savedNames.includes("premium package");

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
    setTouched(true);

    const {
      startingPrice,
      packageName,
      packageDescription,
    } = profileData?.pricing || {};

    if (!startingPrice && !packageName && !packageDescription) {
      return message.warning("Please fill in all fields before saving.");
    }
    if (!startingPrice) return message.warning("Please enter a price.");
    if (!packageName) return message.warning("Please select a package name.");
    if (!packageDescription) return message.warning("Please enter a package description.");

    const alreadyExists = pricingPackages?.some(
      (pkg) =>
        (pkg.packageName || pkg.pacakageName || "").toLowerCase() ===
        packageName.toLowerCase()
    );

    if (alreadyExists) {
      return notification.warning({
        message: "Package Already Added",
        description: `${packageName} has already been added. Please select another package.`,
        placement: "topRight",
      });
    }

    try {
      setIsSubmitting(true);
      await dispatch(
        createPricing({
          packagePrice: startingPrice,
          packageDescription,
          packageName,
        })
      ).unwrap();

      await dispatch(getAllPricing());

      setProfileData((prev) => ({
        ...prev,
        pricing: {
          startingPrice: "",
          packageName: "",
          packageDescription: "",
        },
      }));
      setTouched(false);

      const savedCount = (pricingPackages?.length || 0) + 1;

      if (savedCount === 1) {
        notification.success({
          message: "Basic Package Saved ✓",
          description: "Now please fill in and save your Standard Package.",
          placement: "topRight",
          duration: 5,
        });
      } else if (savedCount === 2) {
        notification.success({
          message: "Standard Package Saved ✓",
          description: "Almost there! Now fill in and save your Premium Package.",
          placement: "topRight",
          duration: 5,
        });
      } else if (savedCount >= 3) {
        notification.success({
          message: "All 3 Packages Saved! ✓",
          description: "You can now continue to the next step.",
          placement: "topRight",
          duration: 5,
        });
      }
    } catch (error) {
      notification.error({
        message: "Save Failed",
        description: error || "Unable to save package. Please try again.",
        placement: "topRight",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    const missingPackages = ["Basic Package", "Standard Package", "Premium Package"].filter(
      (pkg) => !savedNames.includes(pkg.toLowerCase())
    );

    if (missingPackages.length > 0) {
      return notification.warning({
        message: "Incomplete Packages",
        description: `You must save all 3 packages before continuing. Missing: ${missingPackages.join(", ")}`,
        placement: "topRight",
        duration: 6,
      });
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

        <div className="ps-package-steps">
          {["Basic Package", "Standard Package", "Premium Package"].map((pkg, i) => {
            const done = savedNames.includes(pkg.toLowerCase());
            return (
              <div key={pkg} className={`ps-package-step ${done ? "done" : ""}`}>
                <div className="ps-package-step-dot">
                  {done ? <FiCheck size={10} /> : i + 1}
                </div>
                <span>{pkg.replace(" Package", "")}</span>
              </div>
            );
          })}
        </div>

        <div className="ps-progress-bar">
          <div className="ps-progress-fill" style={{ width: `${percentComplete}%` }} />
        </div>
      </div>

      <div className="ps-body">
        <div className="ps-field">
          <label>Price</label>
          <div className={`ps-input-prefix-wrap ${touched && !startingPrice ? "ps-input-error" : ""}`}>
            <span className="ps-prefix">₦</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="50,000"
              value={startingPrice}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                handleChange("startingPrice", raw);
              }}
            />
          </div>
          {touched && !startingPrice && (
            <span className="ps-field-error">Price is required</span>
          )}
        </div>

        <div className="ps-field">
          <label>Package Name</label>
          <div className={`ps-select-wrap ${touched && !packageName ? "ps-input-error" : ""}`}>
            <select
              value={packageName}
              onChange={(e) => handleChange("packageName", e.target.value)}
            >
              <option value="">Select package</option>
              {["Basic Package", "Standard Package", "Premium Package"].map((pkg) => {
                const alreadySaved = savedNames.includes(pkg.toLowerCase());
                return (
                  <option key={pkg} value={pkg} disabled={alreadySaved}>
                    {pkg} {alreadySaved ? "✓" : ""}
                  </option>
                );
              })}
            </select>
            <FiChevronDown className="ps-select-icon" />
          </div>
          {touched && !packageName && (
            <span className="ps-field-error">Please select a package</span>
          )}
        </div>

        <div className="ps-field">
          <label>Package Description</label>
          <textarea
            rows={4}
            placeholder="What's included..."
            value={packageDescription}
            className={touched && !packageDescription ? "ps-textarea-error" : ""}
            onChange={(e) => handleChange("packageDescription", e.target.value)}
          />
          {touched && !packageDescription && (
            <span className="ps-field-error">Description is required</span>
          )}
        </div>

        {pricingPackages && pricingPackages.length > 0 && (
          <div className="ps-saved-list">
            <h4 className="ps-saved-title">
              Saved Packages ({pricingPackages.length}/3)
            </h4>
            <div className="ps-saved-items">
              {pricingPackages.map((pkg, idx) => {
                const name = pkg.packageName || pkg.pacakageName || "";
                const price = pkg.packagePrice || "";
                return (
                  <div key={idx} className="ps-saved-package-item">
                    <div>
                      <strong className="ps-saved-package-name">{name}</strong>
                      <p className="ps-saved-package-desc">{pkg.packageDescription}</p>
                    </div>
                    <span className="ps-saved-package-price">
                      ₦{Number(price).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="ps-footer">
        <div className="ps-footer-left">
          <button
            className={`ps-btn-save ${hasAllPackages ? "disabled-btn" : ""}`}
            onClick={handleSave}
            disabled={hasAllPackages || isSubmitting}
            title={hasAllPackages ? "All three packages have been added" : ""}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
        <div className="ps-footer-right">
          <button className="ps-btn-back" onClick={onBack}>
            Back
          </button>
          <button
            className={`ps-btn-continue ${!hasAllPackages ? "disabled-btn" : ""}`}
            onClick={handleContinue}
            disabled={!hasAllPackages}
            title={
              !hasAllPackages
                ? "Please save Basic, Standard and Premium packages before continuing"
                : ""
            }
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;