import React from 'react';
import "../Css/VendorSetting.css";
import Header from "../../Components/Header"

const VendorSetting = () => {
  return (
    <div className="vendorsetting-container">
      <Header />
      <div className='vendorsetting-wrapper'>
      <header className="vendorsetting-header">
        <span className="vendorsetting-section-title-label">SETTINGS</span>
        <h1 className="vendorsetting-account-main-title">Account</h1>
        
        <div className="vendorsetting-profile-card-row">
          <div className="vendorsetting-profile-avatar-black">DJ</div>
          <div className="vendorsetting-profile-meta-text">
            <h2 className="vendorsetting-profile-user-name">DJ Kolade Oseni</h2>
            <p className="vendorsetting-profile-user-role">Vendor — DJ</p>
          </div>
        </div>
      </header>
      </div >

    
      <main className="vendorsetting-list-wrapper">
        <div className="vendorsetting-row-item">
          <span className="vendorsetting-field-row-label">Display name</span>
          <span className="vendorsetting-field-row-value">DJ Kolade Beats</span>
          <button className="vendorsetting-action-btn">Edit</button>
        </div>

        <div className="vendorsetting-row-item">
          <span className="vendorsetting-field-row-label">Phone number</span>
          <span className="vendorsetting-field-row-value">08024500456</span>
          <button className="vendorsetting-action-btn">Edit</button>
        </div>

        <div className="vendorsetting-row-item">
          <span className="vendorsetting-field-row-label">Email</span>
          <span className="vendorsetting-field-row-value">djkolade@gmail.com</span>
          <div className="vendorsetting-empty-action-spacer"></div>
        </div>

        <div className="vendorsetting-row-item">
          <span className="vendorsetting-field-row-label">Location</span>
          <span className="vendorsetting-field-row-value">Lagos, Nigeria</span>
          <button className="vendorsetting-action-btn">Edit</button>
        </div>

        <div className="vendorsetting-row-item">
          <span className="vendorsetting-field-row-label">Bio/Description</span>
          <span className="vendorsetting-field-row-value">Lagos, Nigeria</span>
          <button className="vendorsetting-action-btn">Edit</button>
        </div>

        <div className="vendorsetting-row-item">
          <span className="vendorsetting-field-row-label">Public profile link</span>
          <span className="vendorsetting-field-row-value">DJ Kolade Beats</span>
          <button className="vendorsetting-action-btn vendorsetting-copy-btn-layout">
            Copy link
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vendorsetting-copy-icon-svg">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>

        {/* Extended Description Rows */}
        <div className="vendorsetting-row-item vendorsetting-extended-row-height">
          <div className="vendorsetting-stacked-label-block">
            <span className="vendorsetting-field-row-label">Availability Calender</span>
            <span className="vendorsetting-field-row-subtitle">Edit and set date here</span>
          </div>
          <button className="vendorsetting-action-btn">Edit</button>
        </div>

        <div className="vendorsetting-row-item vendorsetting-extended-row-height">
          <div className="vendorsetting-stacked-label-block">
            <span className="vendorsetting-field-row-label">Package and Pricing</span>
            <span className="vendorsetting-field-row-subtitle">Edit and set pricing</span>
          </div>
          <button className="vendorsetting-action-btn">Edit</button>
        </div>

        {/* Payment Sub Section */}
        <div className="vendorsetting-sub-section-break-header">
          <span className="vendorsetting-section-title-label">PAYMENT</span>
        </div>

        <div className="vendorsetting-row-item vendorsetting-no-border-bottom vendorsetting-extended-row-height">
          <div className="vendorsetting-stacked-label-block">
            <span className="vendorsetting-field-row-label">GTBank</span>
            <span className="vendorsetting-field-row-subtitle">- 4421 Savings · Primary</span>
          </div>
          <button className="vendorsetting-action-btn">Edit</button>
        </div>

        {/* KYC Verification Section */}
        <div className="vendorsetting-kyc-footer-row">
          <span className="vendorsetting-section-title-label">KYC VERIFICATION</span>
          <div className="vendorsetting-verification-badge-approved">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="vendorsetting-check-icon-svg">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Approved
          </div>
        </div>
      </main>
      {/* </div> */}
    </div>
  );
};

export default VendorSetting;
