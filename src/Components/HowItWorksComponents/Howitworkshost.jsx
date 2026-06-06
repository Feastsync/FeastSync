import React from "react";
import "./Css/Howitworkhost.css";
import Heroimage from "../../assets/BackgroundImage/heroimage.jpg";
import Readytogetstarted from "../../Components/Readytogetstarted.jsx";
import { useNavigate } from "react-router-dom";

const Howitworkshost = () => {
  const navigate = useNavigate();
  const stepsData = [
    {
      stepNumber: "Step 1",
      title: "Search for the right entertainer",
      description:
        "Browse verified entertainers by category — DJ, live band, MC, comedian, spoken word, and more.",
      image: "https://i.postimg.cc/dVxqPZDP/amico.png",
    },
    {
      stepNumber: "Step 2",
      title: "Review their Public Profile",
      description:
        "Each entertainer has a verified public profile link —  showing their bio, gallery, past events, ratings, starting price, and minimum hours. You know exactly who you are booking.",
      image: "https://i.postimg.cc/y6jCC3b7/amico.png",
    },
    {
      stepNumber: "Step 3",
      title: "Check real-time availability",
      description:
        "A live availability calendar; Green dates are open and, red means fully booked. Pick your event date and proceed — no back-and-forth calls needed.",
      image: "https://i.postimg.cc/mZ8J5fPZ/amico.png",
    },
    {
      stepNumber: "Step 4",
      title: "Describe your event",
      description:
        "Fill in a simple event form. This gives the entertainer everything they need to confirm the booking without unnecessary messages.",
      image: "https://i.postimg.cc/dVxqPZDP/amico.png",
    },
    {
      stepNumber: "Step 5",
      title: "Pay securely into escrow",
      description:
        "Once you confirm the booking, payment is processed via Korapay and held securely in escrow. Your money is protected.",
      image: "https://i.postimg.cc/6qg0x0sS/amico.png",
    },
    {
      stepNumber: "Step 6",
      title: "Confirm after the event — release payment",
      description:
        "Confirm on FeastSync that the entertainer delivered. If anything went wrong, raise a dispute instead — our admin team will step in and resolve it fairly.",
      image: "https://i.postimg.cc/br7QBwbQ/amico.png",
    },
  ];
  return (
    <main className="herohost-container">
      <section className="herohost-section">
        <img src={Heroimage} alt="Hero" />
        <div className="host-overlay"></div>
        <div className="herohost-content">
          <h1 className="herohost-title">
            Secure. Transparent.
            <br />
            Seamless: How
            <br />
            FeastSync Works.
          </h1>
          <p className="herohost-description">
            Whether you are hosting an event or performing at <br />
            one, FeastSync is built to make the entire process <br />
            transparent, secure, and effortless — from first click <br />
            to final payout.
          </p>
        </div>
      </section>
      <section className="stephost-container">
        <article className="stephost-wrapper">
        <div
          className="stephost-btn active"
          onClick={() => navigate("/howitworks")}
        >
          <div className="circlehost-icon check">✓</div>
          <span>For Organizer/Host</span>
        </div>
        <div
          className="stephost-btn"
          onClick={() => navigate("/howitworks/howitworksvendor")}
        >
          <div className="circlehost-icon">02</div>
          <span>Vendors</span>
        </div>
        <div
          className="stephost-btn"
          onClick={() => navigate("/howitworks/howitworksescrow")}
        >
          <div className="circlehost-icon">03</div>
          <span>Escrow/Verification</span>
        </div>
        </article>
      </section>
      <section className="herohost-findbook">
        <article className="herohost-findbook1">
          <h2>Find, book, and pay for <br /> entertainment — without the risk.</h2>
        </article>
        <article className="herohost-findbook2">
          <article className="herohost-findbook2b">
          <p>
            FeastSync gives event organizers access to a curated roster of
            verified entertainment talent across Lagos. Every booking is
            straightforward, every payment is protected, and every entertainer
            on the platform has been identity-checked before you ever see their
            profile.
          </p>
          </article>
        </article>
      </section>
      <section className="stepshost-section">
        <div className="stepshost-wrapper">
          {stepsData.map((step, index) => (
            <div key={index} className="stephost-card">
              <span className="stephost-number">{step.stepNumber}</span>
              <h3 className="stephost-title">{step.title}</h3>
              <p className="stephost-description">{step.description}</p>
              <div className="stephost-image-container">
                <img src={step.image} alt="" className="stephost-illustration" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <Readytogetstarted />
    </main>
  );
};

export default Howitworkshost;
