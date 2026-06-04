import { allTransactions } from "../../Components/DummyData";
import TransactionTable from "./TransactionTable";

export default function Withdrawn({ searchTerm }) {
  const filtered = allTransactions.filter(tx => 
    tx.type === "withdrawn" &&
    (tx.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     tx.eventName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return <TransactionTable transactions={filtered} />;
}