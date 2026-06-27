import "../Css/Userdashboard.css";
import { useEffect, useState, useRef } from "react";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../Redux/app/socketAxios";
import { getCurrentUser } from "../../Redux/features/authslice";

const Userdashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, dashboardStats } = useSelector((state) => state.auth);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [markingDelivered, setMarkingDelivered] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/api/v1/bookings/client");
        const data = res.data?.bookings || res.data?.data || [];
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (!dashboardStats) {
      dispatch(getCurrentUser());
    }
  }, [dashboardStats, dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openDropdown !== null) {
        const ref = dropdownRefs.current[openDropdown];
        if (ref && !ref.contains(e.target)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleMarkDelivered = async (e, bookingId) => {
    e.stopPropagation();
    try {
      setMarkingDelivered(bookingId);
      await api.put(`/api/v1/bookings/service-delivered/${bookingId}`);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId
            ? { ...b, bookingStatus: "completed", status: "completed" }
            : b
        )
      );
      setOpenDropdown(null);
    } catch (err) {
      console.error("Failed to mark as delivered:", err);
    } finally {
      setMarkingDelivered(null);
    }
  };

  const computedTotalSpent = bookings
    .filter((b) => (b.bookingStatus || b.status)?.toLowerCase() === "completed")
    .reduce((sum, b) => sum + (b.totalAmount || b.amount || b.packagePrice || 0), 0);

  const totalSpent = Number(dashboardStats?.totalSpent ?? computedTotalSpent) || 0;
  const totalEvents = dashboardStats?.eventCount || dashboardStats?.totalBookings || bookings.length;

  const activeBookings = bookings.filter((b) => {
    const status = (b.bookingStatus || b.status)?.toLowerCase();
    return status !== "cancelled";
  });

  return (
    <main className="user-dashboard-container userdashboard">
      <Header />

      <section className="user-dashboard-content">
        <section className="user-dashboard-wrapper">
          <section className="user-dashboard-contentleft1">
            <h2>Welcome, {userInfo?.firstName}</h2>
            <div className="user-dashboard-contetnt-text">
              Welcome back! Explore our vendors and start booking the <br />
              industry's best talent right now.
            </div>
          </section>
        </section>

        <section className="user-dashboard-contentright2">
          <section className="user-dashboard-contentright2-wrapper">
            <div className="user-dashboard-contentright2-left">
              <p>Event hosted</p>
              <h2>{loading ? "..." : totalEvents}</h2>
            </div>
            <div className="user-dashboard-contentright2-middle">
              <p>Total Spent</p>
              <h2>₦{loading ? "..." : totalSpent.toLocaleString()}</h2>
            </div>
            <div className="user-dashboard-contentright2-right">
              <p>Review/Rating Given</p>
              <h2>0</h2>
            </div>
          </section>
        </section>
      </section>

      <section className="user-dashboard-hero">
        {loading ? (
          <section className="user-dashboard-hero-wrapper">
            <h1>Loading your bookings...</h1>
          </section>
        ) : activeBookings.length === 0 ? (
          <section className="user-dashboard-hero-wrapper">
            <h1>No Upcoming Event</h1>
            <h5>
              You haven't scheduled any event yet. Create one now by booking a vendor
            </h5>
            <p onClick={() => navigate("/vendors")}>Explore Vendors</p>
          </section>
        ) : (
          <div className="udb-section">
            <h3 className="udb-section-title">Your Bookings</h3>
            <div className="udb-grid">
              {activeBookings.map((booking) => {
                const status = (
                  booking.bookingStatus || booking.status || "pending"
                ).toLowerCase();

                const canReview = status === "confirmed" || status === "completed";
                const canMarkDelivered = status === "confirmed" || status === "accepted";

                return (
                  <div
                    key={booking._id}
                    className="udb-card"
                    onClick={() => navigate(`/chats/${booking._id}`)}
                  >
                    {/* Top row: avatar + dropdown */}
                    <div className="udb-card__top">
                      <div className="udb-card__avatar">
                        {booking.vendorId?.stageName?.charAt(0) || "V"}
                      </div>

                      {/* Delivered dropdown - only show when relevant */}
                      {canMarkDelivered && (
                        <div
                          className="udb-delivered-wrapper"
                          ref={(el) => (dropdownRefs.current[booking._id] = el)}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="udb-delivered-trigger"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(
                                openDropdown === booking._id ? null : booking._id
                              );
                            }}
                          >
                            ••• 
                          </button>

                          {openDropdown === booking._id && (
                            <div className="udb-delivered-dropdown">
                              <p className="udb-delivered-dropdown__label">
                                Confirm service delivery?
                              </p>
                              <p className="udb-delivered-dropdown__sub">
                                This will release payment to the vendor.
                              </p>
                              <button
                                className="udb-delivered-dropdown__btn"
                                disabled={markingDelivered === booking._id}
                                onClick={(e) => handleMarkDelivered(e, booking._id)}
                              >
                                {markingDelivered === booking._id
                                  ? "Processing..."
                                  : "✓ Mark as Delivered"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="udb-card__body">
                      <h4 className="udb-card__vendor">
                        {booking.vendorId?.stageName || "Vendor"}
                      </h4>
                      <p className="udb-card__event">{booking.eventType || "Event"}</p>
                      <p className="udb-card__date">
                        📅{" "}
                        {booking.eventDate
                          ? new Date(booking.eventDate).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "Date TBD"}
                      </p>
                    </div>

                    <div className="udb-card__footer">
                      <span className={`udb-card__status udb-status--${status}`}>
                        {status}
                      </span>
                      <div className="udb-card__actions">
                        {canReview && (
                          <button
                            className="udb-card__review-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/ratingreview/${booking._id}`, {
                                state: {
                                  vendorName: booking.vendorId?.stageName || "Vendor",
                                  eventType: booking.eventType || "",
                                  bookingRef: booking.bookingRef || booking._id,
                                },
                              });
                            }}
                          >
                            leave a review
                          </button>
                        )}
                        <span className="udb-card__cta">Open Chat →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Userdashboard;