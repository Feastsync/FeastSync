import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Booking.css";
import { createBooking, resetBooking } from "../../Redux/features/Bookingslice";

import bookinCalender from "../../assets/logos/bookinCalender.png";
import hourglassIcon  from "../../assets/logos/eventTime.png";
import closeIcon      from "../../assets/logos/closeIcon.png";
import backIcon       from "../../assets/logos/backIcon.png";
import checkIcon      from "../../assets/logos/bookinCalender.png";
import eventIcon      from "../../assets/logos/bookinCalender.png";
import usersIcon      from "../../assets/logos/usersIcon.png"
import locationIcon   from "../../assets/logos/boxicons_location.svg";
import notesIcon      from "../../assets/logos/noteIcon.png";
import mailIcon       from "../../assets/logos/Email.svg";
import phoneIcon      from "../../assets/logos/Phone.svg";

const EVENT_TYPES = [
  'wedding', 'birthday party', 'corporate event', 'product launch',
  'cultural festival', 'anniversary', 'graduation', 'burial'
];

const START_TIMES = [
  "6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM",
  "6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM","11:00 PM",
];

const DURATIONS = ['2 hours', '4 hours', '6 hours', '8 hours', 'full day'];

const GUEST_COUNTS = ['50-100', '100-200', '200-300', '300-400', '400-500', '600+'];

const STEP_LABELS = ["Event Details", "Review", "Confirmed"];

const StepDots = ({ current }) => (
  <div className="bm-stepper">
    <div className="bm-step-track">
      <div className="bm-step-fill" style={{ width: `${(current / 2) * 100}%` }} />
    </div>
    {STEP_LABELS.map((label, i) => (
      <div
        key={i}
        className={`bm-step ${i === current ? "active" : i < current ? "done" : ""}`}
      >
        <div className="bm-step-dot">
          {i < current
            ? <img src={checkIcon} alt="done" className="bm-step-check-icon" />
            : <span>{i + 1}</span>
          }
        </div>
        <span className="bm-step-label">{label}</span>
      </div>
    ))}
  </div>
);

const ReviewItem = ({ icon, label, value, full }) => (
  <div className={`bm-review-item${full ? " full" : ""}`}>
    <img src={icon} alt={label} className="bm-review-icon" />
    <div>
      <p className="bm-review-label">{label}</p>
      <p className="bm-review-value">{value || "—"}</p>
    </div>
  </div>
);

const BookingModal = ({ vendorName = "the vendor", vendorId, pricingId, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, error, success, booking } = useSelector((s) => s.booking);
  const { userInfo, accountType, vendorInfo, currentVendor } = useSelector((s) => s.auth);

  const vendor = vendorInfo?._id === vendorId ? vendorInfo : currentVendor;
  const selectedPackage = vendor?.pricingId?.find(
    (pkg) => pkg?._id === pricingId || pkg?.id === pricingId || pkg?.savedId === pricingId,
  );
  const packagePriceValue =
    selectedPackage?.packagePrice || selectedPackage?.price || selectedPackage?.startingPrice || 0;
  const packagePrice = packagePriceValue
    ? `₦${Number(packagePriceValue?.toString().replace(/[^0-9.-]/g, "")).toLocaleString()}`
    : "—";
  const packageName = selectedPackage?.packageName || selectedPackage?.title || "Selected package";

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    eventType: "", eventDate: "", startTime: "", duration: "",
    guestCount: "", location: "", additionalDetails: "",
    firstName: "", lastName: "", email: "", phone: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userInfo && accountType === "user") {
      setForm(prev => ({
        ...prev,
        firstName: userInfo.firstName || "",
        lastName:  userInfo.lastName  || "",
        email:     userInfo.email     || "",
        phone:     userInfo.phoneNumber || ""
      }));
    }
  }, [userInfo, accountType]);

  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
  };

  // ── clears both local error and Redux error (e.g. "vendor already booked") on date change
  const handleDateChange = (e) => {
    setForm((prev) => ({ ...prev, eventDate: e.target.value }));
    if (errors.eventDate) setErrors((prev) => ({ ...prev, eventDate: "" }));
    dispatch(resetBooking());
  };

  const validateStep0 = () => {
    const newErrors = {};

    if (!form.eventType)       newErrors.eventType  = "Event type is required";
    if (!form.eventDate)       newErrors.eventDate  = "Event date is required";

    const today = new Date().toISOString().split("T")[0];
    if (form.eventDate && form.eventDate < today) {
      newErrors.eventDate = "Past dates cannot be selected";
    }

    if (!form.startTime)       newErrors.startTime  = "Start time is required";
    if (!form.duration)        newErrors.duration   = "Duration is required";
    if (!form.guestCount)      newErrors.guestCount = "Guest count is required";
    if (!form.location.trim()) newErrors.location   = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim())  newErrors.lastName  = "Last name is required";
    if (!form.email.trim())     newErrors.email     = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.phone.trim())            newErrors.phone = "Phone number is required";
    else if (form.phone.length !== 11) newErrors.phone = "Phone number must be 11 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep0()) setStep(1);
  };

  useEffect(() => {
    if (success) setStep(2);
  }, [success]);

  useEffect(() => {
    return () => dispatch(resetBooking());
  }, [dispatch]);

  const handleSubmit = () => {
    if (!validateStep1()) return;

    const payload = {
      pricingId,
      vendorId,
      eventDate:        form.eventDate,
      bookingTitle:     `${form.eventType} – ${vendorName}`,
      eventType:        form.eventType,
      eventLocation:    form.location,
      startTime:        form.startTime,
      duration:         form.duration,
      guestCount:       form.guestCount,
      additionalDetails: form.additionalDetails,
      contact: {
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        phone:     form.phone
      }
    };

    dispatch(createBooking(payload));
  };

  const bookingRef = booking?.bookingRef
    || booking?._id?.slice(-8).toUpperCase()
    || "FS-PENDING";

  return (
    <div className="bm-backdrop">
      <div className="bm-modal" role="dialog" aria-modal="true" aria-label="Booking modal">

        {step === 0 && (
          <>
            <div className="bm-header">
              <div>
                <h2 className="bm-header-title">Event Details</h2>
                <p className="bm-header-sub">Tell us about your event</p>
              </div>
              <button className="bm-close-btn" onClick={onClose} aria-label="Close">
                <img src={closeIcon} alt="Close" />
              </button>
            </div>

            <div className="bm-body">
              <StepDots current={0} />

              <div className="bm-grid-2">
                <div className="bm-field">
                  <label>Event Type *</label>
                  <div className={`bm-select-wrap ${errors.eventType ? 'bm-error-field' : ''}`}>
                    <select value={form.eventType} onChange={set("eventType")}>
                      <option value="" disabled>Select event type</option>
                      {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  {errors.eventType && <p className="bm-error-text">{errors.eventType}</p>}
                </div>

                <div className="bm-field">
                  <label>Event Date *</label>
                  <div className={`bm-input-wrap has-icon ${errors.eventDate ? 'bm-error-field' : ''}`}>
                    <img src={bookinCalender} alt="" className="bm-input-icon" />
                    <input
                      type="date"
                      value={form.eventDate}
                      onChange={handleDateChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  {errors.eventDate && <p className="bm-error-text">{errors.eventDate}</p>}
                </div>
              </div>

              <div className="bm-grid-2">
                <div className="bm-field">
                  <label>Start Time *</label>
                  <div className={`bm-select-wrap ${errors.startTime ? 'bm-error-field' : ''}`}>
                    <select value={form.startTime} onChange={set("startTime")}>
                      <option value="" disabled>Select time</option>
                      {START_TIMES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  {errors.startTime && <p className="bm-error-text">{errors.startTime}</p>}
                </div>
                
                <div className="bm-field">
                  <label>Duration *</label>
                  <div className={`bm-select-wrap ${errors.duration ? 'bm-error-field' : ''}`}>
                    <select value={form.duration} onChange={set("duration")}>
                      <option value="" disabled>Select duration</option>
                      {DURATIONS.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  {errors.duration && <p className="bm-error-text">{errors.duration}</p>}
                </div>
              </div>

              <div className="bm-grid-2">
                <div className="bm-field">
                  <label>Guest Count *</label>
                  <div className={`bm-select-wrap ${errors.guestCount ? 'bm-error-field' : ''}`}>
                    <select value={form.guestCount} onChange={set("guestCount")}>
                      <option value="" disabled>Expected guests</option>
                      {GUEST_COUNTS.map((g) => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  {errors.guestCount && <p className="bm-error-text">{errors.guestCount}</p>}
                </div>
              </div>

              <div className="bm-field">
                <label>Add Location *</label>
                <div className={`bm-input-wrap ${errors.location ? 'bm-error-field' : ''}`}>
                  <input
                    type="text"
                    value={form.location}
                    onChange={set("location")}
                    placeholder="e.g. Civic Event Centre, Mokola, Ibadan"
                  />
                </div>
                {errors.location && <p className="bm-error-text">{errors.location}</p>}
              </div>

              <div className="bm-field">
                <label>Additional Details</label>
                <p className="bm-field-hint">Anything else we should know?</p>
                <textarea
                  value={form.additionalDetails}
                  onChange={set("additionalDetails")}
                  placeholder="Your message here"
                  rows={4}
                />
              </div>

              {error && <p className="bm-error">{error}</p>}

              <button className="bm-btn-primary" onClick={handleNextStep}>
                Send to {vendorName}
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="bm-header">
              <div>
                <button className="bm-back-btn" onClick={() => setStep(0)}>
                  <img src={backIcon} alt="Back" />
                  Back
                </button>
                <h2 className="bm-header-title">Review Your Booking</h2>
                <p className="bm-header-sub">Please confirm all details are correct</p>
              </div>
            </div>

            <div className="bm-body">
              <StepDots current={1} />

              <p className="bm-section-label">EVENT DETAILS</p>
              <div className="bm-review-grid">
                <ReviewItem icon={eventIcon}      label="Event Type"     value={form.eventType} />
                <ReviewItem icon={bookinCalender} label="Event Date"     value={form.eventDate} />
                <ReviewItem icon={hourglassIcon}  label="Duration"       value={form.duration} />
                <ReviewItem icon={usersIcon}      label="Guest Count"    value={form.guestCount} />
                <ReviewItem icon={locationIcon}   label="Location/Venue" value={form.location} full />
              </div>

              <div className="bm-divider" />

              <p className="bm-section-label">PACKAGE DETAILS</p>
              <div className="bm-review-grid">
                <ReviewItem icon={eventIcon} label="Package" value={packageName} />
                <ReviewItem icon={hourglassIcon} label="Price" value={packagePrice} />
              </div>

              <div className="bm-divider" />

              <p className="bm-section-label">CONTACT INFORMATION</p>
              <div className="bm-grid-2">
                <div className="bm-field">
                  <label>First Name *</label>
                  <div className={`bm-input-wrap ${errors.firstName ? 'bm-error-field' : ''}`}>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={set("firstName")}
                      placeholder="Adeyemi"
                    />
                  </div>
                  {errors.firstName && <p className="bm-error-text">{errors.firstName}</p>}
                </div>
                <div className="bm-field">
                  <label>Last Name *</label>
                  <div className={`bm-input-wrap ${errors.lastName ? 'bm-error-field' : ''}`}>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={set("lastName")}
                      placeholder="Rahul"
                    />
                  </div>
                  {errors.lastName && <p className="bm-error-text">{errors.lastName}</p>}
                </div>
              </div>

              <div className="bm-field">
                <label>Email *</label>
                <div className={`bm-input-wrap has-icon ${errors.email ? 'bm-error-field' : ''}`}>
                  <img src={mailIcon} alt="" className="bm-input-icon" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="rahuladeyemi@example.com"
                  />
                </div>
                {errors.email && <p className="bm-error-text">{errors.email}</p>}
              </div>

              <div className="bm-field">
                <label>Phone Number *</label>
                <div className={`bm-input-wrap has-icon ${errors.phone ? 'bm-error-field' : ''}`}>
                  <img src={phoneIcon} alt="" className="bm-input-icon" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
                      setForm((prev) => ({ ...prev, phone: digits }));
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    placeholder="+234 XXX XXX XXXX"
                    inputMode="numeric"
                    maxLength={11}
                  />
                </div>
                {errors.phone && <p className="bm-error-text">{errors.phone}</p>}
              </div>

              <div className="bm-field">
                <label>Additional Information</label>
                <div className="bm-review-item full">
                  <img src={notesIcon} alt="" className="bm-review-icon" />
                  <p className="bm-review-value bm-italic">
                    {form.additionalDetails || "No additional information provided"}
                  </p>
                </div>
              </div>

              {error && <p className="bm-error">{error}</p>}

              <button
                className="bm-btn-primary"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="bm-header bm-header-slim">
              <button className="bm-close-btn" onClick={onClose} aria-label="Close">
                <img src={closeIcon} alt="Close" />
              </button>
            </div>

            <div className="bm-body bm-success-body">
              <div className="bm-badge">
                <div className="bm-badge-star" />
                <img src={checkIcon} alt="Confirmed" className="bm-badge-check" />
              </div>

              <div className="bm-confirmed-pill">Booking Confirmed</div>

              <h2 className="bm-success-title">
                Your Booking has been submitted
              </h2>
              <p className="bm-success-sub">
                Thank you{form.firstName ? ` ${form.firstName}` : ""}, your booking
                request has been sent to {vendorName}.<br />
                Please stay online to continue the conversation.
              </p>

              <button className="bm-btn-primary" onClick={onClose}>
                OK
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default BookingModal;