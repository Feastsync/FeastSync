import React, { useState } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import "./css/MediaStep.css";
import { useNavigate } from "react-router-dom";

const MediaStep = ({ onNext, onBack, onSkip, percentComplete = 40 }) => {
  const navigate = useNavigate()
  const [workExperience, setWorkExperience] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");
  const wordCount = workExperience.trim() === "" ? 0 : workExperience.trim().split(/\s+/).length;

  return (
    <div className="media-overlay">
      <div className="media-modal">

        <div className="media-header">
          <div className="media-header-top">
            <div>
              <h2>Media Uploads</h2>
              <p className="media-subtext">Showcase your expertise and previous work</p>
            </div>
            <button className="media-close" onClick={onSkip}>
              <FiX size={22} />
            </button>
          </div>
          <div className="media-progress-bar">
            <div className="media-progress-fill" style={{ width: `${percentComplete}%` }} />
          </div>
        </div>

        <div className="media-body">
          <div className="media-field">
            <label>Work Experience (min. 500 words)</label>
            <textarea
              rows={6}
              placeholder="Describe your work experience, expertise, and achievements..."
              value={workExperience}
              onChange={(e) => setWorkExperience(e.target.value)}
            />
            <span className="media-word-count">{wordCount} / 500 words</span>
          </div>

          <div className="media-field">
            <label>Services Offered</label>
            <textarea
              rows={3}
              placeholder="List services offered"
              value={servicesOffered}
              onChange={(e) => setServicesOffered(e.target.value)}
            />
          </div>

          <div className="media-field">
            <label>Upload video catalog ( Max of 2)</label>
            <div className="media-upload-box video">
              <FiUpload size={28} />
              <p className="media-upload-title">Click to upload</p>
              <p className="media-upload-sub">Each video not more than 10MB</p>
            </div>
          </div>

          <div className="media-field">
            <label>Upload photo catalog (Max of 4)</label>
            <div className="media-upload-grid">
              <div className="media-upload-box photo">
                <FiUpload size={22} />
                <p className="media-upload-title">Add more</p>
              </div>
            </div>
            <p className="media-upload-note">Each photo should not be more than 5mb</p>
          </div>
        </div>

        <div className="media-footer">
          <button className="media-btn-skip" onClick={()=> navigate("/")}>Skip for Now</button>
          <div className="media-footer-right">
            <button className="media-btn-back" onClick={onBack}>Back</button>
            <button className="media-btn-continue" onClick={onNext}>Continue</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MediaStep;