import "../Css/Userdashboard.css";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Headerlogo from "../../assets/logos/Headerlogo.png";
import Bell from "../../assets/logos/Bell.png";

const Userdashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Nav = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <main className="user-dashboard-container">
      <nav className="header_container">
        <div className="header_wrapper">
          
          {/* Top Bar Wrapper: Contains Logo Left & Burger Menu Right on Mobile */}
          <div className="header_top_row">
            <div className="header_left">
              <img src={Headerlogo} alt="FeastSync Logo" className="logo_img" />
              <h2 className="logo_text">FeastSync</h2>
            </div>

            <div className="menu_icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>

          {/* Links navigation wrapper drawer block */}
          <div className={`header_middle ${isOpen ? "active" : ""}`}>
            <NavLink to="/" className="nav_link" onClick={() => setIsOpen(false)} end>Home</NavLink>
            <NavLink to="/about" className="nav_link" onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/howitworks" className="nav_link" onClick={() => setIsOpen(false)}>How it works</NavLink>
            <NavLink to="/vendors" className="nav_link" onClick={() => setIsOpen(false)}>Vendors</NavLink>
            <NavLink to="/services" className="nav_link" onClick={() => setIsOpen(false)}>Services</NavLink>
            <NavLink to="/contact" className="nav_link" onClick={() => setIsOpen(false)}>Contact</NavLink>
          </div>

          {/* Sub-row banner layout containing the profile and notification bell */}
          <div className="header_right">
            <div className="notification_wrapper">
              <img className="bell_icon" src={Bell} alt="Notification Bell" />
            </div>

            <div className="profile_wrapper">
              <div className="avatar_circle">
                <span>DA</span>
                <span className="status_dot"></span>
              </div>
              <span className="profile_name">Doyin Alade</span>
            </div>
          </div>

        </div>
      </nav>

      {/* Main Panel Modules Structure */}
      <section className="user-dashboard-content">
        <section className="user-dashboard-wrapper1">
          <section className="user-dashboard-contentleft1">
            <h2>Welcome, Doyin</h2>
            <p>
              Welcome back! Explore our vendors and start booking the <br /> 
              industry's best talent right now.
            </p>
          </section>
          <section className="user-dashboard-contentright2">
            <div className="user-dashboard-contentright2-left">
              <p>Event hosted</p>
              <h2>0</h2>
            </div>
            <div className="user-dashboard-contentright2-middle">
              <p>Total Spent</p>
              <h2> ₦0.00</h2>
            </div>
            <div className="user-dashboard-contentright2-right">
              <p>Review/Rating Given</p>
              <h2>0</h2>
            </div>
          </section>
        </section>
      </section>

      <section className="user-dashboard-hero">
        <section className="user-dashboard-hero-wrapper">
          <h1>No Upcoming Event</h1>
          <h5>
            You haven't scheduled any event yet. Create one now by booking a
            vendor
          </h5>
          <h2>Explore Vendors</h2>
        </section>
      </section>
    </main>
  );
};

export default Userdashboard;
