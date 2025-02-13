// import React, { Suspense } from "react";
// import { Navigate } from "react-router-dom";
// import { routes } from "../../../frontend/src/routers/routes";
// import SuperAdminLayout from "../../components/superadmin/SuperAdminLayout";

// // Lazy loading superadmin components
// const Dashboard = React.lazy(() => import("../../pages/superadmin/Dashboard"));
// const Products = React.lazy(() => import("../../pages/superadmin/Products"));
// const Vendors = React.lazy(() => import("../../pages/superadmin/Vendors"));
// const Customers = React.lazy(() => import("../../pages/superadmin/Customers"));
// const Inventory = React.lazy(() => import("../../pages/superadmin/Inventory"));
// const Orders = React.lazy(() => import("../../pages/superadmin/Orders"));
// const PendingVendors = React.lazy(() => import("../../pages/superadmin/PendingVendors"));
// const ApprovedVendors = React.lazy(() => import("../../pages/superadmin/ApprovedVendors"));

// // Superadmin authentication check function
// const isSuperAdmin = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user && user.role === "superadmin";
// };

// // Protected Route Component
// const ProtectedSuperAdminRoute = ({ children }) => {
//   return isSuperAdmin() ? children : <Navigate to={routes.login} />;
// };

// // Define superadmin routes
// const superadminRoutes = {
//   path: "/superadmin",
//   element: (
//     <ProtectedSuperAdminRoute>
//       <SuperAdminLayout />
//     </ProtectedSuperAdminRoute>
//   ),
//   children: [
//     { path: "dashboard", element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense> },
//     { path: "products", element: <Suspense fallback={<div>Loading...</div>}><Products /></Suspense> },
//     { path: "vendors", element: <Suspense fallback={<div>Loading...</div>}><Vendors /></Suspense> },
//     { path: "customers", element: <Suspense fallback={<div>Loading...</div>}><Customers /></Suspense> },
//     { path: "inventory", element: <Suspense fallback={<div>Loading...</div>}><Inventory /></Suspense> },
//     { path: "orders", element: <Suspense fallback={<div>Loading...</div>}><Orders /></Suspense> },
//     { path: "vendors/pending", element: <Suspense fallback={<div>Loading...</div>}><PendingVendors /></Suspense> },
//     { path: "vendors/approved", element: <Suspense fallback={<div>Loading...</div>}><ApprovedVendors /></Suspense> },
//   ],
// };

// export default superadminRoutes;
