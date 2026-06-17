import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/VendorOnboarding.css";

import IncompleteBanner from "./IncompleteBanner.jsx";
import ChecklistModal from "./ChecklistModal.jsx";
import CategoryStep from "./VendorCategory.jsx";
import BankStep from "./BankStep.jsx";
import MediaStep from "./MediaStep.jsx";
import PricingStep from "./PricingStep.jsx";
import DocumentStep from "./DocumentStep.jsx";
import CalendarStep from "./CalendarStep.jsx";
import SuccessModal from "./SuccessModal.jsx";

import {
  updateVendorProfile,
  createPricing,
  uploadKyc,
} from "../../../Redux/features/authslice.js";

const STEP_ORDER = ["category", "bank", "media", "pricing", "docs", "calendar"];

const VendorOnboarding = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { vendorInfo } = useSelector((s) => s.auth);

  const vendorId = vendorInfo?.id || vendorInfo?._id || "";

  const [currentStep, setCurrentStep] = useState("category");
  const [showBanner, setShowBanner] = useState(true);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [isFinalSubmitting, setIsFinalSubmitting] = useState(false);

  const completedSteps = {
    category: false,
    bank: false,
    media: false,
    pricing: false,
    docs: false,
    calendar: false,
  };

  const done = Object.values(completedSteps).filter(Boolean).length;
  const total = STEP_ORDER.length;
  const percentComplete = Math.round((done / total) * 100);

  const [vendorProfile, setVendorProfile] = useState({
    id: vendorId,
    category: "",
    stateOfResidence: "",
    bankName: "",
    accountNumber: "",
    bio: "",
    servicesOffered: "",
    profilePicture: null,
    coverPhoto: null,
    coverVideo: null,
    photoCatalogue: [],
    videoCatalogue: [],
    pricing: {
      startingPrice: "",
      packageName: "",
      packageDescription: "",
    },
    document: null,
    availability: { bookedDays: [] },
    bookedDays: [],
  });

  useEffect(() => {
    if (vendorId && !vendorProfile.id) {
      setVendorProfile((prev) => ({ ...prev, id: vendorId }));
    }
  }, [vendorId, vendorProfile.id]);

  if (!isOpen && !showSuccess) return null;

  const goToNext = (stepName) => {
    const nextIndex = STEP_ORDER.indexOf(stepName) + 1;
    if (nextIndex < STEP_ORDER.length) {
      setCurrentStep(STEP_ORDER[nextIndex]);
    }
  };

  const goToPrev = (stepName) => {
    const prevIndex = STEP_ORDER.indexOf(stepName) - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEP_ORDER[prevIndex]);
    }
  };

  const handleFinalSubmit = async () => {
    if (isFinalSubmitting) return;
    setSubmitError(null);
    setIsFinalSubmitting(true);

    try {
      const id = vendorProfile.id || vendorId;

      const profileFormData = new FormData();
      profileFormData.append("stateOfResidence", vendorProfile.stateOfResidence);
      profileFormData.append("bankName", vendorProfile.bankName);
      profileFormData.append("accountNumber", vendorProfile.accountNumber);
      profileFormData.append("bio", vendorProfile.bio);
      profileFormData.append("servicesOffered", vendorProfile.servicesOffered);
      profileFormData.append("category", vendorProfile.category);
      profileFormData.append("isOnboarded", "true");
      profileFormData.append("onboardingStep", "7");
      profileFormData.append("isProfileCompleted", "true");
      profileFormData.append("bookedDays", JSON.stringify(vendorProfile.bookedDays));

      if (vendorProfile.profilePicture) {
        profileFormData.append("profilePicture", vendorProfile.profilePicture);
      }
      if (vendorProfile.coverPhoto) {
        profileFormData.append("coverPhoto", vendorProfile.coverPhoto);
      }
      if (vendorProfile.coverVideo) {
        profileFormData.append("coverVideo", vendorProfile.coverVideo);
      }
      vendorProfile.photoCatalogue.forEach((f) =>
        profileFormData.append("photoCatalogue", f)
      );
      vendorProfile.videoCatalogue.forEach((f) =>
        profileFormData.append("videoCatalogue", f)
      );

      await dispatch(
        updateVendorProfile({ id, profileData: profileFormData })
      ).unwrap();

      const { startingPrice, packageName, packageDescription } = vendorProfile.pricing;
      if (startingPrice && packageName) {
        await dispatch(
          createPricing({
            packagePrice: startingPrice,
            packageName,
            pacakageName: packageName,
            packageDescription,
          })
        ).unwrap();
      }

      if (vendorProfile.document) {
        try {
          const kycForm = new FormData();
          kycForm.append("documentImage", vendorProfile.document);
          await dispatch(uploadKyc(kycForm)).unwrap();
        } catch (kycErr) {
          console.log("KYC failed but continuing:", kycErr);
        }
      }

      setShowSuccess(true);
    } catch (err) {
      console.log("FULL ERROR:", JSON.stringify(err, null, 2));
      setSubmitError(
        typeof err === "string" ? err : "Something went wrong. Please try again."
      );
    } finally {
      setIsFinalSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="vo-overlay">
        <div className="vo-modal-container">
          <SuccessModal
            onClose={() => {
              setShowSuccess(false);
              onClose();
            }}
            selectedCategory={selectedCategory || vendorInfo?.category}
          />
        </div>
      </div>
    );
  }

  if (showBanner && !vendorInfo?.isOnboarded) {
    if (showChecklist) {
      return (
        <div className="vo-overlay">
          <div className="vo-modal-container">
            <ChecklistModal
              onStart={() => {
                setShowChecklist(false);
                setShowBanner(false);
              }}
              onLater={onClose}
              completedSteps={completedSteps}
              percentComplete={percentComplete}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="profile-modal-overlay">
        <IncompleteBanner
          onComplete={() => setShowChecklist(true)}
          percentComplete={percentComplete}
        />
      </div>
    );
  }

  const steps = {
    category: (
      <CategoryStep
        onNext={() => goToNext("category")}
        onBack={() => {}}
        percentComplete={percentComplete}
        selectedCategory={selectedCategory}
        setSelectedCategory={(value) => {
          setSelectedCategory(value);
          setVendorProfile((prev) => ({ ...prev, category: value }));
        }}
        setProfileData={setVendorProfile}
      />
    ),

    bank: (
      <BankStep
        onNext={() => goToNext("bank")}
        onBack={() => goToPrev("bank")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    media: (
      <MediaStep
        onNext={() => goToNext("media")}
        onBack={() => goToPrev("media")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    pricing: (
      <PricingStep
        onNext={(pricingOverride) => {
          if (pricingOverride?.sanitizedPrice) {
            setVendorProfile((prev) => ({
              ...prev,
              pricing: { ...prev.pricing, startingPrice: pricingOverride.sanitizedPrice },
            }));
          }
          goToNext("pricing");
        }}
        onBack={() => goToPrev("pricing")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    docs: (
      <DocumentStep
        onNext={() => goToNext("docs")}
        onBack={() => goToPrev("docs")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    calendar: (
      <CalendarStep
        onNext={handleFinalSubmit}
        onBack={() => goToPrev("calendar")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
        isLoading={isFinalSubmitting}
        error={submitError}
      />
    ),
  };

  return (
    <div className="vo-overlay">
      <div className="vo-modal-container">{steps[currentStep]}</div>
    </div>
  );
};

export default VendorOnboarding;