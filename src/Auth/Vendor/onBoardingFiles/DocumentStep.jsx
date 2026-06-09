import React, { useState } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import "./css/DocumentStep.css";
import { useNavigate } from "react-router-dom";

const DocumentStep = ({ onNext, onBack, onSkip, percentComplete = 80 }) => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
   const navigate = useNavigate()
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  return (
    <div className="ds-overlay">
      <div className="ds-modal">

        <div className="ds-header">
          <div className="ds-header-top">
            <div>
              <h2>Document Verification</h2>
              <p className="ds-subtext">Upload proof of identity</p>
            </div>
            <button className="ds-close" onClick={onSkip}>
              <FiX size={22} />
            </button>
          </div>
          <div className="ds-progress-bar">
            <div className="ds-progress-fill" style={{ width: `${percentComplete}%` }} />
          </div>
        </div>

        <div className="ds-body">
          <p className="ds-instruction">
            Upload either Driver's licence, Voters Card or NIN only
          </p>

          <div className="ds-upload-section">
            <h3>Upload file</h3>
            <p className="ds-upload-hint">Drag and drop to upload files instantly.</p>

            <div
              className={`ds-dropzone ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("ds-file-input").click()}
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
              {file ? (
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
          <button className="ds-btn-skip" onClick={()=> navigate("/")}>Skip for Now</button>
          <div className="ds-footer-right">
            <button className="ds-btn-back" onClick={onBack}>Back</button>
            <button className="ds-btn-upload" onClick={onNext}>Upload</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DocumentStep;