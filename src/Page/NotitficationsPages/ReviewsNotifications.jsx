import { useState } from "react";
import NotifLayout from "../../Components/NotifLayout.jsx";
import { allNotifications } from "../../Components/DummyData";

const ITEMS_PER_PAGE = 5;

export default function ReviewsNotifications() {
  const [currentPage, setCurrentPage] = useState(1);

  const reviews = allNotifications.filter((n) => n.type === "reviews");
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  const paginated = reviews.slice(
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