import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux' 
import { logoutUser } from '../../Redux/features/authslice' 
import { message } from 'antd' 
import { useSelector } from 'react-redux'
import './Settings.css'
import { persistor } from "../../Redux/app/store"

const Settings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch() 
  const [copied, setCopied] = useState(false)
  const [modal, setModal] = useState(null)
  const [otp, setOtp] = useState(['', '', '', ''])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [bank, setBank] = useState({ name: '', account: '' })
  const [showSuccess, setShowSuccess] = useState(false)
  const [username, setUsername] = useState('')
  const [toastType, setToastType] = useState('')
const {  vendorInfo } = useSelector((s) => s.auth)
  const [pricing, setPricing] = useState({
    startingPrice: '',
    packageName: '',
    description: ''
  })

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/dashboard')
    }
  }

  const handleCopy = () => {
    const link = `https://feastsync.com/${username}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const closeModal = () => {
    setModal(null)
    setOtp(['', '', '', ''])
  }

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  const handlePhoneSave = () => {
    setModal('otp-phone')
  }

  const handleBankSave = () => {
    setModal('otp-bank')
  }

  const verifyOtp = () => {
    setToastType('phone')
    setShowSuccess(true)
    setModal(null)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handlePricingSave = () => {
    setToastType('pricing')
    setShowSuccess(true)
    setModal(null)
    setTimeout(() => setShowSuccess(false), 3000)
  }

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

  

  return (
    <div className="settings_page">
      {showSuccess && (
        <div className="settings_toast">
          <span className="toast_icon">✓</span>
          {toastType === 'pricing' ? 'Pricing updated successfully!' : 'Phone number updated successfully!'}
          <br />
          {toastType === 'pricing'
            ? 'Your packages have been updated.'
            : 'Your phone number has been verified and updated.'
          }
        </div>
      )}

      <div className="settings_container">
        <div className="settings_back_row">
          <button className="settings_back_btn" onClick={handleBack}>
            ← Back
          </button>
        </div>

        <div className="settings_section_header">
          <h3 className="settings_section_title">SETTINGS</h3>
        </div>

        <div className="settings_section_header">
          <h4 className="settings_subsection_title">Account</h4>
        </div>

        <div className="settings_profile_card">
          <div className="settings_avatar"> {vendorInfo?.stageName?.charAt(0) || vendorInfo?.firstName?.charAt(0) || 'V'}</div>
          <div className="settings_profile_info">
            <h3 className="settings_profile_name"> {vendorInfo?.stageName || vendorInfo?.firstName + ' ' + vendorInfo?.lastName}</h3>
            <p className="settings_profile_role">Vendor — DJ</p>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Display name</span>
          </div>
          <div className="settings_row_right">
            <span className="settings_value">{vendorInfo?.stageName}</span>
            <button className="settings_btn" onClick={() => setModal('display-name')}>Edit</button>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Phone number</span>
          </div>
          <div className="settings_row_right">
            <span className="settings_value">{vendorInfo?.phoneNumber || phoneNumber}</span>
            <button className="settings_btn" onClick={() => setModal('phone')}>Edit</button>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Email</span>
          </div>
          <div className="settings_row_right">
            <span className="settings_value">{vendorInfo?.email}</span>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Location</span>
          </div>
          <div className="settings_row_right">
            <span className="settings_value">{location}</span>
            <button className="settings_btn" onClick={() => setModal('location')}>Edit</button>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Bio/Description</span>
          </div>
          <div className="settings_row_right">
            <span className="settings_value">{bio || 'Lagos, Nigeria'}</span>
            <button className="settings_btn" onClick={() => setModal('bio')}>Edit</button>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Public profile link</span>
          </div>
          <div className="settings_row_right">
            <span className="settings_value">DJ Kolade Beats</span>
            <button className="settings_btn copy_btn" onClick={handleCopy}>
              {copied ? 'Copied' : 'Copy link'}
            </button>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Availability Calender</span>
            <span className="settings_sublabel">Edit and set date here</span>
          </div>
          <div className="settings_row_right">
            <button className="settings_btn">Edit</button>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Package and Pricing</span>
            <span className="settings_sublabel">Edit and set pricing</span>
          </div>
          <div className="settings_row_right">
            <button className="settings_btn" onClick={() => setModal('pricing')}>Edit</button>
          </div>
        </div>

        <div className="settings_section_header">
          <h3 className="settings_section_title">PAYMENT</h3>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">GTBank</span>
            <span className="settings_sublabel">...4421 · Savings · Primary</span>
          </div>
          <div className="settings_row_right">
            <button className="settings_btn" onClick={() => setModal('bank')}>Edit</button>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">KYC VERIFICATION</span>
          </div>
          <div className="settings_row_right">
            <div className="settings_badge_approved">✓ Approved</div>
          </div>
        </div>

      
        <div className="settings_logout_section">
          <button className="settings_logout_btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

  
      {modal === 'phone' && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3>Edit Phone Number</h3>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              <label className="modal_label">Phone Number</label>
              <input
                type="text"
                className="modal_input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="modal_error">⚠ OTP verification will be required</p>
            </div>
            <div className="modal_footer">
              <button className="modal_btn_cancel" onClick={closeModal}>Cancel</button>
              <button className="modal_btn_primary" onClick={handlePhoneSave}>Continue to Verify</button>
            </div>
          </div>
        </div>
      )}

      {(modal === 'otp-phone' || modal === 'otp-bank') && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3>OTP Verification</h3>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              <p className="modal_text">We've sent a verification code to verify your new {modal === 'otp-phone' ? 'phone number' : 'bank details'}</p>
              <p className="modal_phone">080****0456</p>
              <label className="modal_label">Enter verification code</label>
              <div className="otp_inputs">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength="1"
                    className="otp_input"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                  />
                ))}
              </div>
              <p className="modal_resend">Resend code in 60s</p>
            </div>
            <div className="modal_footer">
              <button className="modal_btn_cancel" onClick={closeModal}>Cancel</button>
              <button className="modal_btn_primary" onClick={verifyOtp}>Verify</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'location' && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3>Edit Location</h3>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              <label className="modal_label">Select state of residence</label>
              <select
                className="modal_select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>Select State</option>
                <option>Lagos, Nigeria</option>
                <option>Abuja, Nigeria</option>
                <option>Rivers, Nigeria</option>
                <option>Oyo, Nigeria</option>
              </select>
            </div>
            <div className="modal_footer">
              <button className="modal_btn_cancel" onClick={closeModal}>Cancel</button>
              <button className="modal_btn_primary" onClick={closeModal}>Save</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'bank' && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3>Edit bank details</h3>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              <label className="modal_label">Select Bank</label>
              <select
                className="modal_select"
                onChange={(e) => setBank({...bank, name: e.target.value})}
              >
                <option>Select Bank</option>
                <option>GTBank</option>
                <option>Access Bank</option>
                <option>First Bank</option>
                <option>Zenith Bank</option>
              </select>
              <label className="modal_label">Account number</label>
              <input
                type="text"
                className="modal_input"
                placeholder="8024000056"
                onChange={(e) => setBank({...bank, account: e.target.value})}
              />
              <p className="modal_error">⚠ OTP verification will be required</p>
            </div>
            <div className="modal_footer">
              <button className="modal_btn_cancel" onClick={closeModal}>Cancel</button>
              <button className="modal_btn_primary" onClick={handleBankSave}>Continue to Verify</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'display-name' && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3>Edit Display Name</h3>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              <label className="modal_label">Display Name</label>
              <input
                type="text"
                className="modal_input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="modal_footer">
              <button className="modal_btn_cancel" onClick={closeModal}>Cancel</button>
              <button className="modal_btn_primary" onClick={closeModal}>Save</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'bio' && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3>Edit Bio/Description</h3>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              <label className="modal_label">Bio/Description</label>
              <textarea
                className="modal_textarea"
                placeholder="Tell us about yourself and your services"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="4"
              />
            </div>
            <div className="modal_footer">
              <button className="modal_btn_cancel" onClick={closeModal}>Cancel</button>
              <button className="modal_btn_primary" onClick={closeModal}>Save</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'pricing' && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box pricing_modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header modal_header_purple">
              <div>
                <h3>Pricing & Packages</h3>
                <p className="modal_subtitle">Set your starting price</p>
              </div>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              <label className="modal_label">Starting Price</label>
              <input
                type="text"
                className="modal_input"
                value={pricing.startingPrice}
                onChange={(e) => setPricing({...pricing, startingPrice: e.target.value})}
              />

              <label className="modal_label">Package Name</label>
              <select
                className="modal_select"
                value={pricing.packageName}
                onChange={(e) => setPricing({...pricing, packageName: e.target.value})}
              >
                <option value="">Select package</option>
                <option value="basic">Basic Package</option>
                <option value="standard">Standard Package</option>
                <option value="premium">Premium Package</option>
                <option value="custom">Custom Package</option>
              </select>

              <label className="modal_label">Package Description</label>
              <textarea
                className="modal_textarea"
                placeholder="What's included..."
                value={pricing.description}
                onChange={(e) => setPricing({...pricing, description: e.target.value})}
                rows="4"
              />
            </div>
            <div className="modal_footer">
              <button className="modal_btn_cancel" onClick={closeModal}>Back</button>
              <button className="modal_btn_primary" onClick={handlePricingSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export default Settings