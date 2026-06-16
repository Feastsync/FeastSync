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
  updateVendorInfo,
} from "../../../Redux/features/authslice.js";

const STEP_ORDER = ["category", "bank", "media", "pricing", "docs", "calendar"];

const STEP_MAP = {
  1: "category",
  2: "bank",
  3: "media",
  4: "pricing",
  5: "docs",
  6: "calendar",
  7: "completed",
};

const REVERSE_STEP_MAP = {
  category: 1,
  bank: 2,
  media: 3,
  pricing: 4,
  docs: 5,
  calendar: 6,
  completed: 7,
};

const VendorOnboarding = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { vendorInfo, isLoading } = useSelector((s) => s.auth);

  const vendorId = vendorInfo?.id || vendorInfo?._id || "";

  const onboardingStep = vendorInfo?.isOnboarded
    ? 7
    : vendorInfo?.onboardingStep || 1;
  const currentStep = STEP_MAP[onboardingStep] || "category";

  const completedSteps = {
    category: onboardingStep > 1,
    bank: onboardingStep > 2,
    media: onboardingStep > 3,
    pricing: onboardingStep > 4,
    docs: onboardingStep > 5,
    calendar: onboardingStep > 6,
  };

  const done = Object.values(completedSteps).filter(Boolean).length;
  const total = STEP_ORDER.length;
  const percentComplete = Math.round((done / total) * 100);

  const [showBanner, setShowBanner] = useState(true);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [isFinalSubmitting, setIsFinalSubmitting] = useState(false);

  // ── Ref to track if final submit is in progress ───────────────────
  // This prevents the useEffect from firing showSuccess prematurely
  const isFinalSubmitDone = useRef(false);

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

  // ── Sync vendorId into local profile state ────────────────────────
  useEffect(() => {
    if (vendorId && !vendorProfile.id) {
      setVendorProfile((prev) => ({ ...prev, id: vendorId }));
    }
  }, [vendorId, vendorProfile.id]);

  // ── Only show success after final submit fully completes ──────────
  useEffect(() => {
    if (
      isFinalSubmitDone.current &&
      (vendorInfo?.isOnboarded === true || vendorInfo?.onboardingStep === 7)
    ) {
      setShowSuccess(true);
    }
  }, [vendorInfo?.isOnboarded, vendorInfo?.onboardingStep]);

  if (!isOpen && !showSuccess) return null;

  // ── Go back without hitting the API ──────────────────────────────
  const goToStep = (stepName) => {
    dispatch(
      updateVendorInfo({
        onboardingStep: REVERSE_STEP_MAP[stepName],
        currentStep: stepName,
      })
    );
  };

  // ── Advance step and save progress to backend ─────────────────────
  const completeStep = async (stepName) => {
    // Don't allow step changes while final submit is running
    if (isFinalSubmitting) return;

    const nextIndex = STEP_ORDER.indexOf(stepName) + 1;
    const nextStepName =
      nextIndex < STEP_ORDER.length ? STEP_ORDER[nextIndex] : "completed";
    const nextStepNumber = REVERSE_STEP_MAP[nextStepName];

    try {
      const formData = new FormData();
      formData.append("onboardingStep", String(nextStepNumber));
      await dispatch(
        updateVendorProfile({ id: vendorId, profileData: formData })
      ).unwrap();
    } catch (e) {
      console.log("Failed to save step", e);
    }
  };

  // ── Final submit on calendar step ─────────────────────────────────
  const handleFinalSubmit = async () => {
    if (isFinalSubmitting) return;
    setSubmitError(null);
    setIsFinalSubmitting(true);
    isFinalSubmitDone.current = false;

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
      profileFormData.append(
        "bookedDays",
        JSON.stringify(vendorProfile.bookedDays)
      );

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

      const { startingPrice, packageName, packageDescription } =
        vendorProfile.pricing;
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
      isFinalSubmitDone.current = true;
      setShowSuccess(true);

} catch (err) {
  console.log("FULL ERROR:", JSON.stringify(err, null, 2));
  console.log("ERROR MESSAGE:", err?.message);
  console.log("ERROR PAYLOAD:", err?.payload || err?.data || err);
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
        onNext={() => completeStep("category")}
        onBack={() => {}}
        onSkip={() => completeStep("category")}
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
        onNext={() => completeStep("bank")}
        onBack={() => goToStep("category")}
        onSkip={() => completeStep("bank")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    media: (
      <MediaStep
        onNext={() => completeStep("media")}
        onBack={() => goToStep("bank")}
        onSkip={() => completeStep("media")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    pricing: (
      <PricingStep
        onNext={() => completeStep("pricing")}
        onBack={() => goToStep("media")}
        onSkip={() => completeStep("pricing")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    docs: (
      <DocumentStep
        onNext={() => completeStep("docs")}
        onBack={() => goToStep("pricing")}
        onSkip={() => completeStep("docs")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    calendar: (
      <CalendarStep
        onNext={handleFinalSubmit}
        onBack={() => goToStep("docs")}
        onSkip={onClose}
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