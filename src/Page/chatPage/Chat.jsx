import { useState, useRef, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import sendIcon from "../../assets/logos/sendicon.png";
import profileIcon from "../../assets/logos/focusIcon.png";
import calendarIcon from "../../assets/logos/calender.png";
import verifiedIcon from "../../assets/logos/verifiedicon.png";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const dummyVendor = {
  name: "DJ Kolade, Lagos, Nigeria.",
  initials: "DJ",
  isVerified: true,
  isOnline: true,
};

function TypingIndicator() {
  return <div className="bubble bubble--them bubble--typing">···</div>;
}

export default function Chat() {
  const { roomId, errandId } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping] = useState(false);

  const bodyRef = useRef(null);
  const socketRef = useRef(null);

  const user = useSelector((state) => state.auth.userInfo);

  // Load chat history
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/message/messages/history/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data.data || []);
    } catch (error) {
      // console.error(error);
    }
  };

  // Fetch messages when page loads
  useEffect(() => {
    if (roomId) {
      fetchMessages();
    }
  }, [roomId]);

  // Socket connection
  useEffect(() => {
    if (!roomId) return;

    socketRef.current = io(import.meta.env.VITE_SOCKET_URL);

    socketRef.current.emit("join_room", roomId);

    socketRef.current.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Send message
  const handleSend = async () => {
    const val = input.trim();

    if (!val) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL
}/message/${errandId}`,
        {
          text: val,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      

      const newMessage = res.data.data;

      setMessages((prev) => [...prev, newMessage]);

      setInput("");

      // Optional if backend later supports it
      socketRef.current?.emit("send_message", {
        roomId,
        message: newMessage,
      });
    } catch (error) {
      // console.error(error.message);
    }
  };

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
                <img
                  src={verifiedIcon}
                  alt="verified"
                  className="badge__icon"
                />
                KYC Verified
              </span>
            )}

            {dummyVendor.isOnline && (
              <span className="badge badge--online">
                Online
              </span>
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
          <span>Today</span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id || msg._id}
            className={`bubble ${
              msg.senderId === user?.id ||
              msg.sender?._id === user?._id ||
              msg.sender?.id === user?.id
                ? "bubble--me"
                : "bubble--them"
            }`}
          >
            <p className="bubble__text">{msg.text}</p>

            <span className="bubble__time">
              {new Date(
                msg.createdAt
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
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

        <button
          className="chat__send-btn"
          onClick={handleSend}
          aria-label="Send"
        >
          <img src={sendIcon} alt="send" />
        </button>
      </div>
    </div>
  );
} 