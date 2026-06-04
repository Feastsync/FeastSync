import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Props/Button";
import AllTransactions from "./AllTransaction";
import MilestoneReleases from "./MilestoneReleases";
import EscrowHold from "./EscrowHold";
import Withdrawn from "./Withdrawn";
import Pending from "./Pending";
import Refunds from "./Refunds";
import Imp from "../../Props/Imp";
import { ledgerStats } from "../../Components/DummyData";
import "../Css/WalletLedger.css";

const TABS = [
  { key: "all", label: "All types", Component: AllTransactions },
  { key: "milestone", label: "milestone releases", Component: MilestoneReleases },
  { key: "escrow", label: "escrow hold", Component: EscrowHold },
  { key: "withdrawn", label: "withdrawn", Component: Withdrawn },
  { key: "pending", label: "pending", Component: Pending },
  { key: "refunds", label: "refunds", Component: Refunds }
];

export default function WalletLedger() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const ActiveComponent = TABS.find(tab => tab.key === activeTab).Component;
  const formatCurrency = (num) => `₦${num.toLocaleString()}`;

  return (
    <div className="Wallet_ledger_container">
      <div className="Wallet_ledger_header">
        <Button 
          className="Wallet_ledger_back" 
          onClick={() => navigate('/vendor/wallet')} 
          btnText="← Back"
        />
        <div>
          <h1 className="Wallet_ledger_title">All transactions</h1>
          <p className="Wallet_ledger_subtitle">{ledgerStats.vendorName} Wallet ledger</p>
        </div>
      </div>

      <div className="Wallet_ledger_stats">
        <div className="Wallet_ledger_stat_card">
          <p className="Wallet_ledger_stat_label">Total credits</p>
          <h2 className="Wallet_ledger_stat_value">{formatCurrency(ledgerStats.totalCredits)}</h2>
          <p className="Wallet_ledger_stat_sub">Milestone + deposits</p>
        </div>
        <div className="Wallet_ledger_stat_card">
          <p className="Wallet_ledger_stat_label">Total withdrawn</p>
          <h2 className="Wallet_ledger_stat_value">{formatCurrency(ledgerStats.totalWithdrawn)}</h2>
          <p className="Wallet_ledger_stat_sub">Paid to bank</p>
        </div>
        <div className="Wallet_ledger_stat_card">
          <p className="Wallet_ledger_stat_label">Currently in escrow</p>
          <h2 className="Wallet_ledger_stat_value">{formatCurrency(ledgerStats.inEscrow)}</h2>
          <p className="Wallet_ledger_stat_sub">Held — not yet cleared</p>
        </div>
        <div className="Wallet_ledger_stat_card">
          <p className="Wallet_ledger_stat_label">Showing</p>
          <h2 className="Wallet_ledger_stat_value">{ledgerStats.totalTransactions}</h2>
          <p className="Wallet_ledger_stat_sub">transactions</p>
        </div>
      </div>

      <div className="Wallet_ledger_search">
        <span className="Wallet_search_icon">🔍</span>
        <Imp
          type="text"
          placeholder="Search booking ID / event name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="Wallet_ledger_filters">
        {TABS.map((tab) => (
          <Button
            key={tab.key}
            className={`Wallet_filter_btn ${activeTab === tab.key? 'Wallet_filter_btn--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
            btnText={tab.label}
          />
        ))}
      </div>

      <ActiveComponent searchTerm={searchTerm} />
    </div>
  );
}