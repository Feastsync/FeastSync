import { useState, useEffect } from "react";
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

import { updateVendorProfile } from "../../../Redux/features/authslice.js"

const VendorOnboarding = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { vendorInfo } = useSelector((state) => state.auth);

  const [currentStep, setCurrentStep] = useState("incomplete");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // MAIN COLLECTED PAYLOAD
  const [vendorProfile, setVendorProfile] = useState({
    id: vendorInfo?._id || vendorInfo?.id || "",
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
  });

  // Ensure ID is synced if vendorInfo loads after component mounts
  useEffect(() => {
    if (vendorInfo && !vendorProfile.id) {
      setVendorProfile((prev) => ({
        ...prev,
        id: vendorInfo._id || vendorInfo.id,
      }));
    }
  }, [vendorInfo]);

  const [completedSteps, setCompletedSteps] = useState({
    category: false,
    bank: false,
    media: false,
    pricing: false,
    docs: false,
    calendar: false,
  });

  if (!isOpen) return null;

  const total = Object.keys(completedSteps).length;
  const done = Object.values(completedSteps).filter(Boolean).length;
  const percentComplete = total ? Math.round((done / total) * 100) : 0;

  // STEP NAVIGATION
  const completeStep = (stepName) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepName]: true,
    }));

    const order = ["category", "bank", "media", "pricing", "docs", "calendar"];

    const nextIndex = order.indexOf(stepName) + 1;

    if (nextIndex < order.length) {
      setCurrentStep(order[nextIndex]);
    } else {
      setCurrentStep("success");
    }
  };

  // FINAL SUBMIT (ONLY BACKEND CALL)
  const handleFinalSubmit = () => {
    const formData = new FormData();

    Object.entries(vendorProfile).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // Objects must be stringified for FormData, Files should stay as is
        if (
          typeof value === "object" &&
          !(value instanceof File) &&
          !Array.isArray(value)
        ) {
          formData.append(key, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          // Handle arrays if backend expects them (e.g., as JSON or multiple appends)
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    });

    dispatch(
      updateVendorProfile({
        id: vendorProfile.id,
        profileData: formData,
      }),
    );

    onClose?.();
  };

  const steps = {
    incomplete: (
      <IncompleteBanner
        onComplete={() => setCurrentStep("checklist")}
        percentComplete={percentComplete}
      />
    ),

    checklist: (
      <ChecklistModal
        onStart={() => setCurrentStep("category")}
        onLater={onClose}
        completedSteps={completedSteps}
        percentComplete={percentComplete}
      />
    ),

    category: (
      <CategoryStep
        onNext={() => completeStep("category")}
        onBack={() => setCurrentStep("checklist")}
        onSkip={() => setCurrentStep("bank")}
        percentComplete={percentComplete}
        selectedCategory={selectedCategory}
        setSelectedCategory={(value) => {
          setSelectedCategory(value);

          setVendorProfile((prev) => ({
            ...prev,
            category: value,
          }));
        }}
      />
    ),

    bank: (
      <BankStep
        onNext={() => completeStep("bank")}
        onBack={() => setCurrentStep("category")}
        onSkip={() => setCurrentStep("media")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    media: (
      <MediaStep
        onNext={() => completeStep("media")}
        onBack={() => setCurrentStep("bank")}
        onSkip={() => setCurrentStep("pricing")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    pricing: (
      <PricingStep
        onNext={() => completeStep("pricing")}
        onBack={() => setCurrentStep("media")}
        onSkip={() => setCurrentStep("docs")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    docs: (
      <DocumentStep
        onNext={() => completeStep("docs")}
        onBack={() => setCurrentStep("pricing")}
        onSkip={() => setCurrentStep("calendar")}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    calendar: (
      <CalendarStep
        onNext={() => completeStep("calendar")}
        onBack={() => setCurrentStep("docs")}
        onSkip={onClose}
        percentComplete={percentComplete}
        profileData={vendorProfile}
        setProfileData={setVendorProfile}
      />
    ),

    success: (
      <SuccessModal
        onClose={handleFinalSubmit}
        selectedCategory={selectedCategory}
      />
    ),
  };

  if (currentStep === "checklist") {
    return <div className="profile-modal-overlay">{steps[currentStep]}</div>;
  }

  return (
    <div className="vo-overlay">
      <div className="vo-modal-container">{steps[currentStep]}</div>
    </div>
  );
};

export default VendorOnboarding;
