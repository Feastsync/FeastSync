import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../Css/Vendordashboard.css";
import Vendorheader from "./Vendorheader.jsx";
import Vendorhero from "./Vendorhero.jsx";
import Copyicon from "../../assets/logos/Copyicon.svg";
import Vendorcalendar from "./Vendorcalendar.jsx";
import Vendormediagallery from "./Vendormediagallery.jsx";
import VendorOnboarding from "./onBoardingFiles/VendorOnboarding.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const Vendordashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedCards, setExpandedCards] = useState({});
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { pricingPackages, vendorInfo } = useSelector((state) => state.auth); // Keep this line
  const [vendorName, setVendorName] = useState(
    vendorInfo?.stageName || vendorInfo?.firstName || "",
  );
  console.log(vendorInfo);
  useEffect(() => {
    if (location.state?.showOnboarding) {
      setShowOnboarding(true);
      if (location.state?.vendorName) setVendorName(location.state.vendorName);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
  };

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const basePackages = [
    {
      id: "basic",
      title: "Basic Package",
      price: "₦350,000",
      highlights: [
        "Professional DJ performance",
        "Up to 4 hours of playtime",
        "Curated playlist based on event type",
        "Basic sound setup",
        "Crowd engagement and music transitions",
        "Pre-event consultation",
        "Arrival and setup before event start",
      ],
    },
    {
      id: "standard",
      title: "Standard Package",
      price: "₦550,000",
      highlights: ["Professional DJ performance"],
    },
    {
      id: "premium",
      title: "Premium Package",
      price: "₦750,000",
      highlights: [
        "Professional DJ performance",
        "Up to 10 hours of coverage",
        "Premium sound system setup",
        "Customized music programming",
        "Advanced lighting effects",
        "Wireless microphones for hosts and speeches",
        "Dedicated event planning consultation",
        "Live mixing and seamless transitions",
        "Priority support before event day",
        "Backup DJ equipment and contingency plan",
        "Extended event coverage flexibility",
      ],
    },
  ];

  // Only show packages that exist in the pricingPackages array from Redux
  const displayPackages = basePackages.map((base) => {
    const saved = pricingPackages?.find(
      (p) => (p.packageName || p.pacakageName)?.toLowerCase() === base.id,
    );

    if (!saved) {
      return base;
    }

    // Sanitize and format the price from Redux
    const rawPrice = saved.packagePrice || saved.price || "0";
    const cleanPrice = rawPrice.toString().replace(/,/g, "").replace("₦", "");
    const formattedPrice = `₦${Number(cleanPrice).toLocaleString()}`;

    // Use the saved description as highlights (split by lines)
    const desc = saved.packageDescription || saved.description || "";
    const highlights = desc
      ? desc.split("\n").filter((l) => l.trim())
      : base.highlights;

    return {
      ...base,
      price: formattedPrice,
      highlights: highlights,
    };
  });

  return (
    <main className="vendordashboard-vendor-dashboard-container">
      <Vendorheader />
      <Vendorhero />

      <div className="vendordashboard-vendor-details-container">
        <div className="vendordashboard-trust-stats">
          <h4 className="vendordashboard-trust-title">Trust Stats</h4>
          <div className="vendordashboard-stats-row">
            <div className="vendordashboard-stat-item">
              <h3>4.9</h3>
              <div className="vendordashboard-stars">★★★★★</div>
              <span>Rating</span>
            </div>

            <div className="vendordashboard-stat-item">
              <h3>84</h3>
              <span>Reviews</span>
            </div>

            <div className="vendordashboard-stat-item">
              <h3>132</h3>
              <span>Bookings</span>
            </div>

            <div className="vendordashboard-stat-item">
              <h3>98%</h3>
              <span>Response</span>
            </div>
          </div>
        </div>

        <button
          className="vendordashboard-send-message-btn"
          onClick={() => navigate("/chats")}
        >
          Send a message
        </button>

        <div className="vendordashboard-vendor-bio">
          <h3>Bio / About</h3>
          <h4>About DJ Kolade, Lagos</h4>
          <p>
            Afrobeats, Amapiano & Afro-fusion specialist with 8+ years
            performing at weddings, corporate galas, and high-profile Lagos
            events. Resident DJ at two top-tier venues. Known for reading the
            room and keeping energy peaks from intro to send-off.
          </p>
          <div className="vendordashboard-vendor-link-row">
            <span>www.feastsync.com/fs/djkolade-c-5278e9d7den6</span>

            <button className="vendordashboard-vendorcopy-link-btn">
              Copy link
              <img src={Copyicon} alt="" />
            </button>
          </div>
        </div>
      </div>

      <section className="vendordashboard-pricing-section">
        <h2 className="vendordashboard-section-title">Services & Pricing</h2>

        <div className="vendordashboard-pricing-grid">
          {displayPackages.map((item) => {
            const isExpanded = !!expandedCards[item.id];

            return (
              <div key={item.id} className="vendordashboard-pricing-card">
                <div className="vendordashboard-card-header">
                  <h3 className="vendordashboard-package-title">
                    {item.title}
                  </h3>
                  <p className="vendordashboard-package-price">{item.price}</p>
                </div>

                <div className="vendordashboard-card-body-wrapper">
                  <div
                    className={`vendordashboard-card-body ${isExpanded ? "vendordashboard-scrollable" : ""}`}
                  >
                    <h4 className="vendordashboard-highlights-heading">
                      Service Highlights
                    </h4>
                    <ul className="vendordashboard-highlights-list">
                      {item.highlights.map((highlight, index) => (
                        <li
                          key={index}
                          className="vendordashboard-highlight-item"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className="vendordashboard-toggle-expand-btn"
                    onClick={() => toggleExpand(item.id)}
                    aria-label={isExpanded ? "Disable scroll" : "Enable scroll"}
                  >
                    <svg
                      className={`vendordashboard-dropdown-icon ${isExpanded ? "vendordashboard-open" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>

                <div className="vendordashboard-card-footer">
                  <button
                    className="vendordashboard-book-now-btn"
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
  );
};

export default Vendordashboard;
