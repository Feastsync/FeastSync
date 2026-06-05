import React, { useState } from "react";
import WelcomeModal from "./WelcomeModal.jsx";
import ChecklistModal from "./ChecklistModal.jsx";
import BankStep from "./BankStep.jsx";
import MediaStep from "./MediaStep.jsx";
import PricingStep from "./PricingStep.jsx";
import DocumentStep from "./DocumentStep.jsx";
import CalendarStep from "./CalendarStep.jsx";
import SuccessModal from "./SuccessModal.jsx";

const VendorOnboarding = ({ isOpen, onClose, vendorName }) => {
  const [currentStep, setCurrentStep] = useState("welcome");
  const [completedSteps, setCompletedSteps] = useState({
    bank: false,
    media: false,
    pricing: false,
    docs: false,
    calendar: false,
  });

  if (!isOpen) return null;

  const completeStep = (stepName) => {
    setCompletedSteps((prev) => ({ ...prev, [stepName]: true }));
    const order = ["bank", "media", "pricing", "docs", "calendar"];
    const nextIndex = order.indexOf(stepName) + 1;
    if (nextIndex < order.length) {
      setCurrentStep(order[nextIndex]);
    } else {
      setCurrentStep("success");
    }
  };

  const steps = {
    welcome: (
      <WelcomeModal
        vendorName={vendorName}
        onContinue={() => setCurrentStep("checklist")}
        onSkip={onClose}
      />
    ),
    checklist: (
      <ChecklistModal
        onStart={() => setCurrentStep("bank")}
        onLater={onClose}
        completedSteps={completedSteps}
        percentComplete={0}
      />
    ),
    bank: (
      <BankStep
        onNext={() => completeStep("bank")}
        onBack={() => setCurrentStep("checklist")}
        onSkip={() => setCurrentStep("media")}
      />
    ),
    media: (
      <MediaStep
        onNext={() => completeStep("media")}
        onBack={() => setCurrentStep("bank")}
        onSkip={() => setCurrentStep("pricing")}
      />
    ),
    pricing: (
      <PricingStep
        onNext={() => completeStep("pricing")}
        onBack={() => setCurrentStep("media")}
        onSkip={() => setCurrentStep("docs")}
      />
    ),
    docs: (
      <DocumentStep
        onNext={() => completeStep("docs")}
        onBack={() => setCurrentStep("pricing")}
        onSkip={() => setCurrentStep("calendar")}
      />
    ),
    calendar: (
      <CalendarStep
        onNext={() => completeStep("calendar")}
        onBack={() => setCurrentStep("docs")}
        onSkip={onClose}
      />
    ),
    success: (
      <SuccessModal onClose={onClose} />
    ),
  };

  return steps[currentStep] || null;
};

export default VendorOnboarding;