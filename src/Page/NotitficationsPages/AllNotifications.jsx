import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotifLayout from "../../Components/NotifLayout.jsx";
import { getNotifications } from "../../Redux/features/authslice.js"; 

const ITEMS_PER_PAGE = 5;

export default function AllNotifications() {
  const dispatch = useDispatch();
  const { notifications = [], loading } = useSelector((state) => state.auth); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);
  const paginated = notifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading && notifications?.length === 0) {
    return <div className="notif-page"><p>Loading...</p></div>;
  }

  return (
    <NotifLayout
      notifications={paginated}
      currentPage={currentPage}
      totalPages={totalPages || 1}
      onPageChange={setCurrentPage}
    />
  );
}