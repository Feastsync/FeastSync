import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Css/Vendorcalendar.css";

const Vendorcalendar = () => {
  const [date, setDate] = useState(new Date(2026, 6, 1));

  const bookedDates = [
    "2026-07-03",
    "2026-07-22",
    "2026-07-25",
  ];

  const formatDate = (calendarDate) => {
    const year = calendarDate.getFullYear();
    const month = String(calendarDate.getMonth() + 1).padStart(2, "0");
    const day = String(calendarDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <section className="vendor-calendar-wrap">
      <div className="vendor-calendar-card">
        <header className="vendor-calendar-header">
          <div className="vendor-calendar-title-row">
            <h2>Availability Calendar</h2>
            <button className="vendor-calendar-close" aria-label="Close calendar" type="button">
              x
            </button>
          </div>

          <div className="vendor-calendar-legend">
            <span className="vendor-calendar-legend-item">
              <span className="vendor-calendar-swatch available"></span>
              Available
            </span>

            <span className="vendor-calendar-legend-item">
              <span className="vendor-calendar-swatch booked"></span>
              Booked
            </span>
          </div>
        </header>

        <div className="vendor-calendar-body">
          <Calendar
            calendarType="iso8601"
            formatShortWeekday={(_, calendarDate) =>
              calendarDate.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
            }
            next2Label={null}
            onChange={setDate}
            prev2Label={null}
            showNeighboringMonth={true}
            value={date}
            tileClassName={({ date: calendarDate, view }) => {
              if (view === "month" && bookedDates.includes(formatDate(calendarDate))) {
                return "booked-day";
              }

              return null;
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Vendorcalendar;
