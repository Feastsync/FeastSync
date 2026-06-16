import React, { useState } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./css/CalendarStep.css";

const CalendarStep = ({
  onNext,
  onBack,
  onSkip,
}) => {
  const [activeStartDate, setActiveStartDate] = useState(new Date(2028, 6, 1)); 

  const handlePrevMonth = () => {
    setActiveStartDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setActiveStartDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const formatMonthYearLabel = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div className="cs-overlay">
      <div className="cs-modal">
        
        <div className="cs-purple-top-section">
          <div className="cs-header">
            <h2>Availability Calendar</h2>
            <button className="cs-close" onClick={onSkip}>
              <IoClose size={20} />
            </button>
          </div>

          <div className="cs-custom-navigation">
            <button className="nav-arrow-btn" onClick={handlePrevMonth}>
              <IoChevronBack size={18} />
            </button>
            <span className="nav-month-label">{formatMonthYearLabel(activeStartDate)}</span>
            <button className="nav-arrow-btn" onClick={handleNextMonth}>
              <IoChevronForward size={18} />
            </button>
          </div>

          <div className="cs-legend">
            <div className="cs-legend-item">
              <span className="legend-box available-box"></span>
              Available
            </div>
            <div className="cs-legend-item">
              <span className="legend-box booked-box"></span>
              Booked
            </div>
          </div>
        </div>

        <div className="cs-white-bottom-section">
          <div className="cs-calendar-wrapper">
            <Calendar
              activeStartDate={activeStartDate}
              onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
              showNavigation={false} 
              calendarType="gregory"
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString(locale, { weekday: "short" }).toUpperCase()
              }
              tileClassName={({ date }) => {
                const currentMonth = activeStartDate.getMonth();
                const tileMonth = date.getMonth();
                const currentYear = activeStartDate.getFullYear();
                const tileYear = date.getFullYear();

                if (tileYear > currentYear || (tileYear === currentYear && tileMonth > currentMonth)) {
                  return "hide-next-neighbor readonly-tile";
                }

                return "available-date readonly-tile";
              }}
            />
          </div>

          <div className="cs-footer">
            <button className="cs-btn-outline" onClick={() => onBack(activeStartDate)}>
              Back
            </button>
            <button className="cs-btn-primary" onClick={() => onNext(activeStartDate)}>
              Complete profile setup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CalendarStep;
