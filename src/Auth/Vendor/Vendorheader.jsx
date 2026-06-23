import React, { useState, useEffect } from "react";
import "../Css/Vendorheader.css";
import Headerlogo2 from "../../assets/logos/Headerlogo2.svg";
import Bellicon2 from "../../assets/logos/Bellicon2.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from '../../Redux/app/store'
import { message } from 'antd'
import { MdLogout } from "react-icons/md";
import { logoutUser, getNotifications } from "../../Redux/features/authslice.js";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TbWallet } from "react-icons/tb";

const Vendorheader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(null);

  const {
    vendorInfo,
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
  const showFullHeader = isOwnerOnDashboard;

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
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const openLogoutModal = () => setModal("logout");
  const closeModal = () => setModal(null);
  const closeMenu = () => setIsOpen(false);

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

  return (
    <header className="vendorheader-container">
      <div className="vendorheader-wrapper">

        <div className="vendorheader-left" onClick={() => { navigate("/"); closeMenu(); }}>
          <img src={Headerlogo2} alt="FeastSync Logo" className="logo-img" />
          <h2 className="logo-text">FeastSync</h2>
        </div>

        {showFullHeader && (
          <>
            <div className="vendorheader-desktop-right">
              <button
                className="icon-btn vendor-icon-btn"
                aria-label="Wallet"
                onClick={() => navigate("/wallet/transactions")}
              >
                <TbWallet size={24} className="vendor-header-icon" />
              </button>

              <button
                className="icon-btn vendor-icon-btn"
                aria-label="Chat"
                onClick={() => navigate("/chats")}
              >
                <IoChatbubbleEllipsesOutline size={24} className="vendor-header-icon" />
              </button>

              <button
                className="icon-btn notification-btn vendor-icon-btn"
                aria-label="Notifications"
                onClick={() => navigate("/notifications/all")}
              >
                <div className="icon-wrapper">
                  <img src={Bellicon2} alt="" className="nav-icon" />
                  {unreadCount > 0 && (
                    <span className="notification-badge">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>
              </button>

              <div className="avatar-circle" onClick={openLogoutModal}>
                {getInitials()}
              </div>

              <button
                className="edit-profile-btn"
                onClick={() => navigate("/Settings")}
              >
                Edit Profile
              </button>
            </div>

            <div className="vendorheader-mobile-top">
              <button
                className="mobile-chat-btn"
                aria-label="Chat"
                onClick={() => navigate("/chats")}
              >
                <IoChatbubbleEllipsesOutline size={22} className="vendor-header-icon" />
              </button>

              <button
                className="mobile-notif-btn"
                aria-label="Notifications"
                onClick={() => navigate("/notifications/all")}
              >
                <div className="icon-wrapper">
                  <img src={Bellicon2} alt="" className="nav-icon" />
                  {unreadCount > 0 && (
                    <span className="notification-badge">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>
              </button>

              <button
                className={`hamburger-btn ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <span className="ham-line" />
                <span className="ham-line" />
                <span className="ham-line" />
              </button>
            </div>

            <div className={`vendorheader-drawer ${isOpen ? "active" : ""}`}>
              <nav className="drawer-nav">
                <button
                  className="drawer-nav-item"
                  onClick={() => { navigate("/wallet/transactions"); closeMenu(); }}
                >
                  <TbWallet size={20} className="drawer-nav-icon" />
                  <span>Wallet</span>
                </button>
              </nav>

              <div className="drawer-footer">
                <div className="drawer-avatar-row" onClick={openLogoutModal}>
                  <div className="avatar-circle drawer-avatar">
                    {getInitials()}
                  </div>
                  <div className="drawer-avatar-info">
                    <span className="drawer-avatar-name">
                      {vendorInfo?.stageName || vendorInfo?.firstName || "My Account"}
                    </span>
                    <span className="drawer-avatar-sub">Tap to log out</span>
                  </div>
                  <MdLogout size={18} className="drawer-logout-icon" />
                </div>

                <button
                  className="edit-profile-btn drawer-edit-btn"
                  onClick={() => { navigate("/Settings"); closeMenu(); }}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {isOpen && <div className="drawer-overlay" onClick={closeMenu} />}
          </>
        )}
      </div>

      {modal === "logout" && (
        <div className="vendorlogout-overlay" onClick={closeModal}>
          <div className="vendorlogout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vendorlogout-icon">
              <MdLogout size={28} />
            </div>
            <h3 className="vendorlogout-title">Log out?</h3>
            <p className="vendorlogout-subtitle">
              You'll need to sign in again to access your account.
            </p>
            <div className="vendorlogout-actions">
              <button className="vendorlogout-cancel" onClick={closeModal}>Cancel</button>
              <button className="vendorlogout-confirm" onClick={handleLogout}>Yes, log out</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Vendorheader;