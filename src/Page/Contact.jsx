import React, { useState, useEffect } from "react";
import "./Css/Contact.css";
import Contactimage from "../assets/BackgroundImage/contactimage.jpg";
import Boxicon from "../assets/logos/boxicons_location.svg";
import Email from "../assets/logos/Email.svg";
import Phone from "../assets/logos/Phone.svg";
import Input from "../Props/Input.jsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import api from "../Redux/app/axios";

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index? null : index);
  };

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "firstName":
        if (!value.trim()) error = "First name is required";
        else if (value.trim().length < 2) error = "First name must be at least 2 characters";
        else if (!/^[a-zA-Z\s'-]+$/.test(value)) error = "First name can only contain letters";
        break;
        
      case "lastName":
        if (!value.trim()) error = "Last name is required";
        else if (value.trim().length < 2) error = "Last name must be at least 2 characters";
        else if (!/^[a-zA-Z\s'-]+$/.test(value)) error = "Last name can only contain letters";
        break;
        
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email address";
        break;
        
      case "phoneNumber":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^[\d\s\-\+\(\)]{10,}$/.test(value.replace(/\s/g, ""))) 
          error = "Enter a valid phone number, at least 10 digits";
        break;
        
      case "message":
        if (!value.trim()) error = "Message is required";
        else if (value.trim().length < 10) error = "Message must be at least 10 characters";
        else if (value.trim().length > 1000) error = "Message must be under 1000 characters";
        break;
        
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
    ...prev,
      [name]: value
    }));

    if (status.message) {
      setStatus({ type: "", message: "" });
    }
    
    if (errors[name]) {
      setErrors(prev => ({
      ...prev,
        [name]: ""
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
    ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
    ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allTouched = {};
    Object.keys(formData).forEach(key => allTouched[key] = true);
    setTouched(allTouched);
    
    const formErrors = validateForm();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      setStatus({ type: "error", message: "Please fix the errors above" });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await api.post("/contact/contact-us", formData);

      if (res.status === 201) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: ""
        });
        setTouched({});
        setErrors({});
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message 
        || "Something went wrong. Please try again.";
      setStatus({ type: "error", message: errorMsg });
    } finally {
      setLoading(false);
    }
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
          <form onSubmit={handleSubmit} className="contact-info-rightwrapper" noValidate>
            <section className="contact-info-rightup">
              <article className="contact-info-rightup1">
                <div className="contact-rightup1-left">
                  <h1>Enter First Name</h1>
                  <Input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your First Name" 
                    className={touched.firstName && errors.firstName? "input-error" : ""}
                  />
                  {touched.firstName && errors.firstName && (
                    <span className="error-text">{errors.firstName}</span>
                  )}
                </div>
                <div className="contact-rightup1-left">
                  <h1>Enter Last Name</h1>
                  <Input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your Last Name" 
                    className={touched.lastName && errors.lastName? "input-error" : ""}
                  />
                  {touched.lastName && errors.lastName && (
                    <span className="error-text">{errors.lastName}</span>
                  )}
                </div>
              </article>
              
              <article className="contact-info-rightup2">
                <div className="contact-rightup2-left">
                  <h1>Email Address</h1>
                  <Input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email address" 
                    className={touched.email && errors.email? "input-error" : ""}
                  />
                  {touched.email && errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>
                <div className="contact-rightup2-left">
                  <h1>Phone Number</h1>
                  <Input 
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your phone number" 
                    className={touched.phoneNumber && errors.phoneNumber? "input-error" : ""}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <span className="error-text">{errors.phoneNumber}</span>
                  )}
                </div>
              </article>
            </section>
            
            <section className="contact-info-rightdown">
              <h1>Leave a Note</h1>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your message here"
                className={`contact-rightdown-text ${touched.message && errors.message? "input-error" : ""}`}
              />
              {touched.message && errors.message && (
                <span className="error-text">{errors.message}</span>
              )}
              <div className="char-count">
                {formData.message.length}/1000
              </div>
              
              {status.message && (
                <p className={`form-status ${status.type}`}>
                  {status.message}
                </p>
              )}
              
              <button 
                type="submit" 
                className="contact-info-rightdown-btn"
                disabled={loading}
              >
                {loading? "Sending..." : "Send Message"}
              </button>
            </section>
          </form>
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
                <span>{openFaq === index? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
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