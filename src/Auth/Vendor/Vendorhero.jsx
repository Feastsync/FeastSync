import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVendorProfile } from "../../Redux/features/authslice";
import "../Css/Vendorhero.css";
import { IoArrowBack } from "react-icons/io5";
import Vendorprofile from "../../assets/logos/Vendorprofile.png";
import Vedorprofileview from "../../assets/logos/Vedorprofileview.svg";
import Vendorbackgroundimage from "../../assets/BackgroundImage/Vendorbackgroundimage.jpg";
import { useLocation } from "react-router-dom";

const Vendorhero = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { vendorInfo, currentVendor, loading } = useSelector((state) => state.auth);

  // 🔥 Only show upload buttons on dashboard OR if owner on public page
  const isDashboard = location.pathname === '/vendordashboard';
  const isOwner = vendorInfo?._id === currentVendor?._id;
  const canEdit = isDashboard || isOwner;

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file ||!vendorInfo?._id) return;
    const formData = new FormData();
    formData.append("profilePicture", file);
    dispatch(updateVendorProfile({
      id: vendorInfo._id,
      profileData: formData
    }));
    e.target.value = "";
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (!file ||!vendorInfo?._id) return;
    const formData = new FormData();
    formData.append("coverPhoto", file);
    dispatch(updateVendorProfile({
      id: vendorInfo._id,
      profileData: formData
    }));
    e.target.value = "";
  };

  const handleBack = () => {
    window.history.back();
  };

  // 🔥 Display data: use currentVendor on public page, vendorInfo on dashboard
  const displayData = isDashboard? vendorInfo : currentVendor;

  return (
    <div className="vendorhero-container">
      <img
        src={displayData?.coverPhoto || Vendorbackgroundimage}
        alt="Festival stage cover"
        className="vendorhero-cover"
        key={displayData?.coverPhoto}
      />
      <div className="vendorhero-overlay" />

      <button className="vendorhero-back" type="button" onClick={handleBack}>
        <IoArrowBack />
      </button>
      <span className="vendorhero-back-text">Back</span>

      {/* 🔥 Only owner can upload cover */}
      {canEdit && (
        <>
          <label htmlFor="cover-upload" className="vendorhero-cover-upload">
            <span>{loading? "Uploading..." : "Upload Cover"}</span>
          </label>
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            hidden
            disabled={loading}
          />
        </>
      )}

      <div className="vendorhero-profile">
        <div className="vendorhero-avatar-wrap">
          <img
            src={displayData?.profilePicture || Vendorprofile}
            alt="Profile"
            className="vendorhero-avatar"
            key={displayData?.profilePicture}
          />

          {/* 🔥 Only owner can upload profile */}
          {canEdit && (
            <>
              <label htmlFor="profile-upload" className="vendorhero-avatar-overlay">
                <span>{loading? "Uploading..." : "Upload Profile"}</span>
                <img src={Vedorprofileview} alt="" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                hidden
                disabled={loading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vendorhero;
