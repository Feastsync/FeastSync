import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom'
import { getCurrentUser } from "../../Redux/features/authslice";
import "../Css/Vendordashoardrating.css"
import Vendorheader from "./Vendorheader.jsx"
import Vendorhero from "./Vendorhero.jsx"
import Copyicon from "../../assets/logos/Copyicon.svg"
import Vendorcalendar from "./Vendorcalendar.jsx"
import Vendormediagallery from "./Vendormediagallery.jsx"
import Ratingandreview from "../../Components/Ratingandreview.jsx"

const Vendordashboardrating = () => {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [expandedCards, setExpandedCards] = useState({});
  const [copySuccess, setCopySuccess] = useState(false);

  const {
    vendorInfo,
    currentVendor,
    pricingPackages,
    isLoggedIn,
    accountType,
    token
  } = useSelector((state) => state.auth);

  
  useEffect(() => {
    if (token && isLoggedIn &&!vendorInfo && accountType === 'vendor') {
      dispatch(getCurrentUser());
    }
  }, [token, isLoggedIn, vendorInfo, accountType, dispatch]);

  const isDashboard = location.pathname === '/vendordashboard' || location.pathname === '/vendor';
  const isPublicView = location.pathname.startsWith('/fs/');

 
  const displayData = isPublicView? currentVendor : vendorInfo;

const isOwner = isLoggedIn && 
                accountType === 'vendor' && 
                (isDashboard || vendorInfo?._id === currentVendor?._id);

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
    ...prev,
      [id]:!prev[id],
    }));
  };

  const handleCopyLink = async () => {
    const link = `${window.location.origin}/fs/${displayData?.slug || ''}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      alert('Failed to copy link');
    }
  };

  const handleBookNow = (pkg) => {
    if (!isLoggedIn) {
      nav('/login', {
        state: {
          redirect: location.pathname,
          message: `Please login to book ${pkg.packageName}`,
          packageId: pkg._id
        }
      });
      return;
    }
    nav('/booking', { state: { package: pkg, vendor: displayData } });
  };

  const handleSendMessage = () => {
    if (!isLoggedIn) {
      nav('/login', {
        state: {
          redirect: location.pathname,
          message: 'Please login to message this vendor'
        }
      });
      return;
    }
    nav('/messages', { state: { vendorId: displayData?._id } });
  };

 
  const packages = pricingPackages?.length
  ? pricingPackages.map(p => ({
        id: p._id,
        title: p.packageName,
        price: `₦${Number(p.packagePrice).toLocaleString()}`,
        highlights: p.packageDescription?.split('\n').filter(Boolean) || [],
        raw: p
      }))
    : [];

  if (!displayData && isPublicView) {
    return (
      <main className='vendordashboardrating-vendor-dashboard-container'>
        <Vendorheader />
        <div className="vendordashboardrating-loading">Loading vendor...</div>
      </main>
    );
  }

  return (
    <main className='vendordashboardrating-vendor-dashboard-container'>
      <Vendorheader />
      <Vendorhero />

      <div className="vendordashboardrating-vendor-details-container">
        <div className="vendordashboardrating-trust-stats">
          <h4 className="vendordashboardrating-trust-title">Trust Stats</h4>
          <div className="vendordashboardrating-stats-row">
            <div className="vendordashboardrating-stat-item">
              <h3>{displayData?.rating || '4.9'}</h3>
              <div className="vendordashboardrating-stars">★★★★★</div>
              <span>Rating</span>
            </div>

            <div className="vendordashboardrating-stat-item">
              <h3>{displayData?.reviewCount || 0}</h3>
              <span>Reviews</span>
            </div>

            <div className="vendordashboardrating-stat-item">
              <h3>{displayData?.bookingCount || 0}</h3>
              <span>Bookings</span>
            </div>

            <div className="vendordashboardrating-stat-item">
              <h3>{displayData?.responseRate || '98%'}</h3>
              <span>Response</span>
            </div>
          </div>
        </div>

        
        {!isOwner && (
          <button
            className="vendordashboardrating-send-message-btn"
            onClick={handleSendMessage}
          >
            Send a message
          </button>
        )}

        <div className="vendordashboardrating-vendor-bio">
          <h3>Bio / About</h3>
          <h4>About {displayData?.stageName || displayData?.businessName || 'Vendor'}, {displayData?.location || 'Lagos'}</h4>
          <p>
            {displayData?.bio || displayData?.about ||
            'No bio available yet. This vendor hasn’t added a description.'}
          </p>

          
          {isLoggedIn && accountType === 'vendor' && isOwner && (
            <div className="vendordashboardrating-vendor-link-row">
              <span>
                {window.location.origin}/fs/{displayData?.slug || ''}
              </span>

              <button
                className="vendordashboardrating-vendorcopy-link-btn"
                onClick={handleCopyLink}
              >
                {copySuccess? 'Copied!' : 'Copy link'}
                <img src={Copyicon} alt="" />
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="vendordashboardrating-pricing-section">
        <h2 className="vendordashboardrating-section-title">Services & Pricing</h2>

        {packages.length === 0? (
          <div className="vendordashboardrating-no-packages">
            {isOwner? 'Add your first pricing package in Settings.' : 'No packages available yet.'}
          </div>
        ) : (
          <div className="vendordashboardrating-pricing-grid">
            {packages.map((item) => {
              const isExpanded =!!expandedCards[item.id];

              return (
                <div key={item.id} className="vendordashboardrating-pricing-card">
                  <div className="vendordashboardrating-card-header">
                    <h3 className="vendordashboardrating-package-title">{item.title}</h3>
                    <p className="vendordashboardrating-package-price">{item.price}</p>
                  </div>

                  <div className="vendordashboardrating-card-body-wrapper">
                    <div className={`vendordashboardrating-card-body ${isExpanded? 'vendordashboardrating-scrollable' : ''}`}>
                      <h4 className="vendordashboardrating-highlights-heading">Service Highlights</h4>
                      <ul className="vendordashboardrating-highlights-list">
                        {item.highlights.map((highlight, index) => (
                          <li key={index} className="vendordashboardrating-highlight-item">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {item.highlights.length > 5 && (
                      <button
                        className="vendordashboardrating-toggle-expand-btn"
                        onClick={() => toggleExpand(item.id)}
                        aria-label={isExpanded? "Collapse" : "Expand"}
                      >
                        <svg
                          className={`vendordashboardrating-dropdown-icon ${isExpanded? "vendordashboardrating-open" : ""}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="vendordashboardrating-card-footer">
                   
                    {!isOwner && (
                      <button
                        className="vendordashboardrating-book-now-btn"
                        onClick={() => handleBookNow(item.raw)}
                      >
                        Book Now
                      </button>
                    )}
                   
                    {isOwner && (
                      <button
                        className="vendordashboardrating-book-now-btn"
                        onClick={() => nav('/Settings')}
                      >
                        Edit Package
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Vendorcalendar vendorId={displayData?._id} />
      <Vendormediagallery vendorId={displayData?._id} />
      <Ratingandreview vendorId={displayData?._id} />
    </main>
  )
}

export default Vendordashboardrating