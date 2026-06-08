import React from "react";
import "./Css/RatingReview.css";
import Vendorheader2 from "../Auth/Vendor/Vendorheader2";
import Rating from "../assets/logos/Rating.svg"

const RatingReview = () => {
  return (
    <div className="ratingreview-container">
      <Vendorheader2 />

      <div className="ratingreview-wrapper">
        <p className="ratingreview-booking-text">
          This review is linked to booking #FS-00612 and cannot be edited after
          submission
        </p>

        <div className="ratingreview-rating-section">
          <p className="ratingreview-rating-title">Overall Rating</p>

          <div className="ratingreview-stars">
            <img src={Rating} alt="star" />
            <img src={Rating} alt="star" />
            <img src={Rating} alt="star" />
            <img src={Rating} alt="star" />
            <img src={Rating} alt="star" />
          </div>
        </div>

        <div className="ratingreview-note-section">
          <label>Add Note</label>

          <textarea
            className="ratingreview-note-input"
            placeholder="Your message here"
          ></textarea>
        </div>

        <div className="ratingreview-evidence-section">
          <p className="ratingreview-evidence-title">
            Add photo evidence
          </p>

          <div className="ratingreview-media-header">
            <span>Photo</span>
            <span>Video</span>
          </div>

          <div className="ratingreview-upload-area">
            <span className="ratingreview-photo-label">
              Photo
            </span>

            <label className="ratingreview-upload-box">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                className="ratingreview-file-input"
              />

              <p>+ add 2 more</p>
            </label>
          </div>
        </div>

        <button className="ratingreview-submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default RatingReview;