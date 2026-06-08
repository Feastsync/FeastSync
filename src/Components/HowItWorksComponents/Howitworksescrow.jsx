import React from "react";
import "./Css/Howitworksescrow.css";
import Heroimage from "../../assets/BackgroundImage/heroimage.jpg";
// import Button from  "../../Props/Button.jsx"
import Readytogetstarted from "../../Components/Readytogetstarted.jsx";
import { useNavigate } from "react-router-dom";

const Howitworksescrow = () => {
  const navigate = useNavigate();
  const stepData3 = [
    {
      stepNumber: "Step 1",
      title: "KYC — Identity verification",
      description:
        "Every entertainer must complete a Know Your Customer (KYC) check before their profile goes live.",
      image: "https://i.postimg.cc/Z5TBMBns/cuate.png",
    },
    {
      stepNumber: "Step 2",
      title: "Escrow — Payment protection",
      description:
        "FeastSync uses a milestone-based escrow system powered by Korapay. ",
      image: "https://i.postimg.cc/8cRcyNSP/amico.png",
    },
    {
      stepNumber: "Step 3",
      title: "Dispute resolution",
      description:
        "If something goes wrong, either party can raise a dispute within 48 hours of the event. A dedicated FEASTSYNC admin reviews all evidence and issues a binding resolution.",
      image: "https://i.postimg.cc/tTP4Tp7k/amico.png",
    },
  ];
  return (
    <main className="heroescrow-container">
      <section className="heroescrow-section">
        <img src={Heroimage} alt="Hero" />
        <div className="escrow-overlay"></div>
        <div className="heroescrow-content">
          <h1 className="heroescrow-title">
            Secure. Transparent.
            <br />
            Seamless: How
            <br />
            FeastSync Works.
          </h1>
          <p className="heroescrow-description">
            Whether you are hosting an event or performing at <br />
            one, FeastSync is built to make the entire process <br />
            transparent, secure, and effortless — from first click <br />
            to final payout.
          </p>
        </div>
      </section>
      <section className="stepescrow-container">
        <article className="stepescrow-wrapper">
          <div
            className="stepescrow-btn"
            onClick={() => navigate("/howitworks")}
          >
            <div className="circleescrow-icon">01</div>
            <span>For Organizer/Host</span>
          </div>
          <div
            className="stepescrow-btn"
            onClick={() => navigate("/howitworks/howitworksvendor")}
          >
            <div className="circleescrow-icon">02</div>
            <span>Vendors</span>
          </div>
          <div
            className="stepescrow-btn active"
            onClick={() => navigate("/howitworks/howitworksescrow")}
          >
            <div className="circleescrow-icon check">✓</div>
          
            <span>Escrow/Verification</span>
          </div>
        </article>
      </section>
      <section className="heroescrow-findbook">
        <article className="heroescrow-findbook1">
          <h2>
            Two systems working together <br /> to protect everyone </h2>
        </article>
        <article className="heroescrow-findbook2">
          <article className="heroescrow-findbook2b">
            <p>
             FeastSync's trust layer is built on two pillars — KYC identity verification that confirms who you 
             are dealing with, and escrow-based payments that protect what you are paying or earning. 
             Together they make FEASTSYNC the only platform in Nigeria where booking entertainment
              carries zero financial risk for either party.
            </p>
          </article>
        </article>
      </section>
      <section className="stepsescrow-section">
        <div className="stepsescrow-wrapper">
          {stepData3.map((step, index) => (
            <div key={index} className="stepescrow-card">
              <span className="stepescrow-number">{step.stepNumber}</span>
              <h3 className="stepescrow-title">{step.title}</h3>
              <p className="stepescrow-description">{step.description}</p>
              <div className="stepescrow-image-container">
                <img
                  src={step.image}
                  alt=""
                  className="stepescrow-illustration"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <Readytogetstarted />
    </main>
  );
};

export default Howitworksescrow;
