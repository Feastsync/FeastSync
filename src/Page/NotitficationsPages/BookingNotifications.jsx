import { useState } from "react";
import NotifLayout from "../../Components/NotifLayout.jsx";
import { allNotifications } from "../../Components/DummyData.jsx";

const ITEMS_PER_PAGE = 5;

export default function BookingNotifications() {
  const [currentPage, setCurrentPage] = useState(1);

  const booking = allNotifications.filter((n) => n.type === "booking");
  const totalPages = Math.ceil(booking.length / ITEMS_PER_PAGE);

  const paginated = booking.slice(
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