import { useState } from "react";
import Button from "../../Props/Button";

export default function TransactionTable({ transactions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginated = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const formatCurrency = (num) => `₦${Math.abs(num).toLocaleString()}`;

  return (
    <>
      <div className="Wallet_ledger_table">
        <div className="Wallet_table_header">
          <span>Description</span><span>Booking ID</span><span>Date</span><span>Amount</span>
        </div>
        <div className="Wallet_table_body">
          {paginated.length === 0? (
            <p className="Wallet_empty">No transactions found</p>
          ) : (
            paginated.map((tx) => (
              <div className="Wallet_table_row" key={tx.id}>
                <div className="Wallet_row_desc">
                  <p className="Wallet_row_title">{tx.description}</p>
                  <p className="Wallet_row_event">{tx.eventName}</p>
                </div>
                <span data-label="Booking ID">{tx.bookingId}</span>
                <span data-label="Date">{tx.date}</span>
                <span data-label="Amount">{tx.amount > 0? '+' : '-'}{formatCurrency(tx.amount)}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="Wallet_ledger_pagination">
          <Button className="Wallet_pg_btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} btnText="Prev" disabled={currentPage === 1} />
          <div className="Wallet_pg_indicator">{currentPage} of {totalPages}</div>
          <Button className="Wallet_pg_btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} btnText="Next" disabled={currentPage === totalPages} />
        </div>
      )}
    </>
  );
}