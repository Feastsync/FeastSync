import React, { useState } from 'react'
import "../Css/Vendordashboard.css"
import Vendorheader from "./Vendorheader.jsx"
import Vendorhero from "./Vendorhero.jsx"
import Copyicon from "../../assets/logos/Copyicon.svg"
import Vendorcalendar from "./Vendorcalendar.jsx"
import Vendormediagallery from "./Vendormediagallery.jsx"


const Vendordashboard = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  const packages = [
    {
      id: 'basic',
      title: 'Basic Package',
      price: '₦350,000',
      highlights: [
        'Professional DJ performance',
        'Up to 4 hours of playtime',
        'Curated playlist based on event type',
        'Basic sound setup',
        'Crowd engagement and music transitions',
        'Pre-event consultation',
        'Arrival and setup before event start'
      ]
    },
    {
      id: 'standard',
      title: 'Standard Package',
      price: '₦550,000',
      highlights: [
        'Professional DJ performance',
        'Up to 6 hours of playtime',
        'Enhanced sound system',
        'Customized playlist and song requests',
        'Wireless microphone for announcements',
        'Basic event coordination with MC',
        'Dance floor crowd engagement',
        'Early venue setup and sound check',
        'Backup music equipments'
      ]
    },
    {
      id: 'premium',
      title: 'Premium Package',
      price: '₦750,000',
      highlights: [
        'Professional DJ performance',
        'Up to 10 hours of coverage',
        'Premium sound system setup',
        'Customized music programming',
        'Advanced lighting effects',
        'Wireless microphones for hosts and speeches',
        'Dedicated event planning consultation',
        'Live mixing and seamless transitions',
        'Priority support before event day',
        'Backup DJ equipment and contingency plan',
        'Extended event coverage flexibility'
      ]
    }
  ];

  return (
    <main className='vendor-dashboard-container'>
      <Vendorheader />
      <Vendorhero />
      
      <div className="vendor-details-container">
        <div className="trust-stats">
          <h4 className="trust-title">Trust Stats</h4>
          <div className="stats-row">
            <div className="stat-item">
              <h3>4.9</h3>
              <div className="stars">★★★★★</div>
              <span>Rating</span>
            </div>

            <div className="stat-item">
              <h3>84</h3>
              <span>Reviews</span>
            </div>

            <div className="stat-item">
              <h3>132</h3>
              <span>Bookings</span>
            </div>

            <div className="stat-item">
              <h3>98%</h3>
              <span>Response</span>
            </div>
          </div>
        </div>

        <button className="send-message-btn">
          Send a message
        </button>

        <div className="vendor-bio">
          <h3>Bio / About</h3>
          <h4>About DJ Kolade, Lagos</h4>
          <p>
            Afrobeats, Amapiano & Afro-fusion specialist with
            8+ years performing at weddings, corporate galas,
            and high-profile Lagos events. Resident DJ at two
            top-tier venues. Known for reading the room and
            keeping energy peaks from intro to send-off.
          </p>

          <div className="vendor-link-row">
            <span>
              ://feastsync.com
            </span>

            <button className="copy-link-btn">
              Copy link
              <img src={Copyicon} alt="" />
            </button>
          </div>
        </div>
      </div>

      <section className="pricing-section">
        <h2 className="section-title">Services & Pricing</h2>
        
        <div className="pricing-grid">
          {packages.map((item) => {
            const isExpanded = !!expandedCards[item.id];
            
            return (
              <div key={item.id} className="pricing-card">
                <div className="card-header">
                  <h3 className="package-title">{item.title}</h3>
                  <p className="package-price">{item.price}</p>
                </div>
      
                <div className="card-body-wrapper">
                  <div className={`card-body ${isExpanded ? 'scrollable' : ''}`}>
                    <h4 className="highlights-heading">Service Highlights</h4>
                    <ul className="highlights-list">
                      {item.highlights.map((highlight, index) => (
                        <li key={index} className="highlight-item">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    className="toggle-expand-btn" 
                    onClick={() => toggleExpand(item.id)}
                    aria-label={isExpanded ? "Disable scroll" : "Enable scroll"}
                  >
                    <svg 
                      className={`dropdown-icon ${isExpanded ? "open" : ""}`} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
                
                <div className="card-footer">
                  <button 
                    className="book-now-btn"
                    onClick={() => alert(`Booking initiated for ${item.title}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Vendorcalendar />
      <Vendormediagallery />
    </main>
  )
}

export default Vendordashboard
