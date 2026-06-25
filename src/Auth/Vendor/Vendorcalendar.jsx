import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Css/Vendorcalendar.css";
import api from "../../Redux/app/axios";

const CalendarSkeleton = () => (
  <div className="vc-skeleton">
    <div className="vc-skeleton__header">
      <div className="vc-skeleton__title" />
      <div className="vc-skeleton__legend">
        <div className="vc-skeleton__swatch" />
        <div className="vc-skeleton__swatch" />
      </div>
    </div>
    <div className="vc-skeleton__body">
      <div className="vc-skeleton__nav">
        <div className="vc-skeleton__nav-btn" />
        <div className="vc-skeleton__month" />
        <div className="vc-skeleton__nav-btn" />
      </div>
      <div className="vc-skeleton__weekdays">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="vc-skeleton__weekday" />
        ))}
      </div>
      <div className="vc-skeleton__days">
        {[...Array(35)].map((_, i) => (
          <div key={i} className="vc-skeleton__day" />
        ))}
      </div>
    </div>
  </div>
);

const Vendorcalendar = ({ vendor, isOwner, bookingStatus }) => {
  const vendorId = vendor?._id;
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
        console.log("Full response:", JSON.stringify(res.data, null, 2));
        console.log("First booked item:", res.data?.bookedDates?.[0]);

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
  }, [vendorId, activeMonth, bookingStatus]);

  const formatDate = (calendarDate) => {
    const year = calendarDate.getFullYear();
    const month = String(calendarDate.getMonth() + 1).padStart(2, "0");
    const day = String(calendarDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (loading) return <CalendarSkeleton />;

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
        </div>
      </div>
    </section>
  );
};

export default Vendorcalendar;