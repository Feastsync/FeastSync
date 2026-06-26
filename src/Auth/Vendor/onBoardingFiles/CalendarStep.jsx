import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./css/CalendarStep.css";

const CalendarStep = ({
  onNext,
  onBack,
  percentComplete = 100,
  profileData,
  setProfileData,
  isLoading,
  error, 
}) => {
  const [notifApi, contextHolder] = notification.useNotification();
  const [activeStartDate, setActiveStartDate] = useState(new Date());

    useEffect(() => {
    if (error) {
      notifApi.error({
        message: "Setup Failed",
        description: error,
        placement: "topRight",
        duration: 5,
      });
    }
  }, [error]);


  
  const bookedDates = profileData?.availability?.bookedDays || profileData?.bookedDays || [];
  
  const isSaveDisabled = isLoading || !profileData || !profileData.availability 
  || !Array.isArray(profileData.availability.bookedDays);


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const toggleDate = (date) => {
    const dateStr = formatDate(date);
    setProfileData((prev) => {
      const current = prev?.availability?.bookedDays || prev?.bookedDays || [];
      const updated = current.includes(dateStr)
        ? current.filter((d) => d !== dateStr)
        : [...current, dateStr];
      return {
        ...prev,
        availability: { ...prev.availability, bookedDays: updated },
        bookedDays: updated,
      };
    });
  };

  const handlePrevMonth = () => {
    setActiveStartDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setActiveStartDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const formatMonthYearLabel = (date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="cs-overlay">
      {contextHolder}
      <div className="cs-modal">
        <div className="cs-purple-top-section">
          <div className="cs-header">
            <div>
              <h2>Availability Calendar</h2>
              <p>View all available days</p>
              <div className="cs-progress-bar">
                <div className="cs-progress-fill" style={{ width: `${percentComplete}%` }} />
              </div>
            </div>
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
              onClickDay={toggleDate}
              showNavigation={false}
              calendarType="gregory"
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString(locale, { weekday: "short" }).toUpperCase()
              }
              tileClassName={({ date }) => {
                const dateStr = formatDate(date);
                const isBooked = bookedDates.includes(dateStr);
                const tileMonth = date.getMonth();
                const currentMonth = activeStartDate.getMonth();
                if (tileMonth !== currentMonth) return "neighboring-month";
                return isBooked ? "booked-date" : "available-date";
              }}
            />
          </div>

          <div className="cs-footer">
            <div className="cs-btn-group">
              <button className="cs-btn-outline" onClick={onBack}>
                Back
              </button>
              <button
               className="cs-btn-primary"
               onClick={onNext}
               disabled={isSaveDisabled}
             >
               {isLoading ? "Saving..." : "Complete Setup"}
             </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarStep;