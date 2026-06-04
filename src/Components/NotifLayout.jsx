import { useNavigate, useLocation } from "react-router-dom";
import "./Css/NotifLayout.css";

const TABS = [
  { label: "All",      path: "/notifications/all" },
  { label: "Booking",  path: "/notifications/booking" },
  { label: "Payment",  path: "/notifications/payment" },
  { label: "Reviews",  path: "/notifications/reviews" },
];

export default function NotifLayout({ notifications, currentPage, totalPages, onPageChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const newCount = notifications.filter((n) => n.isNew).length;

  return (
    <div className="notif-page">

      <div className="notif-datebar">
        <span className="notif-dateline" />
        <span className="notif-datetext">Today, 17th June, 2026</span>
        <span className="notif-dateline" />
      </div>

     
      <div className="notif-header">
        <div className="notif-header-left">
          <button className="notif-back-btn" onClick={() => navigate(-1)}>
            <span>←</span> Back
          </button>
          <div>
            <h1 className="notif-title">Notifications</h1>
            <p className="notif-count">
              {newCount} new message{newCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button className="notif-markread-btn">
          <span className="notif-check">✓</span> Mark all as read
        </button>
      </div>

     
      <div className="notif-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.path}
            className={`notif-tab ${
              location.pathname === tab.path ? "notif-tab--active" : ""
            }`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </div>

     
      <div className="notif-list">
        {notifications.length === 0 ? (
          <p className="notif-empty">No notifications here yet.</p>
        ) : (
          notifications.map((notif) => (
            <div
              className={`notif-item ${notif.isNew ? "notif-item--new" : ""}`}
              key={notif.id}
            >
              <div className="notif-item-left">
                {notif.isNew && <span className="notif-dot" />}
              </div>
              <div className="notif-item-body">
                {notif.title && (
                  <div className="notif-item-title-row">
                    <span className="notif-item-title">{notif.title}</span>
                    {notif.isNew && <span className="notif-badge">New</span>}
                  </div>
                )}
                <p className="notif-item-msg">{notif.message}</p>
                <span className="notif-item-date">{notif.date}</span>
              </div>
              <span className="notif-item-time">{notif.time}</span>
            </div>
          ))
        )}
      </div>

     
      <div className="notif-pagination">
        <button
          className="notif-pg-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
        <span className="notif-pg-indicator">
          {currentPage} of {totalPages}
        </span>
        <button
          className="notif-pg-btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}