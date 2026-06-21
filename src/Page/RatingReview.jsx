import React, { useState, useRef } from "react";
import "./Css/RatingReview.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../Redux/app/socketAxios";

const STAR_COUNT = 5;

const RatingReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const location = useLocation();

  const vendorName = location.state?.vendorName || "Vendor";
  const eventType = location.state?.eventType || "";
  const bookingRef = location.state?.bookingRef || bookingId;

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files].slice(0, 5));
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0] || null);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = () => setVideo(null);

  const handleSubmit = async () => {
    setError("");
    if (!rating) return setError("Please select a star rating.");
    if (!comment.trim()) return setError("Please add a comment.");
    if (!bookingId) return setError("Booking ID is missing.");

    const formData = new FormData();
    formData.append("rating", String(rating));
    formData.append("comment", comment.trim());
    images.forEach((img) => formData.append("images", img));
    if (video) formData.append("video", video);

    try {
      setLoading(true);
      await api.post(
        `/api/v1/review/create-review/${bookingId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSuccess(true);
      setTimeout(() => navigate("/userdashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const remainingSlots = 5 - images.length;

  return (
    <div className="ratingreview-container">

      {/* ── Single top bar (matches Figma) ── */}
      <div className="ratingreview-topbar">
        <div className="ratingreview-topbar-left">
          <div className="ratingreview-topbar-avatar">
            {vendorName.charAt(0).toUpperCase()}
          </div>
          <div className="ratingreview-topbar-info">
            <span className="ratingreview-topbar-name">{vendorName}</span>
            <div className="ratingreview-topbar-meta">
              <span className="ratingreview-topbar-status">
                ✓ KYC Verified
              </span>
              <span className="ratingreview-topbar-booking">
                Booking #{(bookingRef || bookingId)?.slice(-6).toUpperCase()} · {eventType || "Event completed"}
              </span>
            </div>
          </div>
        </div>
        <button
          className="ratingreview-topbar-close"
          onClick={() => navigate("/userdashboard")}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="ratingreview-wrapper">

        {/* ── Booking notice ── */}
        <p className="ratingreview-booking-text">
          This review is linked to booking #{(bookingRef || bookingId)?.slice(-6).toUpperCase()} and cannot be edited after submission
        </p>

        {/* ── Stars ── */}
        <div className="ratingreview-rating-section">
          <p className="ratingreview-rating-title">Overall Rating</p>
          <div className="ratingreview-stars">
            {Array.from({ length: STAR_COUNT }, (_, i) => {
              const val = i + 1;
              const filled = val <= (hovered || rating);
              return (
                <button
                  key={val}
                  type="button"
                  className={`ratingreview-star ${filled ? "ratingreview-star--filled" : ""}`}
                  onClick={() => setRating(val)}
                  onMouseEnter={() => setHovered(val)}
                  onMouseLeave={() => setHovered(0)}
                  aria-label={`${val} star${val > 1 ? "s" : ""}`}
                >
                  ★
                </button>
              );
            })}
          </div>
          {rating > 0 && (
            <span className="ratingreview-rating-label">
              {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
            </span>
          )}
        </div>

        {/* ── Comment ── */}
        <div className="ratingreview-note-section">
          <label htmlFor="rr-comment">Add Note</label>
          <textarea
            id="rr-comment"
            className="ratingreview-note-input"
            placeholder="Your message here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
          />
          <span className="ratingreview-char-count">{comment.length}/500</span>
        </div>

        {/* ── Photo Evidence ── */}
        <p className="ratingreview-evidence-title">Add photo evidence</p>

        <div className="ratingreview-evidence-section">
          <div className="ratingreview-evidence-row">
            <button
              type="button"
              className="ratingreview-media-slot ratingreview-media-slot--tall"
              onClick={() => imageInputRef.current?.click()}
            >
              <span className="ratingreview-add-icon">🖼️</span>
              <span>Photo</span>
            </button>
            <button
              type="button"
              className="ratingreview-media-slot ratingreview-media-slot--tall"
              onClick={() => videoInputRef.current?.click()}
            >
              <span className="ratingreview-add-icon">🎥</span>
              <span>Video</span>
            </button>
          </div>

          <div className="ratingreview-evidence-bottom">
            {images.map((img, i) => (
              <div key={i} className="ratingreview-preview-thumb">
                <img src={URL.createObjectURL(img)} alt={`Evidence ${i + 1}`} />
                <button
                  type="button"
                  className="ratingreview-remove-btn"
                  onClick={() => removeImage(i)}
                >×</button>
              </div>
            ))}
            {video && (
              <div className="ratingreview-preview-thumb ratingreview-preview-thumb--video">
                <span>🎥</span>
                <span>{video.name}</span>
                <button type="button" className="ratingreview-remove-btn" onClick={removeVideo}>×</button>
              </div>
            )}
            {remainingSlots > 0 && images.length > 0 && (
              <button
                type="button"
                className="ratingreview-addmore-slot"
                onClick={() => imageInputRef.current?.click()}
              >
                + add {remainingSlots} more
              </button>
            )}
          </div>
        </div>

        <input ref={imageInputRef} type="file" accept="image/*" multiple hidden onChange={handleImageChange} />
        <input ref={videoInputRef} type="file" accept="video/*" hidden onChange={handleVideoChange} />

        {error && <p className="ratingreview-error">{error}</p>}
        {success && <p className="ratingreview-success">✓ Review submitted! Redirecting...</p>}

        <div className="ratingreview-submit">
          <button
            className="ratingreview-submit-btn"
            onClick={handleSubmit}
            disabled={loading || success}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingReview;