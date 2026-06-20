import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getNotifications } from "../../Redux/features/authslice.js";

export default function NotificationsWrapper() {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (notifications.length === 0 &&!loading) {
      dispatch(getNotifications());
    }
  }, [dispatch, notifications.length, loading]);

  if (loading && notifications.length === 0) {
    return <div className="notif-page"><p>Loading...</p></div>;
  }

  return <Outlet />;
}