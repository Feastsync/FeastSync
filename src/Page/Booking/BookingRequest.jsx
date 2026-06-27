import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { notification } from "antd";
import "./BookingRequest.css";
import api from "../../Redux/app/axios";

const formatRemaining = (ms) => {
  if (ms === null) return "—";
  if (ms <= 0) return "0h 0m";
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const formatDate = (raw) => {
  if (!raw) return "—";
  const d = new Date(raw);
  if (isNaN(d)) return raw;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

const STATUS_LABEL = {
  pending:   "Pending",
  confirmed: "Confirmed",
  accepted:  "Accepted",
  rejected:  "Declined",
  declined:  "Declined",
  cancelled: "Cancelled",
  completed: "Completed",
};

const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const BackArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const NewRequestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const BookingRequestPage = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const vendorInfo = useSelector((state) => state.auth.vendorInfo);
  const [notifApi, contextHolder] = notification.useNotification();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remainingMs, setRemainingMs] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const notify = (type, message, description) => {
    notifApi[type]({ message, description, placement: "topRight", duration: 4 });
  };

  useEffect(() => {
    const fetchBookingRequest = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/bookings/booking-details/${requestId}`);
        const booking = res.data?.data ?? res.data;
        console.log("BOOKING:", booking);
        setData(booking);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (requestId) fetchBookingRequest();
  }, [requestId]);

  useEffect(() => {
    if (!data?.respondByAt) return;
    const deadline = new Date(data.respondByAt).getTime();
    const tick = () => setRemainingMs(deadline - Date.now());
    tick();
    const interval = setInterval(tick, 60000);
    return () => clearInterval(interval);
  }, [data]);

  const refetchData = async () => {
    const res = await api.get(`/bookings/booking-details/${requestId}`);
    setData(res.data?.data ?? res.data);
  };



  const handleAccept = async () => {
    if (actionLoading) return;
    try {
      setActionLoading("accept");
      await api.put(`/bookings/accept/${requestId}`);
      notify("success", "Booking Accepted", "You have successfully accepted this booking.");
      navigate(`/chats/${requestId}`);
      await refetchData();
    } catch (err) {
      notify("error", "Failed to Accept", err.response?.data?.message || err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async () => {
    if (actionLoading) return;
    try {
      setActionLoading("decline");
      await api.put(`/bookings/reject/${requestId}`);
      notify("warning", "Booking Declined", "You have declined this booking request.");
      await refetchData();
    } catch (err) {
      notify("error", "Failed to Decline", err.response?.data?.message || err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return (
    <div className="booking-page">
      <div className="booking-topbar">
        <div className="skel skel--btn" />
        <div className="skel skel--btn" />
      </div>
      <div className="skel skel--countdown" />
      <div className="skel skel--profile-bar" />
      <div className="skel skel--banner" />
      <div className="skel-section">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skel skel--row" />
        ))}
      </div>
      <div className="skel skel--row" style={{ width: "60%", marginTop: 24 }} />
      <div className="skel skel--row" style={{ width: "40%" }} />
      <div className="skel skel--row" style={{ width: "80%", marginTop: 24 }} />
      <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
        <div className="skel skel--btn-lg" />
        <div className="skel skel--btn-lg" />
      </div>
    </div>
  );
  if (error)   return <div className="booking-page"><p className="booking-state booking-state-error">{error}</p></div>;
  if (!data)   return <div className="booking-page"><p className="booking-state">No booking request found.</p></div>;

  const bookingStatus   = data?.bookingStatus ?? data?.status;

  
  const djName      = vendorInfo?.stageName ?? `${vendorInfo?.firstName ?? ""} ${vendorInfo?.lastName ?? ""}`.trim() ?? "—";
  const avatarUrl   = vendorInfo?.profilePicture?.secureUrl ?? vendorInfo?.profilePicture ?? null;
  const kycVerified = vendorInfo?.isKycVerified ?? vendorInfo?.kycVerified ?? false;
  const online      = vendorInfo?.online ?? false;
  const location    = vendorInfo?.stateOfResidence ?? vendorInfo?.location ?? "";
  const organiserNote   = data?.additionalDetails ?? data?.organiserNote;
  const eventDate       = formatDate(data?.eventDate);
  const venue           = data?.venue ?? data?.eventLocation ?? "—";
  const eventType       = data?.eventType ?? "—";
  const guestCount      = data?.guestCount ?? "—";
  const duration        = data?.duration ?? "—";
  const services        = data?.services ?? "—";
  const packageName     = data?.packageName ?? data?.package?.name;
  const amount    = data?.packagePrice ?? data?.amount;
  const packageIncludes = data?.packageIncludes ?? data?.package?.includes;

  const isPending   = bookingStatus === "pending";
  const statusLabel = STATUS_LABEL[bookingStatus] ?? bookingStatus;

  return (
    <>
      {contextHolder}
      <div className="booking-page">

    
        <div className="booking-topbar">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <BackArrow /> Back
          </button>
          <button className="new-request-btn" onClick={() => navigate("/notifications/booking")}>
            <NewRequestIcon /> New request
          </button>
        </div>

        <div className="countdown-block">
          <h1 className="countdown-time">{formatRemaining(remainingMs)}</h1>
          <p className="countdown-label">Remaining to respond</p>
        </div>

       
        <div className="profile-bar">
          <div className="profile-identity">
            <div className="avatar-wrap">
              {avatarUrl
                ? <img src={avatarUrl} alt={djName} className="avatar-img" />
                : <div className="avatar-fallback">DJ</div>
              }
              {online && <span className="online-dot" />}
            </div>
            <div className="profile-text">
              <p className="profile-name">
                {djName ?? "—"}{location ? `, ${location}` : ""}
              </p>
              <div className="profile-badges">
                {kycVerified && <span className="badge badge-kyc">✓ KYC Verified</span>}
                {online && <span className="badge badge-online">● Online</span>}
              </div>
            </div>
          </div>

        
          <div className="profile-actions">
            <button className="icon-btn" title="Message vendor">
              <ChatIcon />
            </button>
            <button className="icon-btn" title="View calendar">
              <CalendarIcon />
            </button>
          </div>
        </div>

        <div className="escrow-banner">
          <p>
            All messages through FEASTSYNC are audit-trail locked.
            Payments are held in escrow via Korapay until event completion.
            Do not move conversations off-platform.
          </p>
        </div>

     
        <section className="details-section">
          <h2>Event details</h2>
          <div className="details-row"><span className="details-label">Event date:</span><span>{eventDate}</span></div>
          <div className="details-row"><span className="details-label">Venue:</span><span>{venue}</span></div>
          <div className="details-row"><span className="details-label">Event Type:</span><span>{eventType}</span></div>
          <div className="details-row"><span className="details-label">Guest count:</span><span>{guestCount}</span></div>
          <div className="details-row"><span className="details-label">Duration:</span><span>{duration}</span></div>
          <div className="details-row"><span className="details-label">Services:</span><span>{services}</span></div>
        </section>

        <section className="package-section">
          <h3>Proposed package</h3>
          <div className="package-main-row">
            <span className="package-name">{packageName ?? "—"}</span>
            <span className="package-price">{amount ?? "—"}</span>
          </div>
          <p className="package-includes">Includes: {packageIncludes ?? "—"}</p>
        </section>

        {organiserNote && (
          <section className="organiser-note">
            <p>
              <span className="note-label">Organiser note: </span>
              {organiserNote}
            </p>
          </section>
        )}

        {isPending ? (
          <div className="action-buttons">
            <button
              className="btn-accept"
              onClick={handleAccept}
              disabled={actionLoading !== null}
            >
              {actionLoading === "accept"
                ? <span className="btn-spinner"><span className="spinner" /> Processing...</span>
                : "Accept"}
            </button>
            <button
              className="btn-decline"
              onClick={handleDecline}
              disabled={actionLoading !== null}
            >
              {actionLoading === "decline"
                ? <span className="btn-spinner"><span className="spinner spinner--red" /> Processing...</span>
                : "Decline"}
            </button>
          </div>
        ) : (
          <div className="booking-status-wrap">
            <span className={`booking-status-badge booking-status-badge--${bookingStatus}`}>
              {statusLabel}
            </span>
            <p className="booking-status-sub">
              This booking request has been {statusLabel.toLowerCase()}.
            </p>
          </div>
        )}

      </div>
    </>
  );
};

export default BookingRequestPage;