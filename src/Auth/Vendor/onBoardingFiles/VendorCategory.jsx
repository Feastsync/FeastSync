import { useState, useEffect } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { message } from "antd";
import "./css/VendorCategory.css";

const categories = [
  {
    id: "dj",
    name: "DJ",
    desc: "Professional music mixing for events and parties",
  },
  {
    id: "liveband",
    name: "Liveband",
    desc: "Live musical performances for weddings and events",
  },
  {
    id: "mc",
    name: "MC",
    desc: "Master of ceremonies to host and coordinate events",
  },
  {
    id: "photographer",
    name: "Photographer",
    desc: "Capture memorable moments with professional photography",
  },
  {
    id: "videographer",
    name: "Videographer",
    desc: "Record and produce high-quality event videos",
  },
];

const CategoryStep = ({
  onNext,
  onBack,
  percentComplete = 20,
  selectedCategory,
  setSelectedCategory,
  setProfileData,
}) => {
  const [localSelected, setLocalSelected] = useState(selectedCategory || null);

  useEffect(() => {
    setLocalSelected(selectedCategory || null);
  }, [selectedCategory]);

  const handleSelect = (value) => {
    setLocalSelected(value);
    if (setSelectedCategory) setSelectedCategory(value);
    if (setProfileData) {
      setProfileData((prev) => ({ ...prev, category: value }));
    }
  };

  const handleContinue = () => {
    if (!localSelected) {
      return message.warning("Please select a category before continuing.");
    }
    if (setSelectedCategory) setSelectedCategory(localSelected);
    if (setProfileData) {
      setProfileData((prev) => ({ ...prev, category: localSelected }));
    }
    onNext();
  };

  return (
    <div className="ds-modal">
      <div className="ds-header">
        <div className="ds-header-top">
          <div>
            <h2>Vendor Category</h2>
            <p className="ds-subtext">Select what best describes your service</p>
          </div>
        </div>

        <div className="ds-progress-bar">
          <div className="ds-progress-fill" style={{ width: `${percentComplete}%` }} />
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
              className={`ds-category-row ${localSelected === cat.id ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="vendor-category"
                value={cat.id}
                checked={localSelected === cat.id}
                onChange={() => handleSelect(cat.id)}
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
        <div className="ds-footer-right">
          <button
            className="ds-btn-back"
            onClick={onBack}
            disabled={true}
            style={{ opacity: 0.3, cursor: "not-allowed" }}
          >
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