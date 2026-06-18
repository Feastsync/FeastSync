import { useState } from "react";
import { useSelector } from "react-redux";
import NotifLayout from "../../Components/NotifLayout.jsx";

const ITEMS_PER_PAGE = 5;

export default function AllNotifications() {
  const { notifications = [] } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);
  const paginated = notifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <NotifLayout
      notifications={paginated}
      currentPage={currentPage}
      totalPages={totalPages || 1}
      onPageChange={setCurrentPage}
    />
  );
}