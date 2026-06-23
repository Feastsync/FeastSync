import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Props/Button";
import Imp from "../../Props/Imp";
import TransactionTable from "./TransactionTable";
import { useWalletTransactions } from "./Usewallet";
import "../NewCss1/WalletLedger.css";


const TABS = [
  { key: "all", label: "All types" },
  { key: "release", label: "Milestone releases" },
  { key: "escrow", label: "Escrow hold" },
  { key: "commission", label: "Commission" },
  { key: "pending", label: "Pending" },
];

export default function WalletLedger() {
  const navigate = useNavigate();
  const { transactions, pagination, loading, error } = useWalletTransactions();

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (num) =>
    `₦${Math.abs(Number(num) || 0).toLocaleString("en-NG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

  // Derive stats from live data
  const stats = useMemo(() => {
    const totalCredits = transactions
      .filter((tx) => tx.status === "successful")
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

    const inEscrow = transactions
      .filter((tx) => tx.transactionType === "escrow")
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

    const commission = transactions
      .filter((tx) => tx.transactionType === "commission")
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

    return {
      totalCredits,
      inEscrow,
      commission,
      totalTransactions: pagination?.totalRecords ?? transactions.length,
    };
  }, [transactions, pagination]);

  // Filter by tab + search
  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesTab =
        activeTab === "all"
          ? true
          : activeTab === "pending"
          ? tx.status === "pending"
          : tx.transactionType === activeTab;

      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !term || tx.bookingId?.toLowerCase().includes(term);

      return matchesTab && matchesSearch;
    });
  }, [transactions, activeTab, searchTerm]);

  if (loading) {
    return (
      <div className="Wallet_ledger_container">
        <div className="Wallet_ledger_loading">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Wallet_ledger_container">
        <div className="Wallet_ledger_error">
          <p>Failed to load transactions: {error}</p>
          <Button onClick={() => window.location.reload()} btnText="Retry" />
        </div>
      </div>
    );
  }

  return (
    <div className="Wallet_ledger_container">
      <div className="Wallet_ledger_header">
        <Button
          className="Wallet_ledger_back"
          onClick={() => navigate("/wallet/transactions")}
          btnText="← Back"
        />
        <div>
          <h1 className="Wallet_ledger_title">All transactions</h1>
          <p className="Wallet_ledger_subtitle">Wallet ledger</p>
        </div>
      </div>

      <div className="Wallet_ledger_stats">
        <div className="Wallet_ledger_stat_card">
          <p className="Wallet_ledger_stat_label">Total successful</p>
          <h2 className="Wallet_ledger_stat_value">
            {formatCurrency(stats.totalCredits)}
          </h2>
          <p className="Wallet_ledger_stat_sub">Cleared transactions</p>
        </div>
        <div className="Wallet_ledger_stat_card">
          <p className="Wallet_ledger_stat_label">Commission deducted</p>
          <h2 className="Wallet_ledger_stat_value">
            {formatCurrency(stats.commission)}
          </h2>
          <p className="Wallet_ledger_stat_sub">Platform fees</p>
        </div>
        <div className="Wallet_ledger_stat_card">
          <p className="Wallet_ledger_stat_label">Currently in escrow</p>
          <h2 className="Wallet_ledger_stat_value">
            {formatCurrency(stats.inEscrow)}
          </h2>
          <p className="Wallet_ledger_stat_sub">Held — not yet cleared</p>
        </div>
        <div className="Wallet_ledger_stat_card">
          <p className="Wallet_ledger_stat_label">Total records</p>
          <h2 className="Wallet_ledger_stat_value">
            {stats.totalTransactions}
          </h2>
          <p className="Wallet_ledger_stat_sub">transactions</p>
        </div>
      </div>

      <div className="Wallet_ledger_search">
        <Imp
          type="text"
          placeholder="Search by booking ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="Wallet_ledger_filters">
        {TABS.map((tab) => (
          <Button
            key={tab.key}
            className={`Wallet_filter_btn ${
              activeTab === tab.key ? "Wallet_filter_btn--active" : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
            btnText={tab.label}
          />
        ))}
      </div>

      <TransactionTable transactions={filtered} />
    </div>
  );
}