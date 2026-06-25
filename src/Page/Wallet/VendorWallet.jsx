import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../Props/Button";
import { useWalletSummary, useWalletTransactions } from "./Usewallet";
import api from "../../Redux/app/axios";
import { message } from "antd";
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

const formatCurrency = (num) =>
  `₦${Math.abs(Number(num) || 0).toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

export default function VendorWallet() {
  const navigate = useNavigate();
  const { vendorInfo } = useSelector((s) => s.auth);
  const { summary, loading: summaryLoading, error: summaryError } = useWalletSummary();
  const { transactions, loading: txLoading, error: txError } = useWalletTransactions();

  const [balanceVisible, setBalanceVisible] = useState(() => {
    const saved = localStorage.getItem("balanceVisible");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [modal, setModal] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("balanceVisible", JSON.stringify(balanceVisible));
  }, [balanceVisible]);

  const closeModal = () => {
    setModal(null);
    setWithdrawAmount('');
  };

  const handleWithdraw = async () => {
    try {
      setWithdrawLoading(true);
      await api.post('/payment/payout-funds', {
        bankCode: vendorInfo.bankCode, 
        amount: Number(withdrawAmount)
      });
      message.success('Withdrawal initiated successfully');
      closeModal();
      // window.location.reload();
    } catch (err) {
      message.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setWithdrawLoading(false);
    }
  };

  const recentTransactions = transactions.slice(0, 5);
  const isNewUser = !summaryLoading && !txLoading && summary?.availableBalance === 0 && transactions.length === 0;

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
              <button
                className="Vendor_wallet_eye"
                onClick={() => setBalanceVisible(!balanceVisible)}
                aria-label={balanceVisible ? "Hide balance" : "Show balance"}
              >
                <span>{balanceVisible ? "👁" : "👁🗨"}</span>
              </button>
              Available balance
            </p>
            {summaryLoading ? (
              <div className="skeleton-line skeleton-balance" />
            ) : (
              <h1 className="Vendor_wallet_amount">
                {balanceVisible
                  ? formatCurrency(summary?.availableBalance)
                  : "••••••"
                }
              </h1>
            )}
          </div>
        </div>

        <div className="Vendor_wallet_actions">
          <Button
            className="Vendor_wallet_action_btn"
            onClick={() => setModal('withdraw')}
            disabled={isNewUser}
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

      <div className="Vendor_wallet_stats">
        <StatCard
          loading={summaryLoading}
          label="Total earned (2026)"
          value={formatCurrency(summary?.totalEarnedThisYear)}
        />
        <StatCard
          loading={summaryLoading}
          label="Pending release in escrow"
          value={formatCurrency(summary?.pendingEscrow)}
          sub="Releases on event completion"
        />
        <StatCard
          loading={summaryLoading}
          label="Completed bookings"
          value={summary?.completedBookings ?? 0}
          sub={`${summary?.pendingBookings ?? 0} pending`}
        />
      </div>

      <div className="Vendor_wallet_section">
        <div className="Vendor_wallet_section_header">
          <span>Recent transactions</span>
          <Button
            className="Vendor_wallet_see_more"
            onClick={() => navigate("/transaction/histories")}
            btnText="See more"
          />
        </div>

        {txLoading ? (
          <RecentTransactionsSkeleton />
        ) : isNewUser ? (
          <div className="Vendor_wallet_onboard">
            <div className="Vendor_wallet_onboard_icon">💰</div>
            <h3 className="Vendor_wallet_onboard_title">Welcome to your wallet</h3>
            <p className="Vendor_wallet_onboard_text">
              You have no transaction yet
            </p>
          </div>
        ) : recentTransactions.length > 0 ? (
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

      {modal === 'withdraw' && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_box" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3>Withdraw Funds</h3>
              <button className="modal_close" onClick={closeModal}>×</button>
            </div>
            <div className="modal_body">
              {!vendorInfo?.bankName || !vendorInfo?.accountNumber ? (
                <div className="Vendor_wallet_empty_state">
                  <p>No bank account found.</p>
                  <Button
                    className="modal_btn_primary"
                    onClick={() => navigate('/settings')}
                    btnText="Add Bank in Settings"
                  />
                </div>
              ) : (
                <>
                  <div className="withdraw_bank_card">
                    <p className="modal_label">To</p>
                    <div className="withdraw_bank_info">
                      <strong>{vendorInfo.bankName}</strong>
                      <span>•••• {vendorInfo.accountNumber.slice(-4)}</span>
                    </div>
                  </div>

                  <label className="modal_label">Amount</label>
                  <div className="withdraw_input_wrap">
                    <span className="withdraw_currency">₦</span>
                    <input
                      type="number"
                      className="modal_input"
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      max={summary?.availableBalance || 0}
                    />
                  </div>
                  <p className="modal_sublabel">
                    Available: {formatCurrency(summary?.availableBalance || 0)}
                  </p>

                  {withdrawAmount && Number(withdrawAmount) > (summary?.availableBalance || 0) && (
                    <p className="modal_error">Amount exceeds available balance</p>
                  )}
                </>
              )}
            </div>
            {vendorInfo?.bankName && vendorInfo?.accountNumber && (
              <div className="modal_footer">
                <button className="modal_btn_cancel" onClick={closeModal}>Cancel</button>
                <button
                  className="modal_btn_primary"
                  disabled={
                    withdrawLoading ||
                   !withdrawAmount ||
                    Number(withdrawAmount) <= 0 ||
                    Number(withdrawAmount) > (summary?.availableBalance || 0)
                  }
                  onClick={handleWithdraw}
                >
                  {withdrawLoading ? 'Processing...' : 'Withdraw'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ loading, label, value, sub }) {
  if (loading) {
    return (
      <div className="Vendor_wallet_stat_card Vendor_wallet_stat_card--loading">
        <div className="skeleton-line skeleton-stat-label" />
        <div className="skeleton-line skeleton-stat-value" />
        {sub && <div className="skeleton-line skeleton-stat-sub" />}
      </div>
    );
  }

  return (
    <div className="Vendor_wallet_stat_card">
      <p className="Vendor_wallet_stat_label">{label}</p>
      <h2 className="Vendor_wallet_stat_value">{value}</h2>
      {sub && <p className="Vendor_wallet_stat_sub">{sub}</p>}
    </div>
  );
}

function RecentTransactionsSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <div className="Vendor_recent_tx Vendor_recent_tx--skeleton" key={i}>
      <div>
        <div className="skeleton-line skeleton-tx-title" />
        <div className="skeleton-line skeleton-tx-id" />
      </div>
      <div className="Vendor_recent_tx_right">
        <div className="skeleton-line skeleton-tx-amount" />
        <div className="skeleton-line skeleton-tx-status" />
        <div className="skeleton-line skeleton-tx-date" />
      </div>
    </div>
  ));
}