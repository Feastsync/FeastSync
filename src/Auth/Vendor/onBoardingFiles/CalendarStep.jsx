import React from "react";
import { IoClose } from "react-icons/io5";
import "./css/CalendarStep.css";

const CalendarStep = ({
  onNext,
  onBack,
  onSkip,
  profileData,
  setProfileData,
  percentComplete = 95,
}) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const bookedDays = profileData?.availability?.bookedDays || [];

  const toggleDay = (day) => {
    setProfileData((prev) => {
      const current = prev?.availability?.bookedDays || [];

      const updated = current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day];

      return {
        ...prev,

        // KEEP your structure (UI compatibility)
        availability: {
          ...prev.availability,
          bookedDays: updated,
        },

        // IMPORTANT: FLATTEN for backend (FormData safe)
        bookedDays: updated,
      };
    });
  };

  const handleContinue = () => {
    // ensure sync before next step
    setProfileData((prev) => ({
      ...prev,
      bookedDays: prev?.availability?.bookedDays || [],
    }));

    onNext();
  };

  return (
    <div className="cs-modal">
      <div className="cs-header">
        <div>
          <h2>Availability Calendar</h2>
          <p>Set your unavailable (booked) days for customers</p>

          <div className="cs-progress-bar">
            <div
              className="cs-progress-fill"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        <button className="cs-close" onClick={onSkip}>
          <IoClose size={24} />
        </button>
      </div>

      <div className="cs-body">
        <h3 className="cs-section-title">Select Booked Days</h3>
        <p className="cs-subtitle">
          White = available | Red = booked
        </p>

        <div className="cs-calendar-grid">
          {days.map((day) => {
            const isBooked = bookedDays.includes(day);

            return (
              <button
                key={day}
                type="button"
                className={`cs-day-btn ${
                  isBooked ? "booked" : "available"
                }`}
                onClick={() => toggleDay(day)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="cs-footer">
        <button className="cs-btn-text" onClick={onSkip}>
          Skip for Now
        </button>

        <div className="cs-btn-group">
          <button className="cs-btn-outline" onClick={onBack}>
            Back
          </button>

          <button className="cs-btn-primary" onClick={handleContinue}>
            Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarStep;