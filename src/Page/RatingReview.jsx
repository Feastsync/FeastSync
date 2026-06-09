import React from "react";
import "./Css/RatingReview.css";
import Vendorheader2 from "../Auth/Vendor/Vendorheader2";
import Rating from "../assets/logos/Rating.svg"
import { useNavigate } from "react-router-dom";

const RatingReview = () => {
  const navigate = useNavigate();
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

          <p className="ratingreview-evidence-title">
            Add photo evidence
          </p>

          <div className="ratingreview-evidence-section">
            <div className="ratingreview-evidence-left">
              <span>Photo</span>
            </div>
            <div className="ratingreview-evidence-right">
              <div className="ratingreview-evidence-rightup">
                <div className="ratingreview-evidence-rightup-left">
                  <span>Photo</span>
                </div>
                <div className="ratingreview-evidence-rightup-right">
                  <span>Video</span>
                  <h2>Photo</h2>
                </div>
                </div>
              <div className="ratingreview-evidence-rightdown">

              <p>+ add 2 more</p>
              <h2>Photo</h2>
              </div>
            </div>
        </div>
        <div className="ratingreview-submit">
        <button className="ratingreview-submit-btn" onClick={() => navigate("/userdashboard")} >
          Submit
        </button>
        </div>
      </div>
    </div>
  );
};

export default RatingReview;