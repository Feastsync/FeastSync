import React, { useState, useEffect } from 'react'
import "../Css/Epknorating.css"
import Epkheader from "./Epkheader.jsx"
import Epkhero from "./Epkhero.jsx"
import Copyicon from "../../assets/logos/Copyicon.svg"
import Vendorcalendar from "./Vendorcalendar.jsx"
import Vendormediagallery from "./Vendormediagallery.jsx"
import VendorOnboarding from "./onBoardingFiles/VendorOnboarding.jsx"
import BookingModal from "../../Page/Booking/Booking.jsx"
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import api from '../../Redux/app/axios'

const Epknorating = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { vendorId } = useParams()

  const [expandedCards, setExpandedCards]               = useState({})
  const [showOnboarding, setShowOnboarding]             = useState(false)
  const [onboardingVendorName, setOnboardingVendorName] = useState("")
  const [packages, setPackages]                         = useState([])
  const [pricingLoading, setPricingLoading]             = useState(true)
  const [pricingError, setPricingError]                 = useState(null)
  const [selectedPackage, setSelectedPackage]           = useState(null)

  /* ── fetch pricing ──────────────────────────────────── */
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setPricingLoading(true)
        setPricingError(null)
        const res = await api.get('/all-pricing')
        const all = res.data?.data || res.data || []
        const vendorPackages = all.filter(
          (item) =>
            item.vendorId === vendorId ||
            item.vendor   === vendorId ||
            item.vendor?._id === vendorId
        )
        setPackages(vendorPackages)
      } catch (err) {
        setPricingError(err.response?.data?.message || 'Failed to load pricing')
        console.error('Pricing fetch error:', err)
      } finally {
        setPricingLoading(false)
      }
    }

    if (vendorId) fetchPricing()
  }, [vendorId])

  /* ── onboarding flow ────────────────────────────────── */
  useEffect(() => {
    if (location.state?.showOnboarding) {
      setShowOnboarding(true)
      setOnboardingVendorName(location.state?.vendorName || "Vendor")
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const handleOnboardingClose = () => setShowOnboarding(false)

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  /* ── skeleton card ──────────────────────────────────── */
  const PricingSkeleton = () => (
    <div className="Epknorating-pricing-card Epknorating-skeleton-card">
      <div className="Epknorating-skel-line Epknorating-skel-title shimmer" />
      <div className="Epknorating-skel-line Epknorating-skel-price shimmer" />
      <div className="Epknorating-skel-line shimmer" />
      <div className="Epknorating-skel-line shimmer" />
      <div className="Epknorating-skel-line Epknorating-skel-sm shimmer" />
    </div>
  )

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

        <button
          className="Epknorating-send-message-btn"
          onClick={() => navigate('/chats')}
        >
          Send a message
        </button>

        <div className="Epknorating-vendor-bio">
          <h3>Bio / About</h3>
          <h4>About DJ Kolade, Lagos</h4>
          <p>
            Afrobeats, Amapiano & Afro-fusion specialist with 8+ years
            performing at weddings, corporate galas, and high-profile Lagos
            events. Resident DJ at two top-tier venues. Known for reading
            the room and keeping energy peaks from intro to send-off.
          </p>
          <div className="Epknorating-vendor-link-row">
            <span>www.feastsync.com/fs/djkolade-c-5278e9d7den6</span>
            <button className="Epknorating-vendorcopy-link-btn">
              Copy link
              <img src={Copyicon} alt="" />
            </button>
          </div>
        </div>
      </div>


      <section className="Epknorating-pricing-section">
        <h2 className="Epknorating-section-title">Services & Pricing</h2>

        {pricingError && !pricingLoading && (
          <div className="Epknorating-pricing-state">
            <p>{pricingError}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {!pricingLoading && !pricingError && packages.length === 0 && (
          <div className="Epknorating-pricing-state">
            <p>No pricing packages available yet.</p>
          </div>
        )}

        <div className="Epknorating-pricing-grid">
          {pricingLoading && [0, 1, 2].map((i) => <PricingSkeleton key={i} />)}

          {!pricingLoading && packages.map((item) => {
            const isExpanded = !!expandedCards[item._id]
            const highlights = item.highlights || item.features || item.services || []
            const price = item.price
              ? `₦${Number(item.price).toLocaleString()}`
              : item.amount
              ? `₦${Number(item.amount).toLocaleString()}`
              : ''

            return (
              <div key={item._id} className="Epknorating-pricing-card fade-in">
                <div className="Epknorating-card-header">
                  <h3 className="Epknorating-package-title">
                    {item.title || item.packageName || item.name}
                  </h3>
                  <p className="Epknorating-package-price">{price}</p>
                </div>

                <div className="Epknorating-card-body-wrapper">
                  <div className={`Epknorating-card-body ${isExpanded ? 'Epknorating-scrollable' : ''}`}>
                    <h4 className="Epknorating-highlights-heading">Service Highlights</h4>
                    <ul className="Epknorating-highlights-list">
                      {highlights.map((h, idx) => (
                        <li key={idx} className="Epknorating-highlight-item">{h}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className="Epknorating-toggle-expand-btn"
                    onClick={() => toggleExpand(item._id)}
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    <svg
                      className={`Epknorating-dropdown-icon ${isExpanded ? "Epknorating-open" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>

                <div className="Epknorating-card-footer">
                  <button
                    className="Epknorating-book-now-btn"
                    onClick={() => setSelectedPackage(item)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <Vendorcalendar />
      <Vendormediagallery />


      {selectedPackage && (
        <BookingModal
          pricingId={selectedPackage._id}
          vendorId={vendorId}
          vendorName={selectedPackage.vendorName || "the vendor"}
          onClose={() => setSelectedPackage(null)}
        />
      )}

      <VendorOnboarding
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
        vendorName={onboardingVendorName}
      />
    </main>
  )
}

export default Epknorating