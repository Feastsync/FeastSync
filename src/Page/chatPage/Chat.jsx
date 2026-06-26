import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import api from "../../Redux/app/socketAxios";
import sendIcon from "../../assets/logos/sendicon.png";
import verifiedIcon from "../../assets/logos/verifiedicon.png";
import "./Chat.css";
import { message } from "antd";
import { getNotifications } from "../../Redux/features/authslice";

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
  const dispatch = useDispatch();

  const isVendor = accountType === "vendor";
  const me = isVendor ? vendorInfo : userInfo;
  const myId = me?._id || me?.id;

  const [conversations, setConversations] = useState([]);
  const [inboxLoading, setInboxLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping] = useState(false);
  const [booking, setBooking] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const bodyRef = useRef(null);
  const socketRef = useRef(null);
  const initialLoadRef = useRef(true);

  // Derive active chat info from conversations and bookingId
  const activeChat = conversations.find((c) => c.bookingId === bookingId) || null;
  const activeChatName = activeChat?.name || "";
  const activeChatAvatar = activeChat?.avatar || null;

  // Fetch inbox
  useEffect(() => {
    const fetchInbox = async () => {
      // Only show loading on initial load
      if (initialLoadRef.current) {
        setInboxLoading(true);
      }

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
            paymentStatus: booking.paymentStatus || "",
            time: booking.updatedAt || booking.createdAt || null,
          };
        });

        setConversations(mapped);
      } catch (error) {
        console.error("Failed to load inbox:", error);
      } finally {
        if (initialLoadRef.current) {
          setInboxLoading(false);
          initialLoadRef.current = false;
        }
      }
    };

    fetchInbox();

    // Poll for conversation updates every 10 seconds for live status
    const interval = setInterval(fetchInbox, 10000);

    return () => clearInterval(interval);
  }, [isVendor]);

  // Fetch messages
  useEffect(() => {
    if (!bookingId) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/v1/message/${bookingId}`);

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

    // Poll for booking updates every 10 seconds for live status
    // This won't affect socket as they use different protocols
    const interval = setInterval(loadBooking, 10000);

    return () => clearInterval(interval);
  }, [bookingId]);

  // Refresh booking and conversations if returning from payment
  useEffect(() => {
    const pendingBookingId = sessionStorage.getItem("pendingPaymentBookingId");
    
    if (pendingBookingId && pendingBookingId === bookingId) {
      // Clear the flag
      sessionStorage.removeItem("pendingPaymentBookingId");
      
      // Refresh booking data after a short delay to ensure server has processed payment
      const timer = setTimeout(async () => {
        try {
          // Refresh booking details
          const bookingRes = await api.get(`/api/v1/bookings/single/${bookingId}`);
          setBooking(bookingRes.data?.booking);
          
          // Refresh conversations list to get updated status
          const endpoint = isVendor
            ? "/api/v1/bookings/vendor"
            : "/api/v1/bookings/client";
          const convRes = await api.get(endpoint);
          
          const bookings = convRes.data?.bookings || convRes.data?.data || [];
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
          
          // Also refresh notifications to get payment confirmation
          dispatch(getNotifications());
        } catch (error) {
          console.error("Failed to refresh data after payment:", error);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [bookingId, dispatch, isVendor]);

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
        sessionStorage.setItem("pendingPaymentBookingId", bookingId);
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
      
      // Emit event to trigger unread count on receiver's end
      socketRef.current?.emit("new_message_notification", {
        receiverId: isVendor ? booking.userId._id : booking.vendorId._id,
        bookingId: bookingId,
        senderName: isVendor ? "Vendor" : "Client",
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Derived state for payment and chat gating
  // Check both booking object and conversation status
  const bookingStatus = booking?.bookingStatus || activeChat?.status || "";
  const isBookingAccepted = ["accepted", "confirmed"].includes(bookingStatus);
  
  // If booking is confirmed, payment is considered confirmed
  const isPaymentConfirmed = (
    bookingStatus === "confirmed" ||
    booking?.paymentStatus === "success" || 
    booking?.paymentStatus === "completed" ||
    booking?.isPaid === true ||
    booking?.paid === true
  );
  
  const canProceedToPayment = isBookingAccepted && !isPaymentConfirmed;
  const canChat = isBookingAccepted && isPaymentConfirmed;

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
              <button className="chats-back-header-btn" onClick={() => navigate("/")}>
                Back
              </button>
              {!isVendor && (
                <button
                  className={`chats-pay-btn ${isPaymentConfirmed ? "chats-pay-btn--paid" : ""}`}
                  onClick={handlePayment}
                  disabled={paymentLoading || !canProceedToPayment}
                >
                  {isPaymentConfirmed ? "✓ Paid" : "Proceed to Payment"}
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
                {!isVendor && !canChat ? (
                  <div className="chats-chat__blocked">
                    {!isBookingAccepted
                      ? booking?.bookingStatus === "rejected"
                        ? "❌ Booking rejected. Chat unavailable."
                        : "⏳ Waiting for vendor to accept your booking."
                      : "💳 Payment must be made to enable conversation."}
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