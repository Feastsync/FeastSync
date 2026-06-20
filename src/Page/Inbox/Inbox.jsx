import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Inbox.css";
import api from "../../Redux/app/axios";

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function InboxDrawer({ isOpen, onClose, activeBookingId }) {
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchInbox = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/bookings/client`);
        const bookings = res.data?.bookings || res.data?.data || [];

        const mapped = bookings.map((booking) => ({
          bookingId: booking._id,
          stageName: booking.vendorId?.stageName || "Vendor",
          avatar: booking.vendorId?.profilePicture?.secureUrl || null,
          eventType: booking.eventType || "",
          eventDate: booking.eventDate || null,
          status: booking.bookingStatus || "pending",
          time: booking.updatedAt || booking.createdAt || null,
        }));

        setConversations(mapped);
      } catch {
        setError("Failed to load conversations.");
      } finally {
        setLoading(false);
      }
    };

    fetchInbox();
  }, [isOpen]);

  const handleOpen = (conv) => {
    onClose();
    navigate(`/chats/${conv.bookingId}`);
  };

  return (
    <>
      <div
        className={`inbox-backdrop ${isOpen ? "inbox-backdrop--visible" : ""}`}
        onClick={onClose}
      />

      <div className={`inbox-drawer ${isOpen ? "inbox-drawer--open" : ""}`}>
        <div className="inbox-drawer__header">
          <h2 className="inbox-drawer__title">Messages</h2>
          <button className="inbox-drawer__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {loading && (
          <div className="inbox-drawer__state">
            {[1, 2, 3].map((n) => (
              <div key={n} className="inbox__skeleton">
                <div className="inbox__skeleton-avatar" />
                <div className="inbox__skeleton-lines">
                  <div className="inbox__skeleton-line inbox__skeleton-line--name" />
                  <div className="inbox__skeleton-line inbox__skeleton-line--msg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="inbox-drawer__state inbox-drawer__state--error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && conversations.length === 0 && (
          <div className="inbox-drawer__state inbox-drawer__state--empty">
            <div className="inbox__empty-icon">💬</div>
            <p className="inbox__empty-title">No conversations yet</p>
            <p className="inbox__empty-sub">Your bookings will appear here.</p>
          </div>
        )}

        {!loading && !error && conversations.length > 0 && (
          <ul className="inbox__list">
            {conversations.map((conv) => (
              <li
                key={conv.bookingId}
                className={`inbox__item ${
                  activeBookingId === conv.bookingId ? "inbox__item--active" : ""
                }`}
                onClick={() => handleOpen(conv)}
              >
                <div className="inbox__avatar">
                  {conv.avatar ? (
                    <img src={conv.avatar} alt={conv.stageName} />
                  ) : (
                    getInitials(conv.stageName)
                  )}
                </div>

                <div className="inbox__item-body">
                  <div className="inbox__item-top">
                    <span className="inbox__client-name">{conv.stageName}</span>
                    <span className="inbox__time">{timeAgo(conv.time)}</span>
                  </div>

                  <div className="inbox__item-bottom">
                    <span className="inbox__preview">{conv.eventType}</span>
                    <span className={`inbox__status inbox__status--${conv.status?.toLowerCase()}`}>
                      {conv.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}