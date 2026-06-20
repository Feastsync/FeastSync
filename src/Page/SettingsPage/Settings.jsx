import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateVendorInfo, getAllPricing } from '../../Redux/features/authslice'
import { message } from 'antd'
import { persistor } from '../../Redux/app/store'
import api from '../../Redux/app/axios'
import './Settings.css'

const Settings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { vendorInfo, pricingPackages } = useSelector((s) => s.auth)

  const [copied, setCopied] = useState(false)
  const [modal, setModal] = useState(null)
  const [otp, setOtp] = useState(['', '', '', ''])
  const [updateLoading, setUpdateLoading] = useState(false)
  const [pendingUpdate, setPendingUpdate] = useState({})

  // Field states
  const [phoneNumber, setPhoneNumber] = useState(vendorInfo?.phoneNumber || '')
  const [displayName, setDisplayName] = useState(vendorInfo?.stageName || '')
  const [location, setLocation] = useState(vendorInfo?.stateOfResidence || '')
  const [bio, setBio] = useState(vendorInfo?.bio || '')
  const [bank, setBank] = useState({ name: '', account: '' })
  const [pricing, setPricing] = useState({
    id: '',
    startingPrice: '',
    packageName: '',
    description: '',
  })

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/dashboard')
  }

  const handleCopy = () => {
    const slug = vendorInfo?.slug || vendorInfo?.username || ''
    navigator.clipboard.writeText(`https://feastsync.com/vendor/${slug}`)
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
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  // For phone, bio, location, bank — goes through OTP flow
  const handleSaveUpdate = async (fields) => {
    try {
      setUpdateLoading(true)
      await api.post('/vendorSetting/request-update', fields)
      setPendingUpdate(fields)
      setModal('otp-verify')
      message.success('OTP sent to your phone')
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to send OTP')
    } finally {
      setUpdateLoading(false)
    }
  }

  // Confirm OTP → finalize update
  const verifyOtp = async () => {
    const otpString = otp.join('')
    if (otpString.length < 4) {
      message.error('Please enter the full 4-digit OTP')
      return
    }
    try {
      setUpdateLoading(true)
      await api.post('/vendorSetting/confirm-update', { otp: otpString })
      dispatch(updateVendorInfo(pendingUpdate))
      message.success('Settings updated successfully!')
      closeModal()
    } catch (err) {
      message.error(err.response?.data?.message || 'Invalid OTP. Try again.')
    } finally {
      setUpdateLoading(false)
    }
  }

  // Pricing uses its own dedicated endpoints — no OTP needed
  const handlePricingSave = async () => {
    if (!pricing.packageName || !pricing.startingPrice) {
      message.error('Please fill in package name and price')
      return
    }
    try {
      setUpdateLoading(true)
      const payload = {
        packageName: pricing.packageName,
        packagePrice: pricing.startingPrice,
        packageDescription: pricing.description,
      }
      if (pricing.id) {
        await api.put(`/new-pricing/${pricing.id}`, payload)
      } else {
        await api.post('/pricing', payload)
      }
      dispatch(getAllPricing())
      message.success('Pricing saved successfully!')
      closeModal()
      setPricing({ id: '', startingPrice: '', packageName: '', description: '' })
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to save pricing')
    } finally {
      setUpdateLoading(false)
    }
  }

  // Open pricing modal pre-filled with an existing package
  const handleEditPricing = (pkg) => {
    setPricing({
      id: pkg.id || pkg._id || '',
      startingPrice: pkg.packagePrice || '',
      packageName: pkg.packageName || '',
      description: pkg.packageDescription || '',
    })
    setModal('pricing')
  }

  return (
    <div className="settings_page">
      <div className="settings_container">
        <div className="settings_back_row">
          <button className="settings_back_btn" onClick={handleBack}>← Back</button>
        </div>

        <div className="settings_section_header">
          <h3 className="settings_section_title">SETTINGS</h3>
        </div>

        <div className="settings_section_header">
          <h4 className="settings_subsection_title">Account</h4>
        </div>

        <div className="settings_profile_card">
          <div className="settings_avatar">
            {vendorInfo?.stageName?.charAt(0) || vendorInfo?.firstName?.charAt(0) || 'V'}
          </div>
          <div className="settings_profile_info">
            <h3 className="settings_profile_name">
              {vendorInfo?.stageName || `${vendorInfo?.firstName} ${vendorInfo?.lastName}`}
            </h3>
            <p className="settings_profile_role">Vendor — DJ</p>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Display name</span>
          </div>
          <div className="settings_row_right">
            <span className="settings_value">{vendorInfo?.stageName}</span>
            {/* <button className="settings_btn" onClick={() => setModal('display-name')}>Edit</button> */}
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
            <span className="settings_label">State of Residence</span>
          </div>
          <div className="settings_row_right">
            <span className="settings_value">{vendorInfo?.stateOfResidence || location}</span>
            <button className="settings_btn" onClick={() => setModal('location')}>Edit</button>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Bio/Description</span>
          </div>
          <div className="settings_row_right">
            <span className="settings_value">{vendorInfo?.bio || bio}</span>
            <button className="settings_btn" onClick={() => setModal('bio')}>Edit</button>
          </div>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Public profile link</span>
          </div>
          <div className="settings_row_right">
            <span className="settings_value">{vendorInfo?.stageName || 'Your profile'}</span>
            <button className="settings_btn copy_btn" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>
        </div>

        {/* <div className="settings_row"> */}
          {/* <div className="settings_row_left">
            <span className="settings_label">Availability Calendar</span>
            <span className="settings_sublabel">Edit and set date here</span>
          </div>
          <div className="settings_row_right">
            <button className="settings_btn">Edit</button>
          </div> */}
        {/* </div> */}

        {/* Pricing packages list */}
        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">Package and Pricing</span>
            <span className="settings_sublabel">Edit and set pricing</span>
          </div>
          <div className="settings_row_right">
            <button
              className="settings_btn"
              onClick={() => {
                setPricing({ id: '', startingPrice: '', packageName: '', description: '' })
                setModal('pricing')
              }}
            >
              + Add New
            </button>
          </div>
        </div>

        {/* Show existing pricing packages */}
        {Array.isArray(pricingPackages) && pricingPackages.map((pkg) => (
          <div className="settings_row" key={pkg.id || pkg._id}>
            <div className="settings_row_left">
              <span className="settings_label">{pkg.packageName}</span>
              <span className="settings_sublabel">₦{Number(pkg.packagePrice).toLocaleString()}</span>
            </div>
            <div className="settings_row_right">
              <button className="settings_btn" onClick={() => handleEditPricing(pkg)}>Edit</button>
            </div>
          </div>
        ))}

        <div className="settings_section_header">
          <h3 className="settings_section_title">PAYMENT</h3>
        </div>

        <div className="settings_row">
          <div className="settings_row_left">
            <span className="settings_label">{vendorInfo?.bankName || 'Bank'}</span>
            <span className="settings_sublabel">
              {vendorInfo?.accountNumber
                ? `...${vendorInfo.accountNumber.slice(-4)} · Savings · Primary`
                : 'No bank added'}
            </span>
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
      </div>

      {/* ── Phone Modal ── */}
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
              <button
                className="modal_btn_primary"
                disabled={updateLoading}
                onClick={() => handleSaveUpdate({ phoneNumber })}
              >
                {updateLoading ? 'Sending...' : 'Continue to Verify'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Display Name / Bio Modal ── */}
      {(modal === 'display-name' || modal === 'bio') && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3>{modal === 'display-name' ? 'Edit Display Name' : 'Edit Bio/Description'}</h3>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              <label className="modal_label">
                {modal === 'display-name' ? 'Display Name' : 'Bio/Description'}
              </label>
              {modal === 'display-name' ? (
                <input
                  type="text"
                  className="modal_input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              ) : (
                <textarea
                  className="modal_textarea"
                  placeholder="Tell us about yourself and your services"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="4"
                />
              )}
            </div>
            <div className="modal_footer">
              <button className="modal_btn_cancel" onClick={closeModal}>Cancel</button>
              <button
                className="modal_btn_primary"
                disabled={updateLoading}
                onClick={() =>
                  handleSaveUpdate({ bio: modal === 'display-name' ? displayName : bio })
                }
              >
                {updateLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Location Modal ── */}
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
                <option value="">Select State</option>
                <option value="Lagos">Lagos, Nigeria</option>
                <option value="Abuja">Abuja, Nigeria</option>
                <option value="Rivers">Rivers, Nigeria</option>
                <option value="Oyo">Oyo, Nigeria</option>
                <option value="Kano">Kano, Nigeria</option>
                <option value="Enugu">Enugu, Nigeria</option>
              </select>
            </div>
            <div className="modal_footer">
              <button className="modal_btn_cancel" onClick={closeModal}>Cancel</button>
              <button
                className="modal_btn_primary"
                disabled={updateLoading}
                onClick={() => handleSaveUpdate({ stateOfResidence: location })}
              >
                {updateLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Bank Modal ── */}
      {modal === 'bank' && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3>Edit Bank Details</h3>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              <label className="modal_label">Select Bank</label>
              <select
                className="modal_select"
                value={bank.name}
                onChange={(e) => setBank({ ...bank, name: e.target.value })}
              >
                <option value="">Select Bank</option>
                <option value="GTBank">GTBank</option>
                <option value="Access Bank">Access Bank</option>
                <option value="First Bank">First Bank</option>
                <option value="Zenith Bank">Zenith Bank</option>
                <option value="UBA">UBA</option>
                <option value="Opay">Opay</option>
              </select>
              <label className="modal_label">Account Number</label>
              <input
                type="text"
                className="modal_input"
                placeholder="Enter 10-digit account number"
                value={bank.account}
                onChange={(e) => setBank({ ...bank, account: e.target.value })}
              />
              <p className="modal_error">⚠ OTP verification will be required</p>
            </div>
            <div className="modal_footer">
              <button className="modal_btn_cancel" onClick={closeModal}>Cancel</button>
              <button
                className="modal_btn_primary"
                disabled={updateLoading}
                onClick={() =>
                  handleSaveUpdate({ bankName: bank.name, accountNumber: bank.account })
                }
              >
                {updateLoading ? 'Sending...' : 'Continue to Verify'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Pricing Modal ── */}
      {modal === 'pricing' && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box pricing_modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header modal_header_purple">
              <div>
                <h3>{pricing.id ? 'Edit Package' : 'Add New Package'}</h3>
                <p className="modal_subtitle">Set your pricing details</p>
              </div>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              <label className="modal_label">Starting Price (₦)</label>
              <input
                type="number"
                className="modal_input"
                placeholder="e.g. 50000"
                value={pricing.startingPrice}
                onChange={(e) => setPricing({ ...pricing, startingPrice: e.target.value })}
              />
              <label className="modal_label">Package Name</label>
              <select
                className="modal_select"
                value={pricing.packageName}
                onChange={(e) => setPricing({ ...pricing, packageName: e.target.value })}
              >
                <option value="">Select package</option>
                <option value="Basic Package">Basic Package</option>
                <option value="Standard Package">Standard Package</option>
                <option value="Premium Package">Premium Package</option>
                <option value="Custom Package">Custom Package</option>
              </select>
              <label className="modal_label">Package Description</label>
              <textarea
                className="modal_textarea"
                placeholder="What's included..."
                value={pricing.description}
                onChange={(e) => setPricing({ ...pricing, description: e.target.value })}
                rows="4"
              />
            </div>
            <div className="modal_footer">
              <button className="modal_btn_cancel" onClick={closeModal}>Cancel</button>
              <button
                className="modal_btn_primary"
                disabled={updateLoading}
                onClick={handlePricingSave}
              >
                {updateLoading ? 'Saving...' : pricing.id ? 'Update Package' : 'Add Package'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── OTP Verify Modal ── */}
      {modal === 'otp-verify' && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3>OTP Verification</h3>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              <p className="modal_text">
                We've sent a 4-digit verification code to confirm your update.
              </p>
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
              <button
                className="modal_btn_primary"
                disabled={updateLoading}
                onClick={verifyOtp}
              >
                {updateLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings