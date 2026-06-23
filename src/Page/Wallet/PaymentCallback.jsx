import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { getNotifications } from "../../Redux/features/authslice";

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifying, setVerifying] = useState(true);
  const [status, setStatus] = useState("verifying");
  const processedRef = useRef(false);

  const bookingId = searchParams.get("bookingId");
  const paymentRef = searchParams.get("paymentRef") || searchParams.get("reference");
  const statusParam = searchParams.get("status");

  useEffect(() => {
    // Prevent double execution
    if (processedRef.current) return;
    processedRef.current = true;

    const handlePayment = async () => {
      if (!bookingId) {
        setStatus("error");
        setVerifying(false);
        message.error("No booking ID found");
        return;
      }

      // Payment was successful - refresh wallet data
      setStatus("success");
      message.success("Payment successful! Your transaction has been recorded.");
      
      // Refresh notifications to get payment notification
      dispatch(getNotifications());
      
      // Redirect to chat after 2 seconds
      setTimeout(() => {
        navigate(`/chats/${bookingId}`);
      }, 2000);
    };

    const handleFailedPayment = async () => {
      if (!bookingId) {
        setStatus("error");
        setVerifying(false);
        message.error("No booking ID found");
        return;
      }

      setStatus("failed");
      setVerifying(false);
      message.error("Payment was not completed");
      setTimeout(() => {
        navigate(`/chats/${bookingId}`);
      }, 3000);
    };

    // Handle based on status param
    if (statusParam === "success" || statusParam === "completed") {
      handlePayment();
    } else if (statusParam === "failed" || statusParam === "cancelled") {
      handleFailedPayment();
    } else {
      // No status param - assume success if redirected
      handlePayment();
    }
  }, [bookingId, paymentRef, statusParam, navigate, dispatch]);

  return (
    <div className="payment-callback-page">
      <div className="payment-callback-container">
        {verifying && (
          <>
            <div className="payment-spinner" />
            <h2>Verifying Payment...</h2>
            <p>Please wait while we confirm your payment.</p>
          </>
        )}

        {!verifying && status === "success" && (
          <>
            <div className="payment-success-icon">✓</div>
            <h2>Payment Successful!</h2>
            <p>Your payment has been confirmed and recorded.</p>
            <p>Redirecting you back to chat...</p>
          </>
        )}

        {!verifying && status === "failed" && (
          <>
            <div className="payment-error-icon">✗</div>
            <h2>Payment Failed</h2>
            <p>Your payment could not be verified.</p>
            <p>Redirecting you back to chat...</p>
          </>
        )}

        {!verifying && status === "error" && (
          <>
            <div className="payment-error-icon">!</div>
            <h2>Verification Error</h2>
            <p>Something went wrong while verifying your payment.</p>
            <p>Redirecting you back to chat...</p>
          </>
        )}
      </div>
    </div>
  );
}