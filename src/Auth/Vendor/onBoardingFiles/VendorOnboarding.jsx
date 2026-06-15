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

import {
  updateVendorProfile,
  createPricing,
  uploadKyc,
} from "../../../Redux/features/authslice.js";

const STEP_ORDER = ["category", "bank", "media", "pricing", "docs", "calendar"];

const VendorOnboarding = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { vendorInfo, isLoading } = useSelector((s) => s.auth);

  const vendorId = vendorInfo?._id || vendorInfo?.id || "";

  const [currentStep, setCurrentStep] = useState("incomplete");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const [completedSteps, setCompletedSteps] = useState({
    category: false,
    bank: false,
    media: false,
    pricing: false,
    docs: false,
    calendar: false,
  });

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

  // Sync vendor id if it loads after mount
  useEffect(() => {
    if (vendorId && !vendorProfile.id) {
      setVendorProfile((prev) => ({...prev, id: vendorId }));
    }
  }, [vendorId]);

  // Auto close if already onboarded
  useEffect(() => {
    if (vendorInfo?.isOnboarded) {
      onClose?.();
    }
  }, [vendorInfo?.isOnboarded, onClose]);

  if (!isOpen) return null;

  const done = Object.values(completedSteps).filter(Boolean).length;
  const total = STEP_ORDER.length;
  const percentComplete = Math.round((done / total) * 100);

  const completeStep = (stepName) => {
    setCompletedSteps((prev) => ({...prev, [stepName]: true }));
    const nextIndex = STEP_ORDER.indexOf(stepName) + 1;
    if (nextIndex < STEP_ORDER.length) {
      setCurrentStep(STEP_ORDER[nextIndex]);
    } else {
      setCurrentStep("success");
    }
  };

  const handleFinalSubmit = async () => {
    setSubmitError(null);
    try {
      const id = vendorProfile.id || vendorId;
      console.log("vendorId:", id);
      console.log("vendorProfile:", vendorProfile);
      console.log("photoCatalogue:", vendorProfile.photoCatalogue);
      console.log("videoCatalogue:", vendorProfile.videoCatalogue);

      // 1. Update vendor profile (bank, media, category, calendar)
      const profileFormData = new FormData();
      profileFormData.append("stateOfResidence", vendorProfile.stateOfResidence);
      profileFormData.append("bankName", vendorProfile.bankName);
      profileFormData.append("accountNumber", vendorProfile.accountNumber);
      profileFormData.append("bio", vendorProfile.bio);
      profileFormData.append("servicesOffered", vendorProfile.servicesOffered);
      profileFormData.append("category", vendorProfile.category);

      profileFormData.append(
        "bookedDays",
        JSON.stringify(vendorProfile.bookedDays)
      );

      // Files
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

      // 2. Create pricing package — separate endpoint
      const { startingPrice, packageName, packageDescription } =
        vendorProfile.pricing;
      if (startingPrice && packageName) {
        await dispatch(
          createPricing({
            packagePrice: startingPrice,
            pacakageName: packageName,
            packageDescription,
          })
        ).unwrap();
      }

      // 3. Upload KYC document — separate endpoint
      if (vendorProfile.document) {
        const kycForm = new FormData();
        kycForm.append("documentImage", vendorProfile.document);
        await dispatch(uploadKyc(kycForm)).unwrap();
      }

      // Backend should return vendorInfo with isOnboarded: true
      // Redux will update and useEffect above will close modal
      onClose?.();

    } catch (err) {
      console.log("Submit done, onClose is:", onClose);
      setSubmitError(
        typeof err === "string"? err : "Something went wrong. Please try again."
      );
    }
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
          setVendorProfile((prev) => ({...prev, category: value }));
        }}
        setProfileData={setVendorProfile}
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
        isLoading={isLoading}
        error={submitError}
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