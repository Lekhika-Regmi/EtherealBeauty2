// src/routers/CustomerPublicRoute.jsx
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const CustomerPublicRoute = () => {
//   const { user } = useSelector((state) => state.auth);
//   return user?.role === "vendor" ? <Navigate to="/vendor/dashboard" replace /> : <Outlet />;

// };

// export default CustomerPublicRoute;

// src/routers/CustomerPublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "./routes";

const CustomerPublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  
  if (user?.role === "vendor") {
    return <Navigate to="/vendor/dashboard" replace />;
  }

  if (user?.role === "superadmin") {
    return <Navigate to={routes.superadmin.dashboard} replace />;
  }

  return <Outlet />;
};

export default CustomerPublicRoute;