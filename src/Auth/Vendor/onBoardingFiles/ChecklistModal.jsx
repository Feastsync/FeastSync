import { FiX, FiSquare } from "react-icons/fi";
import "./css/ChecklistModal.css";

const ChecklistModal = ({ onStart, onLater, completedSteps, percentComplete = 0 }) => {
  const totalSteps = 6;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progress = (completedCount / totalSteps) * 100 || percentComplete;

  const checklistItems = [
    {
      id: "category",
      title: "Vendor Category",
      desc: "Select what best describes your service",
      done: completedSteps.category,
    },
    {
      id: "bank",
      title: "Bank information",
      desc: "Bank details and state of residence",
      done: completedSteps.bank,
    },
    {
      id: "media",
      title: "Portfolio & Gallery",
      desc: "Upload photos and videos of your work",
      done: completedSteps.media,
    },
    {
      id: "pricing",
      title: "Pricing & Packages",
      desc: "Set your pricing and service packages",
      done: completedSteps.pricing,
    },
    {
      id: "docs",
      title: "Verification Documents",
      desc: "Submit required documents for verification",
      done: completedSteps.docs,
    },
    {
      id: "calendar",
      title: "Availability Calendar",
      desc: "Configure your availability and booking preferences",
      done: completedSteps.calendar,
    },
  ];

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        <div className="profile-modal-header">
          <div className="profile-header-top">
            <h2>Complete Your Profile</h2>
            <button className="profile-close" onClick={onLater}>
              <FiX size={24} />
            </button>
          </div>

          <p className="profile-subtext">
            You need to complete your profile before accessing vendor features
          </p>

          <div className="profile-progress-row">
            <span className="profile-progress-label">Profile Completion</span>
            <span className="profile-progress-percent">{Math.round(progress)}%</span>
          </div>

          <div className="profile-progress-bar">
            <div
              className="profile-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="profile-modal-body">
          {checklistItems.map((item) => (
            <div key={item.id} className={`profile-item ${item.done ? "done" : ""}`}>
              <div className="profile-item-checkbox">
                {item.done ? (
                  <div className="profile-checkbox-checked">✓</div>
                ) : (
                  <FiSquare size={20} />
                )}
              </div>
              <div className="profile-item-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="profile-modal-footer">
          <div className="profile-footer-buttons">
            <button className="profile-btn-primary" onClick={onStart}>
              Complete Profile Now
            </button>
          </div>
          <p className="profile-footer-note">
            All sections must be completed to start receiving bookings
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChecklistModal;