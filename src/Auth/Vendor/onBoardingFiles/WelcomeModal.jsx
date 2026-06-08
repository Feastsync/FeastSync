import React from 'react'
import "./css/Welcome.css"
import { useNavigate } from 'react-router-dom'


const WelcomeModal = ({ vendorName = "Adeyemi", onContinue, onSkip }) => {
  const navigate = useNavigate()
  return (
     <div className="welcome-overlay">
      <div className="welcome-card">
        <h2 className="welcome-title">Welcome, {vendorName}</h2>
        
         <p className="welcome-desc">
           Complete your vendor verification to start receiving bookings and payouts.
       </p>

        <button 
  type="button" 
  className="welcome-btn-primary" 
  onClick={() => {
    console.log("Button clicked, calling onContinue:", onContinue);
    onContinue();
  }}
>
  Continue verification
</button>

        <button type="button" className="welcome-btn-text" onClick={() => navigate("/")}   >
          Skip for now
        </button>
      </div>
    </div>
  )
}

export default WelcomeModal

