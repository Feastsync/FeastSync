
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Css/Vendordashboard.css";
import Vendorheader from "./Vendorheader.jsx";
import Vendorhero from "./Vendorhero.jsx";
import Copyicon from "../../assets/logos/Copyicon.svg";
import Vendorcalendar from "./Vendorcalendar.jsx";
import Vendormediagallery from "./Vendormediagallery.jsx";
import VendorOnboarding from "./onBoardingFiles/VendorOnboarding.jsx";
import BookingModal from "../../Page/Booking/Booking.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getVendorById } from "../../Redux/features/authslice.js";
import VendorDashboardSkeleton from "../../Props/Vendordashboardskeleton.jsx";
import {message} from "antd"
const Vendordashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { slug } = useParams();

  const [expandedCards, setExpandedCards] = useState({});
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [bookingModal, setBookingModal] = useState({ open: false, pricingId: null });

  const {
    vendorInfo,
    currentVendor: viewingVendor,
    currentVendorLoading: viewingVendorLoading,
    isLoggedIn,
    accountType,
    // shouldRefreshVendor
  } = useSelector((state) => state.auth);

  
  const isPublicView =!!slug ||!isLoggedIn;
  const displayVendor = slug
  ? viewingVendor
  : viewingVendor?._id === vendorInfo?._id
  ? viewingVendor
  : vendorInfo;


  const isOwner =
    accountType === "vendor" &&
    isLoggedIn &&
    vendorInfo?._id &&
    displayVendor?._id &&
    vendorInfo._id === displayVendor._id;

  const [vendorName, setVendorName] = useState("");


useEffect(() => {
  if (slug) {
    dispatch(getVendorById(slug));
  } else if (isLoggedIn && accountType === "vendor" && vendorInfo?.slug) {
    dispatch(getVendorById(vendorInfo.slug));
  }
}, [slug, isLoggedIn, accountType, dispatch, vendorInfo?.slug]);

  // useEffect(() => {
  //   if (shouldRefreshVendor) {
  //     dispatch(getCurrentUser());
  //   }
  // }, [shouldRefreshVendor, dispatch]);

  
  useEffect(() => {
    if (!isOwner ||!vendorInfo?._id) {
      setShowOnboarding(false);
      return;
    }

    setVendorName(vendorInfo.stageName || vendorInfo.firstName || "");
    const shouldShow = location.state?.showOnboarding ||!vendorInfo.isOnboarded;
    setShowOnboarding(shouldShow);

    if (location.state?.showOnboarding) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [isOwner, vendorInfo, location.state, navigate, location.pathname]);

 
  useEffect(() => {
    if (!slug &&!isLoggedIn) {
      navigate("/login");
    }
  }, [slug, isLoggedIn, navigate]);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    // if (isOwner) {
    //   dispatch(getCurrentUser());
    // }
  };

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({...prev, [id]:!prev[id] }));
  };
const [messageApi, contextHolder] = message.useMessage();

const handleCopyLink = async () => {
  const link = `https://www.feastsync.com/fs/${displayVendor?.slug}`;
  try {
    await navigator.clipboard.writeText(link);
    messageApi.success('Link copied to clipboard!');
  } catch (err) {
    messageApi.error('Failed to copy link');
  }
};


  const basePackages = [
    { id: "basic", title: "Basic Package", price: "₦0", highlights: [] },
    { id: "standard", title: "Standard Package", price: "₦0", highlights: [] },
    { id: "premium", title: "Premium Package", price: "₦0", highlights: [] },
  ];

  const displayPackages = basePackages.map((base) => {
    const saved = displayVendor?.pricingPackages?.find(
      (p) => (p.packageName || p.pacakageName)?.toLowerCase() === base.id
      
    );
    //  console.log(displayVendor?.pricingPackages)

    if (!saved) return base;

    const rawPrice = saved.packagePrice || saved.price || "0";
    const cleanPrice = rawPrice.toString().replace(/,/g, "").replace("₦", "");
    const formattedPrice = `₦${Number(cleanPrice).toLocaleString()}`;
    const desc = saved.packageDescription || saved.description || "";
    const highlights = desc ? desc.split("\n").filter((l) => l.trim()) : [];

    return {
     ...base,
      savedId: saved._id || null,
      price: formattedPrice,
      highlights,
    };
  });
  //  console.log(displayVendor?.pricingPackages)
  console.log("displayVendor", displayVendor)
console.log("vendorInfo", vendorInfo)

  if (viewingVendorLoading && slug) return <VendorDashboardSkeleton />;
  if (slug &&!viewingVendor &&!viewingVendorLoading)
    return <div className="vendor-error">Vendor not found</div>;
  if (!displayVendor) return <VendorDashboardSkeleton />;

  return (
    <main className="vendordashboard-vendor-dashboard-container">
      <Vendorheader vendor={displayVendor} isOwner={isOwner} />
      <Vendorhero vendor={displayVendor} isOwner={isOwner} />

      <div className="vendordashboard-vendor-details-container">
   
        <div className="vendordashboard-trust-stats">
          <h4 className="vendordashboard-trust-title">Trust Stats</h4>
          <div className="vendordashboard-stats-row">
            <div className="vendordashboard-stat-item">
              <h3>{displayVendor?.rating || 4.9}</h3>
              <div className="vendordashboard-stars">★★★★★</div>
              <span>Rating</span>
            </div>
            <div className="vendordashboard-stat-item">
              <h3>{displayVendor?.reviewCount || 0}</h3>
              <span>Reviews</span>
            </div>
            <div className="vendordashboard-stat-item">
              <h3>{displayVendor?.bookingCount || 0}</h3>
              <span>Bookings</span>
            </div>
           
            {isOwner && (
              <div className="vendordashboard-stat-item">
                <h3>{displayVendor?.responseRate || 98}%</h3>
                <span>Response</span>
              </div>
            )}
          </div>
        </div>

        
        {!isOwner && isLoggedIn && (
          <button
            className="vendordashboard-send-message-btn"
            onClick={() => navigate("/chats", { state: { vendorId: displayVendor?._id } })}
          >
            Send a message
          </button>
        )}

        <div className="vendordashboard-vendor-bio">
          <h3>Bio / About</h3>
          <h4>
            About {displayVendor?.stageName || "Vendor"},{" "}
            {displayVendor?.stateOfResidence || "Lagos"}
          </h4>
          <p>{displayVendor?.bio || "No bio added yet"}</p>
          <div className="vendordashboard-vendor-link-row">
            <span>www.feastsync.com/fs/{displayVendor?.slug}</span>
            <button
              className="vendordashboard-vendorcopy-link-btn"
              onClick={handleCopyLink}
            >
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
                  <h3 className="vendordashboard-package-title">{item.title}</h3>
                  <p className="vendordashboard-package-price">{item.price}</p>
                </div>

                <div className="vendordashboard-card-body-wrapper">
                  <div
                    className={`vendordashboard-card-body ${
                      isExpanded? "vendordashboard-scrollable" : ""
                    }`}
                  >
                    <h4 className="vendordashboard-highlights-heading">
                      Service Highlights
                    </h4>
                    <ul className="vendordashboard-highlights-list">
                      {item.highlights.length > 0 ? (
                        item.highlights.map((highlight, index) => (
                          <li key={index} className="vendordashboard-highlight-item">
                            {highlight}
                          </li>
                        ))
                      ) : (
                        <li className="vendordashboard-highlight-item">
                          No details added yet
                        </li>
                      )}
                    </ul>
                  </div>

                  <button
                    className="vendordashboard-toggle-expand-btn"
                    onClick={() => toggleExpand(item.id)}
                    aria-label={isExpanded ? "Disable scroll" : "Enable scroll"}
                  >
                    <svg
                      className={`vendordashboard-dropdown-icon ${
                        isExpanded? "vendordashboard-open" : ""
                      }`}
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
                 
                  {isOwner? (
                    <button
                      className="vendordashboard-edit-btn"
                      onClick={() => navigate("/vendor/packages")}
                    >
                      Edit Package
                    </button>
                  ) : (
                    <button
                      className="vendordashboard-book-now-btn"
                      disabled={!item.savedId}
                      onClick={() => {
                        if (!isLoggedIn) {
                          navigate("/login", { state: { from: location.pathname } });
                          return;
                        }
                        setBookingModal({ open: true, pricingId: item.savedId });
                      }}
                    >
                      {!item.savedId? "Not Available" : "Book Now"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

   
      <Vendorcalendar vendor={displayVendor} isOwner={isOwner} />
      <Vendormediagallery vendor={displayVendor} isOwner={isOwner} />
      {isOwner && (
        <VendorOnboarding
          isOpen={showOnboarding}
          onClose={handleOnboardingClose}
          vendorName={vendorName}
        />
      )}
      {bookingModal.open && isLoggedIn &&!isOwner && (
        <BookingModal
          vendorName={displayVendor?.stageName || displayVendor?.firstName || "Vendor"}
          vendorId={displayVendor?._id}
          pricingId={bookingModal.pricingId}
          onClose={() => setBookingModal({ open: false, pricingId: null })}
        />
      )}
    </main>
  );
};

export default Vendordashboard;
