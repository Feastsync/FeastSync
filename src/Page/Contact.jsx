import React, { useState } from "react";
import "./Css/Contact.css";
import Contactimage from "../assets/BackgroundImage/contactimage.jpg";
import Button from "../Props/Button.jsx";
import Boxicon from "../assets/logos/boxicons_location.svg";
import Email from "../assets/logos/Email.svg";
import Phone from "../assets/logos/Phone.svg";
import Input from "../Props/Input.jsx";

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How does FeastSync protect my payment?",
      answer:
        "All payments are held in escrow and released in milestone - 70% on booking confirmation and 30% after your event. Your money is never transferred directly to a vendor until the agreed conditions are met.",
    },
    {
      question: "Can I check if a vendor is available for my event date?",
      answer:
        "Yes, Each vendor has a real-time availability calendar that's enforced at the system level - if a date shows as unavailable, it means it's already booked. No double booking, no surprises.",
    },
    {
      question: "How are reviews verified?",
      answer:
        "Reviews on FeastSync are tied directly to a BookingID, so only organizers and vendors who completed a real transaction can leave feedback. This keeps ratings honest and prevents fake review from either side.",
    },
    {
      question: "How do I know a vendor is legitimate?",
      answer:
        "Every vendor on FeastSync goes through KYC (Know Your Customer) verification before their profile goes live. You can also view their full Electronic Press Kit (EPK) past reviews, and booking history before making a decision.",
    },
  ];
  return (
    <main className="contact-container">
      <section className="contact-section">
        <img src={Contactimage} alt="Hero" />
        <div className="overlay"></div>
        <div className="contact-content">
          <h1>Get in touch</h1>
          <p>We’d love to hear from you</p>
        </div>
      </section>
      <section className="contact-info">
        <section className="contact-info-left">
          <section className="contact-infol-leftwrapper">
            <div className="contact-info-btn1">
              <div className="contact-btn1-left">
                <img src={Boxicon} alt="" />
              </div>
              <div className="contact-btn1-right">
                <h1>Location</h1>
                <p>
                  161/162 Muyibi Street,Olodi- <br />
                  Apapa, Lagos{" "}
                </p>
              </div>
            </div>
            <div className="contact-info-btn1">
              <div className="contact-btn1-left">
                <img src={Email} alt="" />
              </div>
              <div className="contact-btn1-right">
                <h1>E-mail</h1>
                <p>@feastsync@gmail.com</p>
              </div>
            </div>
            <div className="contact-info-btn1">
              <div className="contact-btn1-left">
                <img src={Phone} alt="" />
              </div>
              <div className="contact-btn1-right">
                <h1>Phone</h1>
                <p>
                  080-3000-800 <br /> 080-3000-700{" "}
                </p>
              </div>
            </div>
          </section>
        </section>
        <section className="contact-info-right">
          <section className="contact-info-rightwrapper">
            <section className="contact-info-rightup">
              <article className="contact-info-rightup1">
                <div className="contact-rightup1-left">
                  <h1>Enter First Name</h1>
                  <Input placeholder="Your First Name" />
                </div>
                <div className="contact-rightup1-left">
                  <h1>Enter Last Name</h1>
                  <Input placeholder="Your Last Name" />
                </div>
              </article>
              <article className="contact-info-rightup2">
                <div className="contact-rightup2-left">
                  <h1>Email Address</h1>
                  <Input placeholder="Enter your email address" />
                </div>
                <div className="contact-rightup2-left">
                  <h1>Phone Number</h1>
                  <Input placeholder="Enter your phone number" />
                </div>
              </article>
            </section>
            <section className="contact-info-rightdown">
              <h1>Leave a Note</h1>
              <textarea
                placeholder="Your message here"
                className="contact-rightdown-text"
              />
              <button className="contact-info-rightdown-btn">
                Send Message
              </button>
            </section>
          </section>
        </section>
      </section>
      <section className="faq-section">
        <div className="faq-header">
          <h1>FAQs</h1>
          <p>Frequently asked questions</p>
        </div>

        <div className="faq-wrapper">
          {faqs.map((faq, index) => (
            <div className="faq-card" key={index}>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <h3>{faq.question}</h3>
                <span>{openFaq === index ? "▲" : "▼"}</span>
              </div>

              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;
