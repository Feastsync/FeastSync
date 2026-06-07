import React, { useState } from 'react'
import "../Css/Vendordashoardrating.css"
import Vendorheader from "./Vendorheader.jsx"
import Vendorhero from "./Vendorhero.jsx"
import Copyicon from "../../assets/logos/Copyicon.svg"
import Vendorcalendar from "./Vendorcalendar.jsx"
import Vendormediagallery from "./Vendormediagallery.jsx"
import Ratingandreview from "../../Components/Ratingandreview.jsx"
import { useNavigate } from 'react-router-dom'


const Vendordashboardrating = () => {
  const nav = useNavigate()
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
    <main className='vendordashboardrating-vendor-dashboard-container'>
      <Vendorheader />
      <Vendorhero />
      
      <div className="vendordashboardrating-vendor-details-container">
        <div className="vendordashboardrating-trust-stats">
          <h4 className="vendordashboardrating-trust-title">Trust Stats</h4>
          <div className="vendordashboardrating-stats-row">
            <div className="vendordashboardrating-stat-item">
              <h3>4.9</h3>
              <div className="vendordashboardrating-stars">★★★★★</div>
              <span>Rating</span>
            </div>

            <div className="vendordashboardrating-stat-item">
              <h3>84</h3>
              <span>Reviews</span>
            </div>

            <div className="vendordashboardrating-stat-item">
              <h3>132</h3>
              <span>Bookings</span>
            </div>

            <div className="vendordashboardrating-stat-item">
              <h3>98%</h3>
              <span>Response</span>
            </div>
          </div>
        </div>

        <button className="vendordashboardrating-send-message-btn">
          Send a message
        </button>

        <div className="vendordashboardrating-vendor-bio">
          <h3>Bio / About</h3>
          <h4>About DJ Kolade, Lagos</h4>
          <p>
            Afrobeats, Amapiano & Afro-fusion specialist with
            8+ years performing at weddings, corporate galas,
            and high-profile Lagos events. Resident DJ at two
            top-tier venues. Known for reading the room and
            keeping energy peaks from intro to send-off.
          </p>

          <div className="vendordashboardrating-vendor-link-row">
            <span>
              www.feastsync.com/fs/djkolade-c-5278e9d7den6
            </span>

            <button className="vendordashboardrating-vendorcopy-link-btn">
              Copy link
              <img src={Copyicon} alt="" />
            </button>
          </div>
        </div>
      </div>

      <section className="vendordashboardrating-pricing-section">
        <h2 className="vendordashboardrating-section-title">Services & Pricing</h2>
        
        <div className="vendordashboardrating-pricing-grid">
          {packages.map((item) => {
            const isExpanded = !!expandedCards[item.id];
            
            return (
              <div key={item.id} className="vendordashboardrating-pricing-card">
                <div className="vendordashboardrating-card-header">
                  <h3 className="vendordashboardrating-package-title">{item.title}</h3>
                  <p className="vendordashboardrating-package-price">{item.price}</p>
                </div>
      
                <div className="vendordashboardrating-card-body-wrapper">
                  <div className={`vendordashboardrating-card-body ${isExpanded ? 'vendordashboardrating-scrollable' : ''}`}>
                    <h4 className="vendordashboardrating-highlights-heading">Service Highlights</h4>
                    <ul className="vendordashboardrating-highlights-list">
                      {item.highlights.map((highlight, index) => (
                        <li key={index} className="vendordashboardrating-highlight-item">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    className="vendordashboardrating-toggle-expand-btn" 
                    onClick={() => toggleExpand(item.id)}
                    aria-label={isExpanded ? "Disable scroll" : "Enable scroll"}
                  >
                    <svg 
                      className={`vendordashboardrating-dropdown-icon ${isExpanded ? "vendordashboardrating-open" : ""}`} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
                
                <div className="vendordashboardrating-card-footer">
                  <button 
                    className="vendordashboardrating-book-now-btn"
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
      <Ratingandreview />
    </main>
  )
}

export default Vendordashboardrating
