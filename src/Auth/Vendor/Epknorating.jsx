import React, { useState, useEffect } from 'react'
import "../Css/Epknorating.css"
import Epkheader from "./Epkheader.jsx"
import Epkhero from "./Epkhero.jsx"
import Copyicon from "../../assets/logos/Copyicon.svg"
import Vendorcalendar from "./Vendorcalendar.jsx"
import Vendormediagallery from "./Vendormediagallery.jsx"
import VendorOnboarding from "./onBoardingFiles/VendorOnboarding.jsx"
import { useNavigate, useLocation } from 'react-router-dom'

const Epknorating = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedCards, setExpandedCards] = useState({});
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [vendorName, setVendorName] = useState("")

  useEffect(() => {
    if (location.state?.showOnboarding) {
      setShowOnboarding(true)
      setVendorName(location.state?.vendorName || "Vendor")
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const handleOnboardingClose = () => {
    setShowOnboarding(false)
  }

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const packages3 = [
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
    <main className='Epknorating-vendor-dashboard-container'>
      <Epkheader />
      <Epkhero />
      
      <div className="Epknorating-vendor-details-container">
        <div className="Epknorating-trust-stats">
          <h4 className="Epknorating-trust-title">Trust Stats</h4>
          <div className="Epknorating-stats-row">
            <div className="Epknorating-stat-item">
              <h3>0</h3>
              <div className="Epknorating-stars">★★★★★</div>
              <span>Rating</span>
            </div>

            <div className="Epknorating-stat-item">
              <h3>0</h3>
              <span>Reviews</span>
            </div>

            <div className="Epknorating-stat-item">
              <h3>0</h3>
              <span>Bookings</span>
            </div>

            <div className="Epknorating-stat-item">
              <h3>98%</h3>
              <span>Response</span>
            </div>
          </div>
        </div>

        <button className="Epknorating-send-message-btn" onClick={() => navigate('/chats')}>
          Send a message
        </button>

        <div className="Epknorating-vendor-bio">
          <h3>Bio / About</h3>
          <h4>About DJ Kolade, Lagos</h4>
          <p>
            Afrobeats, Amapiano & Afro-fusion specialist with
            8+ years performing at weddings, corporate galas,
            and high-profile Lagos events. Resident DJ at two
            top-tier venues. Known for reading the room and
            keeping energy peaks from intro to send-off.
          </p>
          <div className="Epknorating-vendor-link-row">
            <span>
              www.feastsync.com/fs/djkolade-c-5278e9d7den6
            </span>

            <button className="Epknorating-vendorcopy-link-btn">
              Copy link
              <img src={Copyicon} alt="" />
            </button>
          </div>
        </div>
      </div>

      <section className="Epknorating-pricing-section">
        <h2 className="Epknorating-section-title">Services & Pricing</h2>
        
        <div className="Epknorating-pricing-grid">
          {packages3.map((item) => {
            const isExpanded = !!expandedCards[item.id];

            return (
              <div key={item.id} className="Epknorating-pricing-card">
                <div className="Epknorating-card-header">
                  <h3 className="Epknorating-package-title">{item.title}</h3>
                  <p className="Epknorating-package-price">{item.price}</p>
                </div>
      
                <div className="Epknorating-card-body-wrapper">
                  <div className={`Epknorating-card-body ${isExpanded ? 'Epknorating-scrollable' : ''}`}>
                    <h4 className="Epknorating-highlights-heading">Service Highlights</h4>
                    <ul className="Epknorating-highlights-list">
                      {item.highlights.map((highlight, index) => (
                        <li key={index} className="Epknorating-highlight-item">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    className="Epknorating-toggle-expand-btn" 
                    onClick={() => toggleExpand(item.id)}
                    aria-label={isExpanded ? "Disable scroll" : "Enable scroll"}
                  >
                    <svg 
                      className={`Epknorating-dropdown-icon ${isExpanded ? "Epknorating-open" : ""}`} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
                
                <div className="Epknorating-card-footer">
                  <button 
                    className="Epknorating-book-now-btn"
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

      <VendorOnboarding
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
        vendorName={vendorName}
      />
    </main>
  )
}

export default Epknorating