import { useState } from "react";
import { FiUpload, FiCheck } from "react-icons/fi";
import { message } from "antd";
import "./css/MediaStep.css";

const MediaStep = ({
  onNext,
  onBack,
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
    workExperience.trim() === "" ? 0 : workExperience.trim().split(/\s+/).length;

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

 const handleFileChange = (field, files, limit, maxSizeMB) => {
  const currentFiles = profileData?.[field] || [];
  const remainingSlots = limit - currentFiles.length;

  if (remainingSlots <= 0) {
    message.warning(`You have already reached the maximum limit of ${limit} files.`);
    return;
  }

  const newlySelected = Array.from(files).slice(0, remainingSlots);
  const validNewFiles = [];

  for (let file of newlySelected) {
    if (field === "videoCatalogue" && !file.type.startsWith("video/")) {
      message.error(`"${file.name}" is not a valid video file.`);
      continue;
    }

    if (field === "photoCatalogue" && !file.type.startsWith("image/")) {
      message.error(`"${file.name}" is not a valid image file.`);
      continue;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      message.error(`"${file.name}" exceeds the ${maxSizeMB}MB limit and was skipped.`);
      continue;
    }

    const isDuplicate = currentFiles.some(
      (f) => f.name === file.name && f.size === file.size
    );

    if (!isDuplicate) {
      validNewFiles.push(file);
    }
  }

  if (validNewFiles.length === 0) return;

  setProfileData((prev) => ({
    ...prev,
    [field]: [...(prev[field] || []), ...validNewFiles],
  }));
};

  const handleRemoveFile = (field, indexToRemove) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, index) => index !== indexToRemove),
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

  return (
    <div className="media-modal">
      <div className="media-header">
        <div className="media-header-top">
          <div>
            <h2>Media Uploads</h2>
            <p className="media-subtext">Showcase your expertise and previous work</p>
          </div>
        </div>
        <div className="media-progress-bar">
          <div className="media-progress-fill" style={{ width: `${percentComplete}%` }} />
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
          <span className={`media-word-count ${wordCount > 500 ? "error" : ""}`}>
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

        <div className="media-field">
        <label>Upload video catalog (Max of 2)</label>

      <div
          className="media-upload-box video"
          onClick={() => document.getElementById("video-upload").click()}
          style={{ cursor: "pointer" }}
        >
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            multiple
            style={{ display: "none" }}
            onChange={(e) =>
              handleFileChange("videoCatalogue", e.target.files, 2, 10)
            }
          />
      
          <FiUpload
            className="media-upload-files"
            size={28}
          />
      
          <p className="media-upload-title">Click to upload</p>
          <p className="media-upload-sub">Each video not more than 10MB</p>
          
          {videoCatalogue.length > 0 && (
            <div className="media-selected-files">
              <p className="media-file-count">
                {videoCatalogue.length} / 2 videos selected
              </p>
          
              {videoCatalogue.map((file, index) => (
                <div
                  key={index}
                  className="media-file-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    margin: "4px 0",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {file.name}
                  </p>
                  
                  <FiCheck
                    size={13}
                    style={{
                      cursor: "pointer",
                      color: "#330159",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile("videoCatalogue", index);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        </div>

        <div className="media-field">
  <label>Upload photo catalog (Max of 4)</label>

  <div className="media-upload-grid">
    <div
      className="media-upload-box photo"
      onClick={() => document.getElementById("photo-upload").click()}
      style={{ cursor: "pointer" }}
    >
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) =>
          handleFileChange("photoCatalogue", e.target.files, 4, 5)
        }
      />

      <FiUpload size={28} />

      <p className="media-upload-title">Add more</p>

      {photoCatalogue.length > 0 && (
        <div
          className="media-selected-files"
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          {photoCatalogue.map((file, index) => (
            <div
              key={index}
              className="media-file-item"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                margin: "4px 0",
              }}
            >
              <p
                style={{
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {file.name}
              </p>

              <FiCheck
                size={13}
                style={{
                  cursor: "pointer",
                  color: "#330159",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile("photoCatalogue", index);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  <p className="media-upload-note">
    Each photo should not be more than 5MB
    {photoCatalogue.length > 0 &&
      ` • ${photoCatalogue.length} / 4 selected`}
  </p>
</div>
      </div>

      <div className="media-footer">
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
            disabled={isSubmitting || !workExperience}
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaStep;