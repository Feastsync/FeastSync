import React, { useState, useEffect } from "react";
import "../Css/Vendorheader.css";
import Headerlogo2 from "../../assets/logos/Headerlogo2.svg";
import Bellicon2 from "../../assets/logos/Bellicon2.svg";
import Messageicon from "../../assets/logos/Messageicon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import { persistor } from '../../Redux/app/store'
import api from '../../Redux/app/axios'
import { message } from 'antd'
import { MdLogout } from "react-icons/md";
import { logoutUser, getNotifications } from "../../Redux/features/authslice.js";
// import { getNotifications } from "../../Redux/features/authslice.js";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
// import { getNotifications } from "../../Redux/features/authslice.js";

const Vendorheader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(null);

  const {
    vendorInfo,
    currentVendor,
    isLoggedIn,
    accountType,
    notifications = [],
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && notifications.length === 0) {
      dispatch(getNotifications());
    }
  }, [dispatch, isLoggedIn, notifications.length]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const isDashboard =
    location.pathname === "/vendordashboard" ||
    location.pathname === "/vendor";
  const isOwnerOnDashboard = isLoggedIn && accountType === "vendor" && isDashboard;
  const isOwnerOnPublicPage =
    isLoggedIn &&
    accountType === "vendor" &&
    currentVendor?._id &&
    vendorInfo?._id === currentVendor?._id;

  const isOwner = isOwnerOnDashboard || isOwnerOnPublicPage;
  const showFullHeader = isOwnerOnDashboard;
  // const [showLogout, setShowLogout] = useState(false);

  const getInitials = () => {
    const name =
      vendorInfo?.stageName ||
      vendorInfo?.firstName ||
      vendorInfo?.businessName ||
      "";
    if (!name) return "FS";
    const names = name.trim().split(/\s+/);
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const openLogoutModal = () => {
  setModal("logout");
};

const closeModal = () => {
  setModal(null);
};

const handleLogout = async () => {
  try {
    await dispatch(logoutUser()).unwrap();
    message.success("Logged out successfully");
    closeModal();
    navigate("/login");
  } catch (err) {
    await persistor.purge();
    closeModal();
    navigate("/login");
  }
};

  //  const handleLogout = async () => {
  //     try {
  //       await dispatch(logoutUser()).unwrap()
  //       message.success('Logged out successfully')
  //       navigate('/login')
  //     } catch (err) {
  //       await persistor.purge()
  //       navigate('/login')
  //     }
  //   }

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="vendorheader-container">
      <div className="vendorheader-wrapper">
        <div
          className="vendorheader-left"
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
        >
          <img src={Headerlogo2} alt="FeastSync Logo" className="logo-img" />
          <h2 className="logo-text">FeastSync</h2>
        </div>

        {showFullHeader && (
          <>
            <div className={`vendorheader-right ${isOpen ? "active" : ""}`}>

             
              <button
                className="icon-btn"
                aria-label="Wallet"
                onClick={() => {
                  navigate("/wallet/transactions");
                  closeMenu();
                }}
              >
                <img src={Messageicon} alt="" className="nav-icon1" />
                <span className="vendorheader-navLabel">Wallet</span>
              </button>

             
              <button
                className="icon-btn"
                aria-label="Chat"
                onClick={() => {
                  navigate("/chats");
                  closeMenu();
                }}
              >
                <IoChatbubbleEllipsesOutline
                  size={28}
                  color="white"
                  className="nav-icon1"
                />
                <span className="vendorheader-navLabel">Chat</span>
              </button>

          
              <button
                className="icon-btn notification-btn"
                aria-label="Notifications"
                onClick={() => {
                  navigate("/notifications/all");
                  closeMenu();
                }}
              >
                <div className="icon-wrapper">
                  <img src={Bellicon2} alt="" className="nav-icon" />
                  {unreadCount > 0 && (
                    <span className="notification-badge">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>
                <span className="vendorheader-navLabel">Notifications</span>
              </button>

             <div className="vendorheader-footerActions">
  {/* Avatar */}
  <div
    className="avatar-circle"
    onClick={openLogoutModal}
  >
    {getInitials()}
  </div>

  {/* Logout Modal */}
  {modal === "logout" && (
    <div
      className="vendorlogout-overlay"
      onClick={closeModal}
    >
      <div
        className="vendorlogout-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="vendorlogout-icon">
          <MdLogout size={28} />
        </div>

        <h3 className="vendorlogout-title">
          Log out?
        </h3>

        <p className="vendorlogout-subtitle">
          You'll need to sign in again to access your account.
        </p>

        <div className="vendorlogout-actions">
          <button
            className="vendorlogout-cancel"
            onClick={closeModal}
          >
            Cancel
          </button>

          <button
            className="vendorlogout-confirm"
            onClick={handleLogout}
          >
            Yes, log out
          </button>
        </div>
      </div>
    </div>
  )}

  <button
    className="edit-profile-btn"
    onClick={() => {
      navigate("/Settings");
      closeMenu();
    }}
  >
    Edit Profile
  </button>
</div>
            </div>

            <div
              className="vendorheader_menuIcon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Vendorheader;