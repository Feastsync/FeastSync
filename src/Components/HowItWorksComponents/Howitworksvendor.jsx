import React from "react";

import "./Css/Howitworksvendor.css";
import Heroimage from "../../assets/BackgroundImage/heroimage.jpg";
import Readytogetstarted from "../../Components/Readytogetstarted.jsx";
import { useNavigate } from "react-router-dom";

const Howitworksvendor = () => {
  const navigate = useNavigate();
  const stepsData = [
    {
      stepNumber: "Step 1",
      title: "Create your Sharable Public Profile ",
      description:
        "Your entertainer profile is your digital resume on FeastSync. Add your bio, category, photos, video highlights, starting price, minimum hours, and the event types you specialize in",
      image: "https://i.postimg.cc/HsM9gypJ/pana.jpg",
    },
    {
      stepNumber: "Step 2",
      title: "Complete KYC verification",
      description:
        "Submit your NIN/BVN and a selfie for identity verification. Once approved by the FeastSync admin team, you receive a Verified badge that shows on your profile.",
      image: "https://i.postimg.cc/bY713w14/pana.jpg",
    },
    {
      stepNumber: "Step 3",
      title: "Set your availability calendar",
      description:
        "Mark your dates as fully available, or unavailable. Organizers see your live calendar before they send a booking request.",
      image: "https://i.postimg.cc/vB16tJTs/rafiki.png",
    },
    {
      stepNumber: "Step 4",
      title: "Receive and review booking requests",
      description:
        "Booking requests arrive in your dashboard with full event details — type, date, location, duration, and guest count. Review, accept, or decline.",
      image: "https://i.postimg.cc/6qg0x0sS/amico.png",
    },
    {
      stepNumber: "Step 5",
      title: "Perform and deliver",
      description:
        "Show up, perform, and deliver your best. The in-app chat keeps communication with the organizer clean and documented leading up to the event.",
      image: "https://i.postimg.cc/63LwghQ8/Character.png",
    },
    {
      stepNumber: "Step 6",
      title: "Receive your  payout",
      description:
        "Once the organizer confirms the event was completed, escrow releases your 30% balance to your FeastSync wallet instantly. Withdraw to your bank account at any time.",
      image: "https://i.postimg.cc/HWyyc1F4/bro.png",
    },
  ];
  return (
    <main className="herovendor-container">
      <section className="herovendor-section">
        <img src={Heroimage} alt="Hero" />
        <div className="vendor-overlay"></div>
        <div className="herovendor-content">
          <h1 className="herovendor-title">
            Secure. Transparent.
            <br />
            Seamless: How
            <br />
            FeastSync Works.
          </h1>
          <p className="herovendor-description">
            Whether you are hosting an event or performing at <br />
            one, FeastSync is built to make the entire process <br />
            transparent, secure, and effortless — from first click <br />
            to final payout.
          </p>
        </div>
      </section>
      <section className="stepvendor-container">
        <article className="stepvendor-wrapper">
        <div
          className="stepvendor-btn"
          onClick={() => navigate("/howitworks")}
        >
          <div className="circlevendor-icon check">✓</div>
          <span>For Organizer/Host</span>
        </div>
        <div
          className="stepvendor-btn active"
          onClick={() => navigate("/howitworks/howitworksvendor")}
        >
          <div className="circlevendor-icon">02</div>
          <span>Vendors</span>
        </div>
        <div
          className="stepvendor-btn"
          onClick={() => navigate("/howitworks/howitworksescrow")}
        >
          <div className="circlevendor-icon">03</div>
          <span>Escrow/Verification</span>
        </div>
        </article>
      </section>
      <section className="herovendor-findbook">
        <article className="herovendor-findbook1">
          <h2>Build your reputation. <br /> without the hassle</h2>
        </article>
        <article className="herovendor-findbook2">
          <article className="herovendor-findbook2b">
          <p>
            FeastSync gives entertainment professionals a platform that protects their time, guarantees 
            their payment, and builds their credibility — all in one place. No middlemen. No chasing 
            invoices. Just verified talent, professional bookings, and secured payouts.
          </p>
          </article>
        </article>
      </section>
      <section className="stepsvendor-section">
        <div className="stepsvendor-wrapper">
          {stepsData.map((step, index) => (
            <div key={index} className="stepvendor-card">
              <span className="stepvendor-number">{step.stepNumber}</span>
              <h3 className="stepvendor-title">{step.title}</h3>
              <p className="stepvendor-description">{step.description}</p>
              <div className="stepvendor-image-container">
                <img src={step.image} alt="" className="stepvendor-illustration" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <Readytogetstarted />
    </main>
  );
};

export default Howitworksvendor;
