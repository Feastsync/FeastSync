import { useState } from "react";
import NotifLayout from "../../Components/NotifLayout.jsx";
import { allNotifications } from "../../Components/DummyData";

const ITEMS_PER_PAGE = 5;

export default function AllNotifications() {
 
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allNotifications.length / ITEMS_PER_PAGE);

  const paginated = allNotifications.slice(
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