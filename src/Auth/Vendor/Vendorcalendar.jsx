import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Css/Vendorcalendar.css";
import api from "../../Redux/app/axios";

const Vendorcalendar = ({ vendorId }) => {
  const [date, setDate] = useState(new Date());
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCalendar = async () => {
      if (!vendorId) return;

      try {
        setLoading(true);

        const year = activeMonth.getFullYear();
        const month = String(activeMonth.getMonth() + 1).padStart(2, "0");
        const monthParam = `${year}-${month}`;

        const res = await api.get(
          `/calendar/get-calendar/${vendorId}?month=${monthParam}`
        );

        console.log("Calendar API Response:", res);

        const dates =
          res.data?.bookedDates?.map((item) =>
            item.date ? item.date.split("T")[0] : item
          ) || [];

        setBookedDates(dates);
      } catch (error) {
        console.error("Failed to fetch calendar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [vendorId, activeMonth]);

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
            <button
              className="vendor-calendar-close"
              aria-label="Close calendar"
              type="button"
            >
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
          {loading ? (
            <p>Loading calendar...</p>
          ) : (
            <Calendar
              calendarType="iso8601"
              activeStartDate={activeMonth}
              onActiveStartDateChange={({ activeStartDate }) => {
                setActiveMonth(activeStartDate);
              }}
              formatShortWeekday={(_, calendarDate) =>
                calendarDate
                  .toLocaleDateString("en-US", { weekday: "short" })
                  .toUpperCase()
              }
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth
              value={date}
              onChange={setDate}
              tileClassName={({ date: calendarDate, view }) => {
                if (
                  view === "month" &&
                  bookedDates.includes(formatDate(calendarDate))
                ) {
                  return "booked-day";
                }
                return null;
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Vendorcalendar;