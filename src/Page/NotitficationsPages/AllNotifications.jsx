// AllNotifications.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotifLayout from "../../Components/NotifLayout.jsx";
import { addNotification, getNotifications } from "../../Redux/features/authslice.js";
import { socket } from "../../Socket.js";

const ITEMS_PER_PAGE = 5;

export default function AllNotifications() {
  const dispatch = useDispatch();
  const { notifications = [], user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getNotifications());

    socket.connect();
    socket.emit("join", user?._id || user?.id);

    socket.on("notification", (newNotif) => {
      dispatch(addNotification(newNotif));
    });

    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, [dispatch]);

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