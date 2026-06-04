import React from "react";
import "../Css/Vendorhero.css";
import { IoArrowBack, IoCameraOutline } from "react-icons/io5";

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
        <span>Back</span>
      </button>

      <button className="vendorhero-cover-upload" type="button">
        <IoCameraOutline />
        <span>Upload Cover</span>
      </button>

      <div className="vendorhero-profile">
        <div className="vendorhero-avatar-wrap">
          <img src={DjTeesco} alt="DJ Kolade" className="vendorhero-avatar" />
          <div className="vendorhero-avatar-overlay">
            <IoCameraOutline />
            <span>Upload Profile</span>
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
