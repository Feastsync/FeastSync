import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPrivateRoute = () => {
  const { isAdminLoggedIn, adminToken } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!adminToken && !isAdminLoggedIn) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AdminPrivateRoute;
