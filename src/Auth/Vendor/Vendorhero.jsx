import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVendorProfile } from "../../Redux/features/authslice";
import "../Css/Vendorhero.css";
import { IoArrowBack } from "react-icons/io5";
import Vendorprofile from "../../assets/logos/Vendorprofile.png";
import Vedorprofileview from "../../assets/logos/Vedorprofileview.svg";
import Vendorbackgroundimage from "../../assets/BackgroundImage/Vendorbackgroundimage.jpg";
import Vendoruploadprofile from "../../assets/logos/Vendoruploadprofile.jpg"
import Vendorprofile1 from "../../assets/logos/Vendorprofile1.png"
import { useLocation } from "react-router-dom";

const Vendorhero = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { vendorInfo, currentVendor, isLoading } = useSelector(
    (state) => state.auth,
  );


  const isDashboard = location.pathname === "/vendordashboard";
  const isOwner = vendorInfo?._id === currentVendor?._id;
  const canEdit = isDashboard || isOwner;

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !vendorInfo?._id) return;
    const formData = new FormData();
    formData.append("profilePicture", file);
    dispatch(
      updateVendorProfile({
        id: vendorInfo._id,
        profileData: formData,
      }),
    );
    e.target.value = "";
  };


  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !vendorInfo?._id) return;
    const formData = new FormData();
    formData.append("coverPhoto", file);
    dispatch(
      updateVendorProfile({
        id: vendorInfo._id,
        profileData: formData,
      }),
    );
    e.target.value = "";
  };

  const handleBack = () => {
    window.history.back();
  };

  
  // const displayData = isDashboard ? vendorInfo : currentVendor;
  const displayData = isDashboard
  ? {
      ...vendorInfo,
      profilePicture: currentVendor?.profilePicture || vendorInfo?.profilePicture,
      coverPhoto: currentVendor?.coverPhoto || vendorInfo?.coverPhoto,
    }
  : currentVendor;


  return (
    <div className="vendorhero-container">
      <img
        src={displayData?.coverPhoto || Vendorprofile1}
        alt="Festival stage cover"
        className="vendorhero-cover"
        key={displayData?.coverPhoto}
      />
      <div className="vendorhero-overlay" />
       {!isOwner && (<>
      <button className="vendorhero-back" type="button" onClick={handleBack}>
        <IoArrowBack />
      </button>
      <span className="vendorhero-back-text">Back</span>
       </>)}

      {canEdit && (
        <>
          <label htmlFor="cover-upload" className="vendorhero-cover-upload">
            <span>{isLoading ? "Uploading..." : "Upload Cover"}</span>
          </label>
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            hidden
            disabled={isLoading}
          />
        </>
      )}

      <div className="vendorhero-profile">
        <div className="vendorhero-avatar-wrap">
          <img
            src={displayData?.profilePicture || Vendoruploadprofile}
            alt="Profile"
            className="vendorhero-avatar"
            key={displayData?.profilePicture}
          />

          {canEdit && (
            <>
              <label
                htmlFor="profile-upload"
                className="vendorhero-avatar-overlay"
              >
                <span>{isLoading ? "Uploading..." : "Upload Profile"}</span>
                <img src={Vedorprofileview} alt="" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                hidden
                disabled={isLoading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vendorhero;
