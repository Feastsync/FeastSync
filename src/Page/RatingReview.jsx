import React, { useState } from "react";
import "./Css/RatingReview.css";
import Vendorheader2 from "../Auth/Vendor/Vendorheader2";
import Rating from "../assets/logos/Rating.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createReview } from "../Redux/features/authslice";
import { message } from "antd";

const RatingReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [image1, setImage1] = useState(null);
  const [imagePreview1, setImagePreview1] = useState("");

  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  const handleRating = (value) => setRating(value);

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setImage1(file);
    setImagePreview1(file ? URL.createObjectURL(file) : "");
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setVideoPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async () => {
    if (!rating) return message.error("Please select a rating");
    if (!comment.trim()) return message.error("Please enter a comment");

    try {
      const formData = new FormData();

      formData.append("rating", rating);
      formData.append("comment", comment);

      if (image1) formData.append("images", image1);
      if (video) formData.append("video", video);

      await dispatch(
        createReview({
          bookingId,
          reviewData: formData,
        })
      ).unwrap();

      message.success("Review submitted successfully");
      navigate("/userdashboard");
    } catch (error) {
      message.error(error?.message || "Failed to submit review");
    }
  };

  return (
    <div className="ratingreview-container">
      <Vendorheader2 />

      <div className="ratingreview-wrapper">

        <p className="ratingreview-booking-text">
          This review is linked to booking #FS-00612 and cannot be edited after submission
        </p>

        <div className="ratingreview-rating-section">
          <p className="ratingreview-rating-title">Overall Rating</p>

          <div className="ratingreview-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={Rating}
                alt="star"
                onClick={() => handleRating(star)}
                style={{
                  cursor: "pointer",
                  opacity: rating >= star ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>

        <div className="ratingreview-note-section">
          <label>Add Note</label>
          <textarea
            className="ratingreview-note-input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="ratingreview-evidence-section">

          {/* IMAGE CARD */}
          <div className="ratingreview-card">
            <input type="file" accept="image/*" onChange={handleImage1} />

            {imagePreview1 ? (
              <img src={imagePreview1} alt="" />
            ) : (
              <span>Photo</span>
            )}
          </div>

          {/* VIDEO CARD */}
          <div className="ratingreview-card">
            <input type="file" accept="video/*" onChange={handleVideoChange} />

            {videoPreview ? (
              <video controls>
                <source src={videoPreview} />
              </video>
            ) : (
              <span>Video</span>
            )}
          </div>

        </div>

        <div className="ratingreview-submit">
          <button className="ratingreview-submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default RatingReview;