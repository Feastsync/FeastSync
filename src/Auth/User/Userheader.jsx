import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Headerlogo from "../../assets/logos/Headerlogo.png";
import Bell from "../../assets/logos/Bell.png";
import "../Css/Userheader.css";

const Userheader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Nav = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
   const closeMenu = () => setIsOpen(false)

  return (
    <nav className="userheader">
      <div className="userheader_wrapper">
        <div className="userheader_left">
          <img src={Headerlogo} alt="Logo" className="userheader_logo_img" />
          <span className="userheader_logo_text">FeastFlow</span>
        </div>

        <div className className={`userheader_middle ${isOpen ? "active" : ""}`}>
          <NavLink
            to="/"
            className="userheader_nav_link"
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="userheader_nav_link"
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/howitworks"
            className="userheader_nav_link"
            onClick={() => setIsOpen(false)}
          >
            How it works
          </NavLink>
          <NavLink
            to="/vendors"
            className="userheader_nav_link"
            onClick={() => setIsOpen(false)}
          >
            Vendors
          </NavLink>
          <NavLink
            to="/services"
            className="userheader_nav_link"
            onClick={() => setIsOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className="userheader_nav_link"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
        </div>

        <div className="userheader_right">
          <div className="userheader_notification_wrapper">
            <img src={Bell} alt="Notifications" className="userheader_bell_icon" />
          </div>
          <div className="userheader_profile_wrapper">
            <div className="userheader_avatar_circle">
              <span>DA</span>
              <div className="userheader_status_dot"></div>
            </div>
            <span className="userheader_profile_name">Doyin Alade</span>
          </div>
        </div>
        {/* <button className="userheader-logout-btn">
            Logout
        </button> */}

        <div className="menu_icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Userheader;