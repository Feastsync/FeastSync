import { allTransactions } from "../../Components/DummyData";
import TransactionTable from "./TransactionTable";

export default function EscrowHold({ searchTerm }) {
  const filtered = allTransactions.filter(tx => 
    tx.type === "escrow" &&
    (tx.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     tx.eventName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return <TransactionTable transactions={filtered} />;
}