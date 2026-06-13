import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Booking.css";

import { createBooking, resetBooking } from "../../Redux/features/bookingSlice";

import calendarIcon  from "../../assets/logos/calender.png";
import hourglassIcon from "../../assets/logos/Times.svg";
import usersIcon     from "../../assets/logos/budget.png";
import locationIcon  from "../../assets/logos/budget.png";
import notesIcon     from "../../assets/logos/budget.png";
import mailIcon      from "../../assets/logos/budget.png";
import phoneIcon     from "../../assets/logos/budget.png";
import backIcon      from "../../assets/logos/budget.png";
import closeIcon     from "../../assets/logos/budget.png";
import checkIcon     from "../../assets/logos/budget.png";
import eventIcon     from "../../assets/logos/budget.png";

const EVENT_TYPES = [
  "Wedding", "Birthday Party", "Corporate Event", "Engagement Party",
  "Baby Shower", "Graduation Party", "Anniversary", "Burial / Funeral",
  "Naming Ceremony", "Dinner Party", "Product Launch", "Concert / Show",
  "Religious Event", "School Event", "Sports Event", "Other",
];

const START_TIMES = [
  "6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM",
  "6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM","11:00 PM",
];

const DURATIONS = [
  "1 hour","2 hours","3 hours","4 hours","5 hours","6 hours",
  "Half day (4–5 hrs)","All day","2 days","3 days","Custom",
];

const GUEST_COUNTS = [
  "1–50","51–100","101–200","201–300","301–500","500–1000","600+","1000+",
];

const BUDGETS = [
  "Under ₦50,000","₦50k – ₦100k","₦100k – ₦200k",
  "₦200k – ₦500k","₦500k – ₦1M","Above ₦1M",
];

const STEP_LABELS = ["Event Details", "Review", "Confirmed"];

/* ── Sub-components ─────────────────────────────────────────── */

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

/* ── Main component ──────────────────────────────────────────── */

const BookingModal = ({ vendorName = "the vendor", vendorId, pricingId, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, error, success, booking } = useSelector((s) => s.booking);

  const [step, setStep]   = useState(0);
  const [form, setForm]   = useState({
    eventType: "", eventDate: "", startTime: "", duration: "",
    guestCount: "", budget: "", location: "", additionalDetails: "",
    firstName: "", lastName: "", email: "", phone: "",
  });

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  /* move to step 2 when redux reports success */
  useEffect(() => {
    if (success) setStep(2);
  }, [success]);

  /* clean up slice on unmount so stale state doesn't bleed into next open */
  useEffect(() => {
    return () => dispatch(resetBooking());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(createBooking({
      pricingId,
      vendorId,
      bookingDate:   form.eventDate,
      bookingTitle:  `${form.eventType} – ${vendorName}`,
      eventType:     form.eventType,
      eventLocation: form.location,
    }));
  };

  /* booking ref — use real ref from API response if available, else fallback */
  const bookingRef = booking?.bookingRef
    || booking?._id?.slice(-8).toUpperCase()
    || "FS-PENDING";

  return (
    <div
      className="bm-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="bm-modal" role="dialog" aria-modal="true" aria-label="Booking modal">

        {/* ══ STEP 0 — Event Details ══════════════════════════════ */}
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
                  <label>Event Type</label>
                  <div className="bm-select-wrap">
                    <select value={form.eventType} onChange={set("eventType")}>
                      <option value="" disabled>Select event type</option>
                      {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="bm-field">
                  <label>Event Date</label>
                  <div className="bm-input-wrap has-icon">
                    <img src={calendarIcon} alt="" className="bm-input-icon" />
                    <input type="date" value={form.eventDate} onChange={set("eventDate")} />
                  </div>
                </div>
              </div>

              <div className="bm-grid-2">
                <div className="bm-field">
                  <label>Start Time</label>
                  <div className="bm-select-wrap">
                    <select value={form.startTime} onChange={set("startTime")}>
                      <option value="" disabled>Select time</option>
                      {START_TIMES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="bm-field">
                  <label>Duration</label>
                  <div className="bm-select-wrap">
                    <select value={form.duration} onChange={set("duration")}>
                      <option value="" disabled>Select duration</option>
                      {DURATIONS.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bm-grid-2">
                <div className="bm-field">
                  <label>Guest Count</label>
                  <div className="bm-select-wrap">
                    <select value={form.guestCount} onChange={set("guestCount")}>
                      <option value="" disabled>Expected guests</option>
                      {GUEST_COUNTS.map((g) => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <div className="bm-field">
                  <label>Budget Range</label>
                  <div className="bm-select-wrap">
                    <select value={form.budget} onChange={set("budget")}>
                      <option value="" disabled>Select budget</option>
                      {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bm-field">
                <label>Add Location</label>
                <div className="bm-input-wrap">
                  <input
                    type="text"
                    value={form.location}
                    onChange={set("location")}
                    placeholder="e.g. Civic Event Centre, Mokola, Ibadan"
                  />
                </div>
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

              <button className="bm-btn-primary" onClick={() => setStep(1)}>
                Send to {vendorName}
              </button>
            </div>
          </>
        )}

        {/* ══ STEP 1 — Review ════════════════════════════════════ */}
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
                <ReviewItem icon={eventIcon}    label="Event Type"     value={form.eventType} />
                <ReviewItem icon={calendarIcon} label="Event Date"     value={form.eventDate} />
                <ReviewItem icon={hourglassIcon}label="Duration"       value={form.duration} />
                <ReviewItem icon={usersIcon}    label="Guest Count"    value={form.guestCount} />
                <ReviewItem icon={locationIcon} label="Location/Venue" value={form.location} full />
              </div>

              <div className="bm-divider" />

              <p className="bm-section-label">CONTACT INFORMATION</p>
              <div className="bm-grid-2">
                <div className="bm-field">
                  <label>First Name</label>
                  <div className="bm-input-wrap">
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={set("firstName")}
                      placeholder="Adeyemi"
                    />
                  </div>
                </div>
                <div className="bm-field">
                  <label>Last Name</label>
                  <div className="bm-input-wrap">
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={set("lastName")}
                      placeholder="Rahul"
                    />
                  </div>
                </div>
              </div>

              <div className="bm-field">
                <label>Email</label>
                <div className="bm-input-wrap has-icon">
                  <img src={mailIcon} alt="" className="bm-input-icon" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="rahuladeyemi@example.com"
                  />
                </div>
              </div>

              <div className="bm-field">
                <label>Phone Number</label>
                <div className="bm-input-wrap has-icon">
                  <img src={phoneIcon} alt="" className="bm-input-icon" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+234 XXX XXX XXXX"
                  />
                </div>
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

        {/* ══ STEP 2 — Success ═══════════════════════════════════ */}
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
                Booking {bookingRef} has been submitted
              </h2>
              <p className="bm-success-sub">
                Thank you{form.firstName ? ` ${form.firstName}` : ""}, your booking
                request has been sent to {vendorName}.<br />
                Please stay online to continue the conversation.
              </p>

              <button className="bm-btn-primary" onClick={onClose}>
                Proceed to payment
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default BookingModal;