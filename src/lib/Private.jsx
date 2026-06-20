import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ allowedRoles }) => {
  const { userInfo, vendorInfo, token } = useSelector((s) => s.auth);
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  const currentRole = userInfo ? "user" : vendorInfo ? "vendor" : null;
  if (allowedRoles && allowedRoles.length > 0) {
    if (!currentRole || !allowedRoles.includes(currentRole)) {
      if (currentRole === "vendor") return <Navigate to="/vendordashboard" replace />;
      if (currentRole === "user")   return <Navigate to="/userdashboard" replace />;
      return <Navigate to="/login" replace />;
    }
  }
  return <Outlet />;
};
export default PrivateRoute;