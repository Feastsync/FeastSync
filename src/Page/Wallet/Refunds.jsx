import { allTransactions } from "../../Components/DummyData";
import TransactionTable from "./TransactionTable";

export default function Refunds({ searchTerm }) {
  const filtered = allTransactions.filter(tx => 
    tx.type === "refunds" &&
    (tx.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     tx.eventName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return <TransactionTable transactions={filtered} />;
}