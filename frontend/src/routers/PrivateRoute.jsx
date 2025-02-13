import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import routes from "./routes";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    toast.error("Please login to access this page.");
    return <Navigate to="/login" replace />;
  }

// privateroute.jsx (correction)
if (allowedRoles && !allowedRoles.includes(user.role)) {
  toast.error("You do not have permission to access this page.");
  return user.role === 'superadmin' 
    ? <Navigate to={routes.superadmin.dashboard} replace /> // Fixed path
    : <Navigate to="/" replace />;
}

  return <Outlet />;
};
export default PrivateRoute;
