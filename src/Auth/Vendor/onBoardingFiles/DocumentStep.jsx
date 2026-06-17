import { useState } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import { message } from "antd";
import "./css/DocumentStep.css";

const DocumentStep = ({
  onNext,
  onBack,
  onSkip,
  percentComplete = 100,
  profileData,
  setProfileData,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const file = profileData?.document || null;

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(selectedFile.type)) {
      message.error("Only JPG, PNG, or PDF files are allowed");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      message.error("File must be less than 5MB");
      return;
    }

    setProfileData((prev) => ({
     ...prev,
      document: selectedFile,
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    handleFile(selected);
  };

  // 🔥 UPDATED: Now async so "Saving..." shows during Redux update
  const handleContinue = async () => {
    if (!file) {
      message.warning("Please upload a valid document");
      return;
    }

    setIsSubmitting(true);
    await onNext(); // Waits for completeStep("docs") -> onboardingStep: 5
    setIsSubmitting(false);
  };

  const handleBack = async () => {
    setIsSubmitting(true);
    await onBack(); // Waits for completeStep("pricing") -> onboardingStep: 4
    setIsSubmitting(false);
  };

  const handleSkip = async () => {
    setIsSubmitting(true);
    await onSkip(); // Waits for completeStep("docs") -> onboardingStep: 5
    setIsSubmitting(false);
  };

  return (
    <div className="ds-modal">
      <div className="ds-header">
        <div className="ds-header-top">
          <div>
            <h2>Document Verification</h2>
            <p className="ds-subtext">Upload proof of identity</p>
          </div>

          <button className="ds-close" onClick={handleSkip}>
            <FiX size={22} />
          </button>
        </div>

        <div className="ds-progress-bar">
          <div
            className="ds-progress-fill"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      <div className="ds-body">
        <p className="ds-instruction">
          Upload Driver’s Licence, Voter’s Card, or NIN
        </p>

        <div className="ds-upload-section">
          <h3>Upload file</h3>
          <p className="ds-upload-hint">
            Drag and drop or click to upload
          </p>

          <div
            className={`ds-dropzone ${
              dragOver? "drag-over" : ""
            } ${file? "has-file" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() =>
              document.getElementById("ds-file-input").click()
            }
          >
            <input
              id="ds-file-input"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <div className="ds-upload-icon">
              <FiUpload size={24} />
            </div>

            {file? (
              <p className="ds-file-name">{file.name}</p>
            ) : (
              <p className="ds-drop-text">
                Drag and drop file here or{" "}
                <span className="ds-choose">Choose file</span>
              </p>
            )}
          </div>

          <p className="ds-max-size">Maximum size: 5 MB</p>
        </div>
      </div>

      <div className="ds-footer">
        <button
          className="ds-btn-skip"
          onClick={handleSkip}
          disabled={isSubmitting}
        >
          Skip for Now
        </button>

        <div className="ds-footer-right">
          <button
            className="ds-btn-back"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            Back
          </button>

          <button
            className="ds-btn-upload"
            onClick={handleContinue}
            disabled={!file || isSubmitting}
          >
            {isSubmitting? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentStep;