import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { markAllNotificationsRead, markNotificationRead } from "../Redux/features/authslice";
import "../Page/NewCss1/NotifLayout.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const TABS = [
  { label: "All", path: "/notifications/all" },
  { label: "Booking", path: "/notifications/booking" },
  { label: "Payment", path: "/notifications/payment" },
  { label: "Reviews", path: "/notifications/reviews" },
];

export default function NotifLayout({ notifications, currentPage, totalPages, onPageChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { actionLoading } = useSelector((state) => state.auth);

  const newCount = notifications.filter((n) =>!n.read).length;

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead());
  };

const handleNotifClick = (notif) => {
  console.log('Clicked notif:', notif);
  
  if (!notif.isRead) {
    dispatch(markNotificationRead(notif._id));
  }
  const id = notif.requestId || notif.booking?.id || notif.bookingId;
  
  if (id) {
    navigate(`/request/${id}`); 
  } else {
    console.error('No booking ID found:', notif);
  }
};


  return (
    <div className="notif-page">
      <div className="notif-datebar">
        <span className="notif-dateline" />
        <span className="notif-datetext">
          Today, {dayjs().format('Do MMMM, YYYY')}
        </span>
        <span className="notif-dateline" />
      </div>

      <div className="notif-header">
        <div className="notif-header-left">
          <button className="notif-back-btn" onClick={() => navigate("/vendordashboard")}>
            <span>←</span> Back
          </button>
          <div>
            <h1 className="notif-title">Notifications</h1>
            <p className="notif-count">
              {newCount} new message{newCount!== 1? "s" : ""}
            </p>
          </div>
        </div>
        <button
          className="notif-markread-btn"
          onClick={handleMarkAllRead}
          disabled={newCount === 0}
        >
          <span className="notif-check">✓</span> Mark all as read
        </button>
      </div>

      <div className="notif-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.path}
            className={`notif-tab ${
              location.pathname === tab.path? "notif-tab--active" : ""
            }`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="notif-list">
        {notifications.length === 0? (
          <p className="notif-empty">No notifications here yet.</p>
        ) : (
          notifications.map((notif) => (
            <div
              className={`notif-item ${!notif.read? "notif-item--new" : ""}`}
              key={notif._id}
              onClick={() => handleNotifClick(notif)}
            >
              <div className="notif-item-left">
                {!notif.read && <span className="notif-dot" />}
              </div>
              <div className="notif-item-body">
                {notif.title && (
                  <div className="notif-item-title-row">
                    <span className="notif-item-title">{notif.title}</span>
                    {!notif.read && <span className="notif-badge">New</span>}
                  </div>
                )}
                <p className="notif-item-msg">{notif.message}</p>
                <span className="notif-item-date">
                  {dayjs(notif.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </div>
              <span className="notif-item-time">
                {dayjs(notif.createdAt).fromNow()}
              </span>
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