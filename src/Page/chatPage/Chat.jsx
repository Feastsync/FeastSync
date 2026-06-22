import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import api from "../../Redux/app/socketAxios";
import sendIcon from "../../assets/logos/sendicon.png";
import verifiedIcon from "../../assets/logos/verifiedicon.png";
import "./Chat.css";
import { message } from "antd";

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;

  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function TypingIndicator() {
  return <div className="bubble bubble--them bubble--typing">···</div>;
}

export default function ChatsPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { userInfo, vendorInfo, accountType } = useSelector(
    (state) => state.auth
  );

  const isVendor = accountType === "vendor";
  const me = isVendor ? vendorInfo : userInfo;
  const myId = me?._id || me?.id;

  const [conversations, setConversations] = useState([]);
  const [inboxLoading, setInboxLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping] = useState(false);
  const [activeChatName, setActiveChatName] = useState("");
  const [activeChatAvatar, setActiveChatAvatar] = useState(null);
  const [booking, setBooking] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const bodyRef = useRef(null);
  const socketRef = useRef(null);

  // Fetch inbox
  useEffect(() => {
    const fetchInbox = async () => {
      setInboxLoading(true);

      try {
        const endpoint = isVendor
          ? "/api/v1/bookings/vendor"
          : "/api/v1/bookings/client";

        const res = await api.get(endpoint);

        const bookings =
          res.data?.bookings ||
          res.data?.data ||
          [];

        const mapped = bookings.map((booking) => {
          const name = isVendor
            ? `${booking.userId?.firstName || ""} ${booking.userId?.lastName || ""}`.trim() || "Client"
            : booking.vendorId?.stageName || "Vendor";

          const avatar = isVendor
            ? booking.userId?.profilePicture?.secureUrl ||
              booking.userId?.profilePicture ||
              null
            : booking.vendorId?.profilePicture?.secureUrl ||
              null;

          return {
            bookingId: booking._id,
            name,
            avatar,
            eventType: booking.eventType || "",
            status: booking.bookingStatus || booking.status || "pending",
            time: booking.updatedAt || booking.createdAt || null,
          };
        });

        setConversations(mapped);
      } catch (error) {
        console.error("Failed to load inbox:", error);
      } finally {
        setInboxLoading(false);
      }
    };

    fetchInbox();
  }, [isVendor]);

  // Active chat header
  useEffect(() => {
    if (!bookingId || !conversations.length) return;

    const active = conversations.find((c) => c.bookingId === bookingId);

    if (active) {
      setActiveChatName(active.name);
      setActiveChatAvatar(active.avatar);
    }
  }, [bookingId, conversations]);

  // Fetch messages
  useEffect(() => {
    if (!bookingId) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/v1/message/${bookingId}`);

        // console.log("MESSAGES RESPONSE:", res.data);

        setMessages(
          res.data?.messages ||
          res.data?.data ||
          res.data ||
          []
        );
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    fetchMessages();
  }, [bookingId]);

  // Fetch booking details
  useEffect(() => {
    if (!bookingId) return;

    const loadBooking = async () => {
      try {
        const res = await api.get(`/api/v1/bookings/single/${bookingId}`);
        setBooking(res.data?.booking);
      } catch (error) {
        console.error("Failed to load booking:", error);
      }
    };

    loadBooking();
  }, [bookingId]);

  // Socket connection
  useEffect(() => {
    if (!bookingId) return;

    const socket = io("https://feastsyn-booking-app.onrender.com");

    socketRef.current = socket;

    socket.emit("join_room", bookingId);

    socket.on("receive_message", (msg) => {
      setMessages((prev) => {
        const exists = prev.some(
          (m) => (m._id || m.id) === (msg._id || msg.id)
        );
        return exists ? prev : [...prev, msg];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [bookingId]);

  // Auto scroll
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePayment = async () => {
    if (!booking || !bookingId) {
      message.warning("Booking details not loaded yet");
      return;
    }
    const vendorId = booking.vendorId?._id || booking.vendorId;
    if (!vendorId) {
      message.error("Vendor ID missing from booking");
      return;
    }
    setPaymentLoading(true);
    try {
      const res = await api.post(
        `/api/v1/payment/initialize-payment/${vendorId}/${bookingId}`
      );
      const paymentData = res.data?.data || res.data;
      const paymentUrl =
        paymentData?.checkout_url ||
        paymentData?.authorization_url ||
        paymentData?.link;

      if (paymentUrl) {
        message.loading("Redirecting to KoraPay...", 1);
        window.location.href = paymentUrl;
      } else {
        message.error("Payment link not received from server");
      }
    } catch (error) {
      console.error("Payment initialization failed:", error);
      message.error(error.response?.data?.message || "Could not start payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  // Send message
  const handleSend = async () => {
    const val = input.trim();
    if (!val || !booking) return;

    if (!["accepted", "confirmed"].includes(booking.bookingStatus)) {
  message.warning(
    booking.bookingStatus === "rejected"
      ? "This booking was rejected. You cannot send messages."
      : "You cannot chat until the vendor accepts your booking."
  );
  return;
}

    try {
      const res = await api.post(`/api/v1/message/messages/${bookingId}`, {
        text: val,
        senderId: isVendor ? booking.vendorId._id : booking.userId._id,
        receiverId: isVendor ? booking.userId._id : booking.vendorId._id,
        roomId: booking._id,
        booking: booking._id,
      });

      const newMessage = res.data?.data || res.data;

      setMessages((prev) => [...prev, newMessage]);
      setInput("");

      socketRef.current?.emit("send_message", {
        roomId: bookingId,
        message: newMessage,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="chats-page">
      <aside
        className={`chats-sidebar ${bookingId ? "chats-sidebar--hidden-mobile" : ""}`}
      >
        <div className="chats-sidebar__header">
          <button
            className="chats-sidebar__back-btn"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            ‹
          </button>
          <h2 className="chats-sidebar__title">Messages</h2>
        </div>

        {inboxLoading && (
          <div className="chats-sidebar__skeletons">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="cs-skeleton">
                <div className="cs-skeleton__avatar" />
                <div className="cs-skeleton__lines">
                  <div className="cs-skeleton__line cs-skeleton__line--name" />
                  <div className="cs-skeleton__line cs-skeleton__line--msg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!inboxLoading && conversations.length === 0 && (
          <div className="chats-sidebar__empty">
            <span>💬</span>
            <p>No conversations yet</p>
          </div>
        )}

        {!inboxLoading && conversations.length > 0 && (
          <ul className="cs-list">
            {conversations.map((conv) => (
              <li
                key={conv.bookingId}
                className={`cs-item ${bookingId === conv.bookingId ? "cs-item--active" : ""}`}
                onClick={() => navigate(`/chats/${conv.bookingId}`)}
              >
                <div className="cs-avatar">
                  {conv.avatar ? (
                    <img src={conv.avatar} alt={conv.name} />
                  ) : (
                    getInitials(conv.name)
                  )}
                </div>

                <div className="cs-item__body">
                  <div className="cs-item__top">
                    <span className="cs-item__name">{conv.name}</span>
                    <span className="cs-item__time">{timeAgo(conv.time)}</span>
                  </div>

                  <div className="cs-item__bottom">
                    <span className="cs-item__preview">{conv.eventType}</span>
                    <span className={`cs-item__status cs-item__status--${conv.status?.toLowerCase()}`}>
                      {conv.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <section className="chats-main">
        <div className="chats-chat">

          <div className="chats-chat__header">
            <button
              className="chats-back-btn"
              onClick={() => navigate("/chats")}
              aria-label="Back"
            >
              ‹
            </button>

            <div className="chats-chat__avatar">
              {activeChatAvatar ? (
                <img src={activeChatAvatar} alt={activeChatName} />
              ) : (
                getInitials(activeChatName)
              )}
              <span className="chats-chat__avatar-dot" />
            </div>

            <div className="chats-chat__info">
              <h3 className="chats-chat__name">
                {activeChatName || "Select a conversation"}
              </h3>
              <div className="chats-chat__badges">
                {activeChatName && (
                  <>
                    <span className="chats-badge chats-badge--kyc">
                      <img src={verifiedIcon} alt="verified" className="chats-badge__icon" />
                      KYC Verified
                    </span>
                    <span className="chats-badge chats-badge--online">Online</span>
                  </>
                )}
              </div>
            </div>

            <div className="chats-chat__actions">
              <button className="chats-back-header-btn" onClick={() => navigate(-1)}>
                Back
              </button>
              {!isVendor && (
                <button
                  className="chats-pay-btn"
                  onClick={handlePayment}
                  disabled={
  paymentLoading ||
  !booking ||
  !["accepted", "confirmed"].includes(booking.bookingStatus)
}

                >
                  Proceed to Payment
                </button>
              )}
            </div>
          </div>

          {!bookingId ? (
            <div className="chats-main__placeholder">
              <span>💬</span>
              <p>Select a conversation to start chatting</p>
            </div>
          ) : (
            <>
              <div className="chats-chat__body" ref={bodyRef}>
                <div className="chats-date-divider">
                  <span>Today</span>
                </div>

                {messages.map((msg) => {
                  const isMine =
                    msg.senderId === myId ||
                    msg.sender?._id === myId ||
                    msg.sender?.id === myId;

                  return (
                    <div
                      key={msg._id || msg.id}
                      className={`bubble ${isMine ? "bubble--me" : "bubble--them"}`}
                    >
                      <p className="bubble__text">{msg.text || msg.content}</p>
                      <span className="bubble__time">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  );
                })}

                {isTyping && <TypingIndicator />}
              </div>

              <div className="chats-chat__input-row">
                 {!isVendor && booking && !["accepted", "confirmed"].includes(booking.bookingStatus) ? (
  <div className="chats-chat__blocked">
    {booking.bookingStatus === "rejected"
      ? "❌ Booking rejected. Chat unavailable."
      : "⏳ Waiting for vendor to accept your booking."}
  </div>
) : (
  <>
    <input
      className="chats-chat__input"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
      placeholder="Type your message here"
    />
    <button
      className="chats-chat__send-btn"
      onClick={handleSend}
      aria-label="Send"
    >
      <img src={sendIcon} alt="send" />
    </button>
  </>
)}

              </div>
            </>
          )}

        </div>
      </section>
    </div>
  );
}