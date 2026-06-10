import React, { useState, useEffect } from "react";
import "../Css/Epkheader.css";
import Headerlogo2 from "../../assets/logos/Headerlogo2.svg";
import { useNavigate } from "react-router-dom";

const Epkheader = () => {
  const navigate = useNavigate();

  return (
    <header className="Epkheader-container">
      <div className="Epkheader-wrapper">
        <div
          className="Epkheader-left"
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
        >
          <img src={Headerlogo2} alt="FeastSync Logo" className="logo-img" />
          <h2 className="logo-text">FeastSync</h2>
        </div>

      </div>
    </header>
  );
};

export default Epkheader;
