import "../Css/Userdashboard.css";
import React from "react";
import Userheader from "./Userheader"; 
import { useNavigate } from "react-router-dom";

const Userdashboard = () => {
  const navigate = useNavigate();

  return (
    <main className="user-dashboard-container userdashboard">
      <Userheader /> 
      
      <section className="user-dashboard-content">
        <section className="user-dashboard-wrapper">
          <section className="user-dashboard-contentleft1">
            <h2>Welcome, Doyin</h2>
            <p>
              Welcome back! Explore our vendors and start booking the <br /> 
              industry's best talent right now.
            </p>
          </section>
        </section>
        
        <section className="user-dashboard-contentright2">
          <section className="user-dashboard-contentright2-wrapper">
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
          <p onClick={() => navigate("/vendors")}>Explore Vendors</p>
        </section>
      </section>
    </main>
  );
};

export default Userdashboard;
