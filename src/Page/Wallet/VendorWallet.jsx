import { useNavigate } from "react-router-dom";
import Button from "../../Props/Button";
import { walletSummary } from "../../Components/DummyData";
import "../NewCss1/VendorWallet.css"

export default function VendorWallet() {
  const navigate = useNavigate();
  const formatCurrency = (num) => `₦${Math.abs(num).toLocaleString()}`;

  return (
    <div className="Vendor_wallet_container">
      <div className="Vendor_wallet_header">
        <div className="Vendor_wallet_header_left">
          <Button 
            className="Vendor_wallet_back" 
            onClick={() => navigate('/vendordashboard')}
          >
            <span>←</span> Back
          </Button>
          <div className="Vendor_wallet_balance">
            <p className="Vendor_wallet_label"><span>👁</span> Available balance</p>
            <h1 className="Vendor_wallet_amount">{formatCurrency(walletSummary.availableBalance)}</h1>
          </div>
        </div>

        <div className="Vendor_wallet_actions">
          <Button 
            className="Vendor_wallet_action_btn" 
            onClick={() => navigate('/wallet/withdraw')}
          >
            <span>📄</span> Withdraw
          </Button>
          <Button 
            className="Vendor_wallet_action_btn" 
            onClick={() => navigate('/transaction/histories')}
          >
            <span>🕓</span> History
          </Button>
        </div>
      </div>

      <div className="Vendor_wallet_stats">
        <div className="Vendor_wallet_stat_card">
          <p className="Vendor_wallet_stat_label">Total earned (2026)</p>
          <h2 className="Vendor_wallet_stat_value">₦2.14M</h2>
          <p className="Vendor_wallet_stat_sub">↑18% vs last year</p>
        </div>
        <div className="Vendor_wallet_stat_card">
          <p className="Vendor_wallet_stat_label">Pending release In escrow</p>
          <h2 className="Vendor_wallet_stat_value">{formatCurrency(walletSummary.pendingEscrow)}</h2>
          <p className="Vendor_wallet_stat_sub">Releases on event completion</p>
        </div>
        <div className="Vendor_wallet_stat_card">
          <p className="Vendor_wallet_stat_label">Completed bookings</p>
          <h2 className="Vendor_wallet_stat_value">{walletSummary.completedBookings}</h2>
          <p className="Vendor_wallet_stat_sub">3 upcoming confirmed</p>
        </div>
      </div>

      <div className="Vendor_wallet_section">
        <div className="Vendor_wallet_section_header">Milestone tracker</div>
        {walletSummary.milestones?.map(item => (
          <div className="Vendor_milestone_item" key={item.id}>
            <div>
              <h3 className="Vendor_milestone_title">{item.title}</h3>
              <p className="Vendor_milestone_id">{item.bookingId}</p>
            </div>
            <div className="Vendor_milestone_bottom">
              <p className="Vendor_milestone_received">
                {formatCurrency(item.received)} received {item.note}
              </p>
              {item.escrow > 0? (
                <p className="Vendor_milestone_escrow">
                  {formatCurrency(item.escrow)} held in escrow (to be on event day)
                </p>
              ) : (
                <p className="Vendor_milestone_complete">Payment Completed</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="Vendor_wallet_section">
        <div className="Vendor_wallet_section_header">
          <span>Recent transactions</span>
          <Button 
            className="Vendor_wallet_see_more" 
            onClick={() => navigate('/transaction/histories')} 
            btnText="See more" 
          />
        </div>
        {walletSummary.recentTransactions?.map(tx => (
          <div className="Vendor_recent_tx" key={tx.id}>
            <div>
              <p className="Vendor_recent_tx_title">{tx.description}</p>
              <p className="Vendor_recent_tx_id">{tx.bookingId}{tx.eventName && ` · ${tx.eventName}`}</p>
            </div>
            <div className="Vendor_recent_tx_right">
              <p className="Vendor_recent_tx_amount">
                {tx.amount > 0? '+' : ''}{formatCurrency(tx.amount)}
              </p>
              <p className="Vendor_recent_tx_date">{tx.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}