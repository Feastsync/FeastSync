import { useState } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import { message } from "antd";
import "./css/MediaStep.css";

const MediaStep = ({
  onNext,
  onBack,
  onSkip,
  percentComplete = 60,
  profileData,
  setProfileData,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const workExperience = profileData?.bio || "";
  const servicesOffered = profileData?.servicesOffered || "";
  const videoCatalogue = profileData?.videoCatalogue || [];
  const photoCatalogue = profileData?.photoCatalogue || [];

  const wordCount =
    workExperience.trim() === ""
     ? 0
      : workExperience.trim().split(/\s+/).length;

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
     ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (field, files, limit, maxSizeMB) => {
    const selected = Array.from(files).slice(0, limit);

    for (let file of selected) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        message.error(`${file.name} exceeds ${maxSizeMB}MB limit`);
        return;
      }
    }

    setProfileData((prev) => ({
     ...prev,
      [field]: selected,
    }));
  };

  const handleContinue = async () => {
    if (!workExperience.trim()) {
      message.warning("Work Experience is required");
      return;
    }

    if (wordCount > 500) {
      message.error("Work Experience must not exceed 500 words");
      return;
    }

    if (!servicesOffered.trim()) {
      message.warning("Services Offered is required");
      return;
    }

    if (!videoCatalogue || videoCatalogue.length === 0) {
      message.warning("Please upload at least one video");
      return;
    }

    if (!photoCatalogue || photoCatalogue.length === 0) {
      message.warning("Please upload at least one photo");
      return;
    }

    setIsSubmitting(true);
    await onNext();
    setIsSubmitting(false);
  };

  const handleBack = async () => {
    setIsSubmitting(true);
    await onBack();
    setIsSubmitting(false);
  };

  const handleSkip = async () => {
    setIsSubmitting(true);
    await onSkip();
    setIsSubmitting(false);
  };

  return (
    <div className="media-modal">
      <div className="media-header">
        <div className="media-header-top">
          <div>
            <h2>Media Uploads</h2>
            <p className="media-subtext">
              Showcase your expertise and previous work
            </p>
          </div>

          <button className="media-close" onClick={handleSkip} disabled={isSubmitting}>
            <FiX size={22} />
          </button>
        </div>

        <div className="media-progress-bar">
          <div
            className="media-progress-fill"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      <div className="media-body">
        <div className="media-field">
          <label>Work Experience (max. 500 words)</label>

          <textarea
            rows={6}
            placeholder="Describe your work experience, expertise, and achievements..."
            value={workExperience}
            onChange={(e) => handleChange("bio", e.target.value)}
          />
          <span className={`media-word-count ${wordCount > 500? "error" : ""}`}>
            {wordCount} / 500 words
          </span>
        </div>

        <div className="media-field">
          <label>Services Offered</label>

          <textarea
            rows={3}
            placeholder="List services offered"
            value={servicesOffered}
            onChange={(e) => handleChange("servicesOffered", e.target.value)}
          />
        </div>

        {/* VIDEO UPLOAD */}
        <div className="media-field">
          <label>Upload video catalog (Max of 2)</label>
          <div className="media-upload-box video">
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              multiple
              onChange={(e) =>
                handleFileChange("videoCatalogue", e.target.files, 2, 10)
              }
            />
            <FiUpload
              className="media-upload-files"
              size={28}
              style={{ cursor: "pointer" }}
              onClick={() => document.getElementById("video-upload").click()}
            />
            <p className="media-upload-title">Click to upload</p>
            <p className="media-upload-sub">Each video not more than 10MB</p>
            {videoCatalogue.length > 0 && (
              <div className="media-selected-files">
                <p className="media-file-count">
                  {videoCatalogue.length} / 2 videos selected
                </p>
                {videoCatalogue.map((file, index) => (
                  <p key={index}>{file.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        
        <div className="media-field">
          <label>Upload photo catalog (Max of 4)</label>
          <div className="media-upload-grid">
            <div className="media-upload-box photo">
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  handleFileChange("photoCatalogue", e.target.files, 4, 5)
                }
              />
              <FiUpload
                size={22}
                style={{ cursor: "pointer" }}
                onClick={() => document.getElementById("photo-upload").click()}
              />
              <p className="media-upload-title">Add more</p>
              {photoCatalogue.length > 0 && (
                <div className="media-selected-files">
                  {photoCatalogue.map((file, index) => (
                    <p key={index}>{file.name}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="media-upload-note">
            Each photo should not be more than 5MB
            {photoCatalogue.length > 0 && ` • ${photoCatalogue.length} / 4 selected`}
          </p>
        </div>
      </div>

   
      <div className="media-footer">
        <button
          className="media-btn-skip"
          onClick={handleSkip}
          disabled={isSubmitting}
        >
          Skip for Now
        </button>

        <div className="media-footer-right">
          <button
            className="media-btn-back"
            type="button"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            Back
          </button>

          <button
            className="media-btn-continue"
            type="button"
            onClick={handleContinue}
            disabled={isSubmitting ||!workExperience}
          >
            {isSubmitting? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaStep;