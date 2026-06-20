import "./css/IncompleteBanner.css";
import warning from "../../../assets/logos/Icomplete.png";

const IncompleteBanner = ({ onComplete, percentComplete = 25 }) => {
  return (
    <div className="ib-banner">
      <div className="ib-title-row">
        <img className="ib-icon" src={warning} alt="" />
        <h4>Profile Incomplete ({percentComplete}% Complete)</h4>
      </div>

      <p>
        Your profile is not yet complete. Complete all required sections to
        start receiving bookings and unlock all vendor <br />
        features.
      </p>

      <div className="ib-progress-bar">
        <div
          className="ib-progress-fill"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      <button className="ib-btn" onClick={onComplete}>
        Complete Your Profile <span>→</span>
      </button>
    </div>
  );
};

export default IncompleteBanner;