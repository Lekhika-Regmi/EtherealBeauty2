// src/routers/CustomerPublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomerPublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user?.role === "vendor" ? <Navigate to="/vendor/dashboard" replace /> : <Outlet />;
};

export default CustomerPublicRoute;