import React from 'react'

import "./Css/Howitworksvendor.css"
import Heroimage from "../../assets/BackgroundImage/heroimage.jpg"
import Button from  "../../Props/Button.jsx"
import Readytogetstarted from "../../Components/Readytogetstarted.jsx"
import { useNavigate } from 'react-router-dom'

const Howitworksvendor = () => {
    const navigate = useNavigate()
    const stepsData = [
    {
      stepNumber: 'Step 1',
      title: 'Create your Sharable Public Profile ',
      description: 'Your entertainer profile is your digital resume on FeastSync. Add your bio, category, photos, video highlights, starting price, minimum hours, and the event types you specialize in',
     image:'https://i.postimg.cc/m27cG9qM/Chiluv.jpg',
    },
    {
      stepNumber: 'Step 2',
      title: 'Complete KYC verification',
      description: 'Submit your NIN/BVN and a selfie for identity verification. Once approved by the FeastSync admin team, you receive a Verified badge that shows on your profile.',
      image:'https://i.postimg.cc/m27cG9qM/Chiluv.jpg',
    },
    {
      stepNumber: 'Step 3',
      title: 'Set your availability calendar',
      description: 'Mark your dates as fully available, or unavailable. Organizers see your live calendar before they send a booking request.',
      image:'https://i.postimg.cc/m27cG9qM/Chiluv.jpg',
    },
    {
      stepNumber: 'Step 4',
      title: 'Receive and review booking requests',
      description: 'Booking requests arrive in your dashboard with full event details — type, date, location, duration, and guest count. Review, accept, or decline.',
      image:'https://i.postimg.cc/m27cG9qM/Chiluv.jpg',
    },
   {
      stepNumber: 'Step 5',
      title: 'Perform and deliver',
      description: 'Show up, perform, and deliver your best. The in-app chat keeps communication with the organizer clean and documented leading up to the event.',
      image:'https://i.postimg.cc/m27cG9qM/Chiluv.jpg',
    },
   {
      stepNumber: 'Step 6',
      title: 'Receive your  payout',
      description: 'Once the organizer confirms the event was completed, escrow releases your 30% balance to your FeastSync wallet instantly. Withdraw to your bank account at any time.',
     image:'https://i.postimg.cc/m27cG9qM/Chiluv.jpg',
    }
  ];
  return (
    
    <main className='main-container'>
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
           <div className="step-btn" onClick={() => navigate("/howitworkshost")}>
        <div className="circle-icon check">✓</div>
        <span>For Organizer/Host</span>
      </div>
        <div className="step-btn active" onClick={() => useNavigate("/howitworksvendor")}>
        <div className="circle-icon">02</div>
        <span>Vendors</span>
        </div>
      <div className="step-btn" onClick={()=> navigate("/howitworksescrow")}>
        <div className="circle-icon">03</div>
        <span>Escrow/Verification</span>
      </div>
    </section>
    <section className='hero-findbook'>
      <article className='hero-findbook1'>
        <h1>Build your reputation. <br /> Get paid without the hassle</h1>
      </article>
      <article className='hero-findbook2'>
        <p>FeastSync gives entertainment professionals a platform that protects their time, guarantees <br />
        their payment, and builds their credibility — all in one place. No middlemen. No chasing <br />
         invoices. Just verified talent, professional bookings, and secured payouts.</p>
      </article>
    </section>
    <section className="steps-section">
  <div className="steps-wrapper">
    {stepsData.map((step, index) => (
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

export default Howitworksvendor