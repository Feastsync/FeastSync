import React, { useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import "./css/VendorCategory.css";

const categories = [
  { 
    id: "dj", 
    name: "DJs", 
    desc: "Professional music mixing for events and parties" 
  },
  { 
    id: "liveband", 
    name: "Livebands", 
    desc: "Live musical performances for weddings and events" 
  },
  { 
    id: "mc", 
    name: "MCs", 
    desc: "Master of ceremonies to host and coordinate events" 
  },
  { 
    id: "photographer", 
    name: "Photographers", 
    desc: "Capture memorable moments with professional photography" 
  },
  { 
    id: "videographer", 
    name: "Videographers", 
    desc: "Record and produce high-quality event videos" 
  },
];

const CategoryStep = ({
  onNext,
  onBack,
  onSkip,
  percentComplete = 20,
  selectedCategory,
  setSelectedCategory
}) => {
  const [localSelected, setLocalSelected] = useState(selectedCategory || null);

  const handleContinue = () => {
    if (localSelected) {
      setSelectedCategory(localSelected);
      onNext();
    }
  };

  return (
    <div className="ds-modal">
      <div className="ds-header">
        <div className="ds-header-top">
          <div>
            <h2>Vendor Category</h2>
            <p className="ds-subtext">Select what best describes your service</p>
          </div>
          <button className="ds-close" onClick={onSkip}>
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
          Choose one category. You can change this later in settings.
        </p>

        <div className="ds-category-list">
          {categories.map((cat) => (
            <label 
              key={cat.id} 
              className={`ds-category-row ${localSelected === cat.id ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="vendor-category"
                value={cat.id}
                checked={localSelected === cat.id}
                onChange={() => setLocalSelected(cat.id)}
                className="ds-category-input"
              />
              <span className="ds-category-checkbox">
                {localSelected === cat.id && <FiCheck size={14} strokeWidth={3} />}
              </span>
              <div className="ds-category-content">
                <span className="ds-category-title">{cat.name}</span>
                <span className="ds-category-desc">{cat.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="ds-footer">
        <button className="ds-btn-skip" onClick={onSkip}>
          Skip for Now
        </button>
        <div className="ds-footer-right">
          <button className="ds-btn-back" onClick={onBack}>
            Back
          </button>
          <button
            className="ds-btn-upload"
            onClick={handleContinue}
            disabled={!localSelected}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryStep;