import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
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
import { message } from "antd";

const Vendordashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { slug } = useParams();

  const hasFetchedRef = useRef(false);

  const [expandedCards, setExpandedCards] = useState({});
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [bookingModal, setBookingModal] = useState({
    open: false,
    pricingId: null,
  });

  const {
    vendorInfo,
    currentVendor: viewingVendor,
    currentVendorLoading: viewingVendorLoading,
    isLoggedIn,
    accountType,
  } = useSelector((state) => state.auth);

  // ✅ SAFE FETCH (ONLY ONE EFFECT)
  useEffect(() => {
    if (hasFetchedRef.current) return;
    if (!slug && !isLoggedIn) return;

    hasFetchedRef.current = true;

    if (slug) {
      dispatch(getVendorById(slug));
    } else if (isLoggedIn && accountType === "vendor") {
      if (vendorInfo?.slug) {
        dispatch(getVendorById(vendorInfo.slug));
      }
    }
  }, [slug, isLoggedIn, accountType, dispatch, vendorInfo?.slug]);

  useEffect(() => {
    if (!slug && !isLoggedIn) return;
    if (hasFetchedRef.current) return;

    hasFetchedRef.current = true;

    const targetSlug = slug || vendorInfo?.slug;

    if (targetSlug) {
      dispatch(getVendorById(targetSlug));
    }
  }, [slug, isLoggedIn, dispatch]);

  const isOwner =
    accountType === "vendor" &&
    isLoggedIn &&
    vendorInfo?._id &&
    displayVendor?._id &&
    vendorInfo._id === displayVendor._id;

  const [vendorName, setVendorName] = useState("");

  // onboarding logic
  useEffect(() => {
    if (!isOwner || !vendorInfo?._id) {
      setShowOnboarding(false);
      return;
    }

    setVendorName(vendorInfo.stageName || vendorInfo.firstName || "");

    const shouldShow =
      location.state?.showOnboarding || !vendorInfo.isOnboarded;

    setShowOnboarding(shouldShow);

    if (location.state?.showOnboarding) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [isOwner, vendorInfo, location.state, navigate, location.pathname]);

  useEffect(() => {
    if (!slug && !isLoggedIn) {
      navigate("/login");
    }
  }, [slug, isLoggedIn, navigate]);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    if (isOwner && vendorInfo?.slug) {
      dispatch(getVendorById(vendorInfo.slug));
    }
  };

  const toggleExpand = useCallback((id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const [messageApi, contextHolder] = message.useMessage();

  const handleCopyLink = useCallback(async () => {
    const link = `https://www.feastsync.com/fs/${displayVendor?.slug}`;
    try {
      await navigator.clipboard.writeText(link);
      messageApi.success("Link copied to clipboard!");
    } catch (err) {
      messageApi.error("Failed to copy link");
    }
  }, [displayVendor, messageApi]);

  const basePackages = useMemo(
    () => [
      { id: "basic", title: "Basic Package", price: "₦0", highlights: [] },
      {
        id: "standard",
        title: "Standard Package",
        price: "₦0",
        highlights: [],
      },
      { id: "premium", title: "Premium Package", price: "₦0", highlights: [] },
    ],
    [],
  );

  const displayPackages = useMemo(() => {
    return basePackages.map((base) => {
      const saved = displayVendor?.pricingId?.find(
        (p) => p.packageName?.toLowerCase() === base.id,
      );

      if (!saved) return base;

      const rawPrice = saved.packagePrice || saved.price || "0";
      const cleanPrice = rawPrice.toString().replace(/,/g, "").replace("₦", "");
      const formattedPrice = `₦${Number(cleanPrice).toLocaleString()}`;

      const desc = saved.packageDescription || saved.description || "";
      const highlights = desc ? desc.split("\n").filter(Boolean) : [];

      return {
        ...base,
        savedId: saved._id || null,
        price: formattedPrice,
        highlights,
      };
    });
  }, [basePackages, displayVendor]);

  if (viewingVendorLoading && slug) return <VendorDashboardSkeleton />;
  if (slug && !viewingVendor && !viewingVendorLoading)
    return <div className="vendor-error">Vendor not found</div>;
  if (!displayVendor) return <VendorDashboardSkeleton />;

  return (
    <main className="vendordashboard-vendor-dashboard-container">
      {contextHolder}

      <Vendorheader vendor={displayVendor} isOwner={isOwner} />
      <Vendorhero vendor={displayVendor} isOwner={isOwner} />

      <div className="vendordashboard-vendor-details-container">
        <div className="vendordashboard-trust-stats">
          <h4>Trust Stats</h4>

          <div className="vendordashboard-stats-row">
            <div className="vendordashboard-stat-item">
              <h3>{displayVendor?.rating || 4.9}</h3>
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
          </div>
        </div>

        {!isOwner && isLoggedIn && (
          <button
            onClick={() =>
              navigate("/chats", { state: { vendorId: displayVendor?._id } })
            }
          >
            Send a message
          </button>
        )}

        <div>
          <h3>Bio</h3>
          <p>{displayVendor?.bio || "No bio added yet"}</p>

          <button onClick={handleCopyLink}>
            Copy link <img src={Copyicon} alt="" />
          </button>
        </div>
      </div>

      <section>
        <h2>Services & Pricing</h2>

        <div>
          {displayPackages.map((item) => {
            const isExpanded = expandedCards[item.id];

            return (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.price}</p>

                <ul>
                  {item.highlights.length ? (
                    item.highlights.map((h, i) => <li key={i}>{h}</li>)
                  ) : (
                    <li>No details added</li>
                  )}
                </ul>

                <button onClick={() => toggleExpand(item.id)}>Toggle</button>
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

      {bookingModal.open && isLoggedIn && !isOwner && (
        <BookingModal
          vendorName={displayVendor?.stageName || "Vendor"}
          vendorId={displayVendor?._id}
          pricingId={bookingModal.pricingId}
          onClose={() => setBookingModal({ open: false, pricingId: null })}
        />
      )}
    </main>
  );
};

export default Vendordashboard;
