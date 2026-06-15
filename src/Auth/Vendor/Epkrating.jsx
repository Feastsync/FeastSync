import React, { useState, useEffect } from 'react'
import "../Css/Epkrating.css"
import Epkheader from "./Epkheader.jsx"
import Epkhero from "./Epkhero.jsx"
import Copyicon from "../../assets/logos/Copyicon.svg"
import Vendorcalendar from "./Vendorcalendar.jsx"
import Vendormediagallery from "./Vendormediagallery.jsx"
import Ratingandreview from "../../Components/Ratingandreview.jsx"
import VendorOnboarding from "./onBoardingFiles/VendorOnboarding.jsx"
import { useNavigate, useLocation } from 'react-router-dom'

const Epkrating = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedCards, setExpandedCards] = useState({});
    const [vendor, setVendor] = useState({});

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
    <main className='Epkrating-vendor-dashboard-container'>
      <Epkheader />
      <Epkhero />
      
      <div className="Epkrating-vendor-details-container">
        <div className="Epkrating-trust-stats">
          <h4 className="Epkrating-trust-title">Trust Stats</h4>
          <div className="Epkrating-stats-row">
            <div className="Epkrating-stat-item">
              <h3>4.9</h3>
              <div className="Epkrating-stars">★★★★★</div>
              <span>Rating</span>
            </div>

            <div className="Epkrating-stat-item">
              <h3>84</h3>
              <span>Reviews</span>
            </div>

            <div className="Epkrating-stat-item">
              <h3>132</h3>
              <span>Bookings</span>
            </div>

            <div className="Epkrating-stat-item">
              <h3>98%</h3>
              <span>Response</span>
            </div>
          </div>
        </div>

        <button className="Epkrating-send-message-btn" onClick={() => navigate('/chats')}>
          Send a message
        </button>

        <div className="Epkrating-vendor-bio">
          <h3>Bio / About</h3>
          <h4>About DJ Kolade, Lagos</h4>
          <p>
            Afrobeats, Amapiano & Afro-fusion specialist with
            8+ years performing at weddings, corporate galas,
            and high-profile Lagos events. Resident DJ at two
            top-tier venues. Known for reading the room and
            keeping energy peaks from intro to send-off.
          </p>
          <div className="Epkrating-vendor-link-row">
            <span>
              www.feastsync.com/fs/djkolade-c-5278e9d7den6
            </span>

            <button className="Epkrating-vendorcopy-link-btn">
              Copy link
              <img src={Copyicon} alt="" />
            </button>
          </div>
        </div>
      </div>

      <section className="Epkrating-pricing-section">
        <h2 className="Epkrating-section-title">Services & Pricing</h2>
        
        <div className="Epkrating-pricing-grid">
          {packages3.map((item) => {
            const isExpanded = !!expandedCards[item.id];

            return (
              <div key={item.id} className="Epkrating-pricing-card">
                <div className="Epkrating-card-header">
                  <h3 className="Epkrating-package-title">{item.title}</h3>
                  <p className="Epkrating-package-price">{item.price}</p>
                </div>
      
                <div className="Epkrating-card-body-wrapper">
                  <div className={`Epkrating-card-body ${isExpanded ? 'Epkrating-scrollable' : ''}`}>
                    <h4 className="Epkrating-highlights-heading">Service Highlights</h4>
                    <ul className="Epkrating-highlights-list">
                      {item.highlights.map((highlight, index) => (
                        <li key={index} className="Epkrating-highlight-item">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    className="Epkrating-toggle-expand-btn" 
                    onClick={() => toggleExpand(item.id)}
                    aria-label={isExpanded ? "Disable scroll" : "Enable scroll"}
                  >
                    <svg 
                      className={`Epkrating-dropdown-icon ${isExpanded ? "Epkrating-open" : ""}`} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
                
                <div className="Epkrating-card-footer">
                  <button 
                    className="Epkrating-book-now-btn"
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
      <VendorOnboarding
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
        vendorName={vendorName}
      />
    </main>
  )
}

export default Epkrating