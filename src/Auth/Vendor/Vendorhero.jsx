import React from "react";
import "../Css/Vendorhero.css";
import { IoArrowBack, IoCameraOutline } from "react-icons/io5";
import Vendorprofile from "../../assets/logos/Vendorprofile.png"
import Vedorprofileview from "../../assets/logos/Vedorprofileview.svg"
import Vendorbackgroundimage from "../../assets/BackgroundImage/Vendorbackgroundimage.jpg";
import DjTeesco from "../../assets/BackgroundImage/djTeesco.jpg";

const Vendorhero = () => {
  return (
    <div className="vendorhero-container">
      <img
        src={Vendorbackgroundimage}
        alt="Festival stage cover"
        className="vendorhero-cover"
      />
      <div className="vendorhero-overlay" />

      <button className="vendorhero-back" type="button">
        <IoArrowBack />
      </button>
      <span className="vendorhero-back-text">Back</span>

      <button className="vendorhero-cover-upload" type="button">
        <span>Upload Cover</span>
      </button>

      <div className="vendorhero-profile">
        <div className="vendorhero-avatar-wrap">
          <img src={Vendorprofile} alt="DJ Kolade" className="vendorhero-avatar" />
          <div className="vendorhero-avatar-overlay">
            <span>Upload Profile</span>
            <img src={Vedorprofileview} alt="" />
          </div>
          <button
            className="vendorhero-avatar-upload"
            type="button"
            aria-label="Upload profile photo"
          >
    
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vendorhero;
