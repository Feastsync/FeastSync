import { useState, useRef, useEffect } from "react";
import "./Chat.css";
import sendIcon from "../../assets/logos/sendicon.png";
import profileIcon from "../../assets/logos/focusIcon.png";
import calendarIcon from "../../assets/logos/calender.png";
import verifiedIcon from "../../assets/logos/verifiedicon.png";

const dummyVendor = {
  name: "DJ Kolade, Lagos, Nigeria.",
  initials: "DJ",
  isVerified: true,
  isOnline: true,
};

const dummyMessages = [
  { id: 1, from: "them", text: "Hi there! 🌍\nThis is DJ Kolade from Lagos. Thank you for your interest in FeastSync.\nTo help me give you the best quote and experience, please drop your event details (event type, date, time, location, guest count, vibe, and other specific requests) in the description box. I'll review them and get back to you shortly. Cheers!", time: "2:03pm" },
];

function getTime() {
  return new Date().toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();
}

function TypingIndicator() {
  return <div className="bubble bubble--them bubble--typing">···</div>;
}

export default function Chat() {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  function handleSend() {
    const val = input.trim();
    if (!val || isTyping) return;

    setMessages((prev) => [...prev, { id: Date.now(), from: "me", text: val, time: getTime() }]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), from: "them", text: "Got it! Anything else I can help with for the event?", time: getTime() },
      ]);
    }, 1500); 
  }

  return (
    <div className="chat">

    
      <div className="chat__header">
        <div className="chat__avatar">
          {dummyVendor.initials}
          {dummyVendor.isOnline && <span className="chat__avatar-dot" />}
        </div>

        <div className="chat__header-info">
          <h3 className="chat__vendor-name">{dummyVendor.name}</h3>
          <div className="chat__header-badges">
            {dummyVendor.isVerified && (
              <span className="badge badge--kyc">
                <img src={verifiedIcon} alt="verified" className="badge__icon" />
                KYC Verified
              </span>
            )}
            {dummyVendor.isOnline && (
              <span className="badge badge--online">Online</span>
            )}
          </div>
        </div>

        <div className="chat__header-actions">
          <button className="icon-btn" aria-label="View profile">
            <img src={profileIcon} alt="profile" />
          </button>
          <button className="icon-btn" aria-label="View calendar">
            <img src={calendarIcon} alt="calendar" />
          </button>
        </div>
      </div>

   
      <div className="chat__body" ref={bodyRef}>
        <div className="chat__date-divider">
          <span>Today, 17th June, 2026</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`bubble bubble--${msg.from}`}>
            <p className="bubble__text">{msg.text}</p>
            <span className="bubble__time">{msg.time}</span>
          </div>
        ))}

        {isTyping && <TypingIndicator />}
      </div>

     
      <div className="chat__input-row">
        <input
          className="chat__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message here"
        />
        <button className="chat__send-btn" onClick={handleSend} aria-label="Send">
          <img src={sendIcon} alt="send" />
        </button>
      </div>

    </div>
  );
}