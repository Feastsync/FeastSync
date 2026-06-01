import React from 'react'
import Header from "../Header.jsx"
import "./Css/Howitworksescrow.css"
import Heroimage from "../../assets/BackgroundImage/heroimage.jpg"
// import Button from  "../../Props/Button.jsx"
import Readytogetstarted from '../../Components/Readytogetstarted.jsx'
import { useNavigate } from 'react-router-dom'

const Howitworksvescrow = () => {
    const navigate = useNavigate()
    const stepData = [
    {
      stepNumber: 'Step 1',
      title: 'KYC — Identity verification',
      description: 'Every entertainer must complete a Know Your Customer (KYC) check before their profile goes live.',
     image:'https://i.postimg.cc/m27cG9qM/Chiluv.jpg',
    },
    {
      stepNumber: 'Step 2',
      title: 'Escrow — Payment protection',
      description: 'FeastSync uses a milestone-based escrow system powered by Korapay. ',
      image:'https://i.postimg.cc/m27cG9qM/Chiluv.jpg',
    },
    {
      stepNumber: 'Step 3',
      title: 'Dispute resolution',
      description: 'If something goes wrong, either party can raise a dispute within 48 hours of the event. A dedicated FEASTSYNC admin reviews all evidence and issues a binding resolution.',
      image:'https://i.postimg.cc/m27cG9qM/Chiluv.jpg',
    }
  ];
  return (
    
    <main className='main-container'>
      <Header />
      <section className='hero-section'>
        <img src={Heroimage} alt="Hero" />
        <div className='overlay'></div>
        <div className='hero-content'>
          <h1>
            Secure. Transparent.
            <br />
            Seamless: How
            <br />
            FeastSync Works.
          </h1>
          <p>
            Whether you are hosting an event or performing at <br /> 
            one, FeastSync is built to make the entire process <br /> 
            transparent, secure, and effortless — from first click <br /> 
            to final payout.
          </p>
        </div>
      </section>
      <section className="step-container">
           <div className="step-btn" onClick={()=> navigate("/howitworkshost")}>
        <div className="circle-icon check">✓</div>
        <span>For Organizer/Host</span>
      </div>
      <div className="step-btn" onClick={()=> navigate("/howitworksvendor")}>
        <div className="circle-icon">02</div>
        <span>Vendors</span>
        </div>
      <div className="step-btn active" onClick={()=> navigate("/howitworksescrow")}>
        <div className="circle-icon">03</div>
        <span>Escrow/Verification</span>
      </div>
    </section>
    <section className='hero-findbook'>
      <article className='hero-findbook1'>
        <h1>Two systems working together <br /> to protect everyone</h1>
      </article>
      <article className='hero-findbook2'>
        <p>FeastSync's trust layer is built on two pillars — KYC identity verification that confirms who you <br />
         are dealing with, and escrow-based payments that protect what you are paying or earning. <br />
         Together they make FEASTSYNC the only platform in Nigeria where booking entertainment <br />
          carries zero financial risk for either party.</p>
      </article>
    </section>
    <section className="steps-section">
  <div className="steps-wrapper">
    {stepData.map((step, index) => (
      <div key={index} className="step-card">
        <span className="step-number">{step.stepNumber}</span>
        <h3 className="step-title">{step.title}</h3>
        <p className="step-description">
          {step.description}
        </p>
        <div className="step-image-container">
          <img
            src={step.image}
            alt=""
            className="step-illustration"
          />
        </div>
      </div>
    ))}
  </div>
</section>
<Readytogetstarted />
    </main>
  )
}

export default Howitworksvescrow