import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const BookingRequestPage = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remainingMs, setRemainingMs] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

 
  useEffect(() => {
    const fetchBookingRequest = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/bookings/vendor/${requestId}`);
        console.log("object", res)
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (requestId) {
      fetchBookingRequest();
    }
  }, [requestId]);


  useEffect(() => {
    if (!data?.respondByAt) return;

    const deadline = new Date(data.respondByAt).getTime();
    const tick = () => {
      setRemainingMs(deadline - Date.now());
    };

    tick();
    const interval = setInterval(tick, 60000);
    return () => clearInterval(interval);
  }, [data]);


  const handleAccept = async () => {
    try {
      setActionLoading(true);
      await api.put(`/bookings/accept/${requestId}`);
      alert("Booking accepted.");
      const res = await api.get(`/bookings/vendor/${requestId}`);
      console.log("accept", res)
      setData(res.data);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setActionLoading(false);
    }
  };


  const handleDecline = async () => {
    try {
      setActionLoading(true);
      await api.put(`/bookings/reject/${requestId}`);
      alert("Booking declined.");
      const res = await api.get(`/bookings/vendor/${requestId}`);
      setData(res.data);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="booking-page">
        <p className="booking-state">Loading request...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-page">
        <p className="booking-state booking-state-error">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="booking-page">
        <p className="booking-state">No booking request found.</p>
      </div>
    );
  }

  const {
    djName,
    location,
    avatarUrl,
    kycVerified,
    online,
    eventDate,
    venue,
    eventType,
    guestCount,
    duration,
    services,
    packageName,
    packagePrice,
    packageIncludes,
    organiserNote,
    bookingStatus,
  } = data;

  return (
    <div className="booking-page">
      <div className="booking-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="new-request-btn" onClick={() => navigate("/notifications/booking")}>
          All Requests
        </button>
      </div>

      <div className="countdown-block">
        <h1 className="countdown-time">{formatRemaining(remainingMs)}</h1>
        <p className="countdown-label">Remaining to respond</p>
      </div>

      <div className="profile-bar">
        <div className="profile-identity">
          <div className="avatar-wrap">
            {avatarUrl? (
              <img src={avatarUrl} alt={djName} className="avatar-img" />
            ) : (
              <div className="avatar-fallback">DJ</div>
            )}
            {online && <span className="online-dot"></span>}
          </div>
          <div className="profile-text">
            <p className="profile-name">
              {djName}, {location}
            </p>
            <div className="profile-badges">
              {kycVerified && <span className="badge badge-kyc">KYC Verified</span>}
              {online && <span className="badge badge-online">Online</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="escrow-banner">
        <p>
          All messages through FEASTSYNC are audit-trail locked.
          Payments are held in escrow until event completion.
        </p>
      </div>

      <section className="details-section">
        <h2>Event Details</h2>
        <div className="details-row"><strong>Event Date:</strong> {eventDate}</div>
        <div className="details-row"><strong>Venue:</strong> {venue}</div>
        <div className="details-row"><strong>Event Type:</strong> {eventType}</div>
        <div className="details-row"><strong>Guest Count:</strong> {guestCount}</div>
        <div className="details-row"><strong>Duration:</strong> {duration}</div>
        <div className="details-row"><strong>Services:</strong> {services}</div>
      </section>

      <section className="package-section">
        <h3>Proposed Package</h3>
        <div className="package-row">
          <span>{packageName}</span>
          <span>{packagePrice}</span>
        </div>
        <p>Includes: {packageIncludes}</p>
      </section>

      <section className="organiser-note">
        <p><strong>Organiser Note:</strong> {organiserNote}</p>
      </section>

      {bookingStatus === "pending"? (
        <div className="action-buttons">
          <button
            className="btn-accept"
            onClick={handleAccept}
            disabled={actionLoading}
          >
            {actionLoading? "Processing..." : "Accept"}
          </button>
          <button
            className="btn-decline"
            onClick={handleDecline}
            disabled={actionLoading}
          >
            {actionLoading? "Processing..." : "Decline"}
          </button>
        </div>
      ) : (
        <div className="action-buttons">
          <p className="booking-state">This booking was {status}</p>
        </div>
      )}
    </div>
  );
};

export default BookingRequestPage;