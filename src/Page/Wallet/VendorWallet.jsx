import { useNavigate } from "react-router-dom";
import Button from "../../Props/Button";
import { useWalletSummary, useWalletTransactions } from "./Usewallet";
import "../NewCss1/VendorWallet.css";

const TYPE_LABEL = {
  escrow: "Escrow hold",
  commission: "Commission",
  release: "Milestone release",
};

const STATUS_COLOR = {
  successful: "Vendor_tx_status--success",
  pending: "Vendor_tx_status--pending",
};

export default function VendorWallet() {
  const navigate = useNavigate();
  const { summary, loading: summaryLoading, error: summaryError } = useWalletSummary();
  const { transactions, loading: txLoading, error: txError } = useWalletTransactions();

  const formatCurrency = (num) =>
    `₦${Math.abs(Number(num) || 0).toLocaleString("en-NG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

  const recentTransactions = transactions.slice(0, 5);

  if (summaryLoading || txLoading) {
    return (
      <div className="Vendor_wallet_container">
        <div className="Vendor_wallet_loading">Loading wallet...</div>
      </div>
    );
  }

  if (summaryError || txError) {
    return (
      <div className="Vendor_wallet_container">
        <div className="Vendor_wallet_error">
          <p>Failed to load wallet: {summaryError || txError}</p>
          <Button onClick={() => window.location.reload()} btnText="Retry" />
        </div>
      </div>
    );
  }

  return (
    <div className="Vendor_wallet_container">
      <div className="Vendor_wallet_header">
        <div className="Vendor_wallet_header_left">
          <Button
            className="Vendor_wallet_back"
            onClick={() => navigate("/vendordashboard")}
          >
            <span>←</span> Back
          </Button>
          <div className="Vendor_wallet_balance">
            <p className="Vendor_wallet_label">
              <span>👁</span> Available balance
            </p>
            <h1 className="Vendor_wallet_amount">
              {formatCurrency(summary?.availableBalance)}
            </h1>
          </div>
        </div>

        <div className="Vendor_wallet_actions">
          <Button
            className="Vendor_wallet_action_btn"
            onClick={() => navigate("/wallet/withdraw")}
          >
            <span>📄</span> Withdraw
          </Button>
          <Button
            className="Vendor_wallet_action_btn"
            onClick={() => navigate("/transaction/histories")}
          >
            <span>🕓</span> History
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="Vendor_wallet_stats">
        <div className="Vendor_wallet_stat_card">
          <p className="Vendor_wallet_stat_label">Total earned (2026)</p>
          <h2 className="Vendor_wallet_stat_value">
            {formatCurrency(summary?.totalEarnedThisYear)}
          </h2>
        </div>
        <div className="Vendor_wallet_stat_card">
          <p className="Vendor_wallet_stat_label">Pending release in escrow</p>
          <h2 className="Vendor_wallet_stat_value">
            {formatCurrency(summary?.pendingEscrow)}
          </h2>
          <p className="Vendor_wallet_stat_sub">Releases on event completion</p>
        </div>
        <div className="Vendor_wallet_stat_card">
          <p className="Vendor_wallet_stat_label">Completed bookings</p>
          <h2 className="Vendor_wallet_stat_value">
            {summary?.completedBookings ?? 0}
          </h2>
          <p className="Vendor_wallet_stat_sub">
            {summary?.pendingBookings ?? 0} pending
          </p>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="Vendor_wallet_section">
        <div className="Vendor_wallet_section_header">
          <span>Recent transactions</span>
          <Button
            className="Vendor_wallet_see_more"
            onClick={() => navigate("/transaction/histories")}
            btnText="See more"
          />
        </div>

        {recentTransactions.length > 0 ? (
          recentTransactions.map((tx) => (
            <div className="Vendor_recent_tx" key={tx.id}>
              <div>
                <p className="Vendor_recent_tx_title">
                  {TYPE_LABEL[tx.transactionType] ?? tx.transactionType}
                </p>
                <p className="Vendor_recent_tx_id">{tx.bookingId}</p>
              </div>
              <div className="Vendor_recent_tx_right">
                <p className="Vendor_recent_tx_amount">
                  {formatCurrency(tx.amount)}
                </p>
                <span
                  className={`Vendor_tx_status ${STATUS_COLOR[tx.status] ?? ""}`}
                >
                  {tx.status}
                </span>
                <p className="Vendor_recent_tx_date">{tx.date}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="Vendor_wallet_empty">No recent transactions</p>
        )}
      </div>
    </div>
  );
}