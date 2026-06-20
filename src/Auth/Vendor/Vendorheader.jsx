// import React, { useState, useEffect } from "react";
// import "../Css/Vendorheader.css";
// import Headerlogo2 from "../../assets/logos/Headerlogo2.svg";
// import Bellicon2 from "../../assets/logos/Bellicon2.svg";
// import Messageicon from "../../assets/logos/Messageicon.svg";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux"; 
// import { FaBars, FaTimes } from "react-icons/fa";
// import { getNotifications } from "../../Redux/features/authslice.js"; 

// const Vendorheader = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch(); 

//   const {
//     vendorInfo,
//     currentVendor,
//     isLoggedIn,
//     accountType,
//     notifications = [] 
//   } = useSelector((state) => state.auth);


//   useEffect(() => {
//     if (isLoggedIn && notifications.length === 0) {
//       dispatch(getNotifications());
//     }
//   }, [dispatch, isLoggedIn, notifications.length]);

//   const unreadCount = notifications.filter((n) =>!n.isRead).length;

//   const isDashboard = location.pathname === '/vendordashboard' || location.pathname === '/vendor';
//   const isOwnerOnDashboard = isLoggedIn && accountType === 'vendor' && isDashboard;
//   const isOwnerOnPublicPage = isLoggedIn &&
//                               accountType === 'vendor' &&
//                               currentVendor?._id &&
//                               vendorInfo?._id === currentVendor?._id;

//   const isOwner = isOwnerOnDashboard || isOwnerOnPublicPage;
//   const showFullHeader = isOwnerOnDashboard;

//   const getInitials = () => {
//     const name = vendorInfo?.stageName || vendorInfo?.firstName || vendorInfo?.businessName || "";
//     if (!name) return "FS";
//     const names = name.trim().split(/\s+/);
//     if (names.length >= 2) {
//       return (names[0][0] + names[names.length - 1][0]).toUpperCase();
//     }
//     return name[0].toUpperCase();
//   };

//   useEffect(() => {
//     document.body.style.overflow = isOpen? "hidden" : "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   const closeMenu = () => setIsOpen(false);

//   return (
//     <header className="vendorheader-container">
//       <div className="vendorheader-wrapper">
//         <div
//           className="vendorheader-left"
//           onClick={() => {
//             navigate("/");
//             closeMenu();
//           }}
//         >
//           <img src={Headerlogo2} alt="FeastSync Logo" className="logo-img" />
//           <h2 className="logo-text">FeastSync</h2>
//         </div>

//         {showFullHeader && (
//           <>
//             <div className={`vendorheader-right ${isOpen? "active" : ""}`}>
//               <button
//                 className="icon-btn"
//                 aria-label="Messages"
//                 onClick={() => {
//                   navigate("/wallet/transactions");
//                   closeMenu();
//                 }}
//               >
//                 <img src={Messageicon} alt="" className="nav-icon1" />
//                 <span className="vendorheader-navLabel">Messages</span>
//               </button>

//               <button
//                 className="icon-btn notification-btn"
//                 aria-label="Notifications"
//                 onClick={() => {
//                   navigate("/notifications");
//                   closeMenu();
//                 }}
//               >
//                 <div className="icon-wrapper">
//                   <img src={Bellicon2} alt="" className="nav-icon" />
//                   {unreadCount > 0 && (
//                     <span className="notification-badge">
//                       {unreadCount > 99? '99+' : unreadCount}
//                     </span>
//                   )}
//                 </div>
//                 <span className="vendorheader-navLabel">Notifications</span>
//               </button>

//               <div className="vendorheader-footerActions">
//                 <div className="avatar-circle">{getInitials()}</div>
//                 <button
//                   className="edit-profile-btn"
//                   onClick={() => {
//                     navigate("/Settings");
//                     closeMenu();
//                   }}
//                 >
//                   Edit Profile
//                 </button>
//               </div>
//             </div>

//             <div
//               className="vendorheader_menuIcon"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen? <FaTimes /> : <FaBars />}
//             </div>
//           </>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Vendorheader;
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
import { logoutUser, getNotifications } from "../../Redux/features/authslice.js";

const Vendorheader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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
  const [showLogout, setShowLogout] = useState(false);

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

   const handleLogout = async () => {
      try {
        await dispatch(logoutUser()).unwrap()
        message.success('Logged out successfully')
        navigate('/login')
      } catch (err) {
        await persistor.purge()
        navigate('/login')
      }
    }

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

              {/* Chat / Messages */}
              <button
                className="icon-btn"
                aria-label="Messages"
                onClick={() => {
                  navigate("/chats");
                  closeMenu();
                }}
              >
                <img src={Messageicon} alt="" className="nav-icon1" />
                <span className="vendorheader-navLabel">Messages</span>
              </button>

              {/* Notifications */}
              <button
                className="icon-btn notification-btn"
                aria-label="Notifications"
                onClick={() => {
                  navigate("/notifications");
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
              {!showLogout ? (
                <div
                  className="avatar-circle"
                  onClick={() => setShowLogout(true)}
                >
                  {getInitials()}
                </div>
              ) : (
                <div className="logout-confirm">
                  <span>Logout?</span>
              
                  <button
                    className="logout-yes"
                    onClick={handleLogout}
                  >
                    Yes
                  </button>
              
                  <button
                    className="logout-no"
                    onClick={() => setShowLogout(false)}
                  >
                    No
                  </button>
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