import { useState } from "react";
import NotifLayout from "../../Components/NotifLayout.jsx";
import { allNotifications } from "../../Components/DummyData";

const ITEMS_PER_PAGE = 5;

export default function PaymentNotifications() {
  const [currentPage, setCurrentPage] = useState(1);

  const payment = allNotifications.filter((n) => n.type === "payment");
  const totalPages = Math.ceil(payment.length / ITEMS_PER_PAGE);

  const paginated = payment.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <NotifLayout
      notifications={paginated}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}