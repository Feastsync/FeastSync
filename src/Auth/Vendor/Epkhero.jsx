import React from "react";
import "../Css/Epkhero.css";
import { IoArrowBack, IoCameraOutline } from "react-icons/io5";
import Vendorprofile from "../../assets/logos/Vendorprofile.png";
import Vedorprofileview from "../../assets/logos/Vedorprofileview.svg";
import Vendorbackgroundimage from "../../assets/BackgroundImage/Vendorbackgroundimage.jpg";
import DjTeesco from "../../assets/BackgroundImage/djTeesco.jpg";
import { useNavigate } from "react-router-dom";

const Epkhero = () => {
  const navigate = useNavigate();

  return (
    <div className="epkhero-container">
      <img
        src={Vendorbackgroundimage}
        alt="Vendor background cover"
        className="epkhero-cover"
      />
      <div className="epkhero-overlay" />

      <button className="epkhero-back" type="button" onClick={() => navigate("/")} >
        <IoArrowBack />
      </button>
      <span className="epkhero-back-text">Back</span>

      <div className="epkhero-profile">
        <div className="epkhero-avatar-wrap">
          <img src={Vendorprofile} alt="DJ Kolade" className="epkhero-avatar" />
          <button
            className="epkhero-avatar-upload"
            type="button"
            aria-label="Upload profile photo"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Epkhero;
