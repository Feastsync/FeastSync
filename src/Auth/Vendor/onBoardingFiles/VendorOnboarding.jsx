import React, { useState } from "react";
import "./css/VendorOnboarding.css";
import IncompleteBanner from "./IncompleteBanner.jsx";
import ChecklistModal from "./ChecklistModal.jsx";
import BankStep from "./BankStep.jsx";
import MediaStep from "./MediaStep.jsx";
import PricingStep from "./PricingStep.jsx";
import DocumentStep from "./DocumentStep.jsx";
import CalendarStep from "./CalendarStep.jsx";
import SuccessModal from "./SuccessModal.jsx";

const VendorOnboarding = ({ isOpen, onClose, vendorName }) => {
  const [currentStep, setCurrentStep] = useState("incomplete");

  const [completedSteps, setCompletedSteps] = useState({
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
    incomplete: (
      <IncompleteBanner
        onComplete={() => setCurrentStep("checklist")}
        percentComplete={percentComplete}
      />
    ),

    checklist: (
      <ChecklistModal
        onStart={() => setCurrentStep("bank")}
        onLater={onClose}
        completedSteps={completedSteps}
        percentComplete={percentComplete}
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

    success: <SuccessModal onClose={onClose} />,
  };

  return (
    <div className="vo-overlay">
      <div className="vo-modal-container">{steps[currentStep]}</div>
    </div>
  );
};

export default VendorOnboarding;
