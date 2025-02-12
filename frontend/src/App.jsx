import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetMeQuery } from "./auth/authApi";
import { loginSuccess, logout } from "./auth/authSlice";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import VendorNavbar from "./components/VendorNavbar";
import Footer from "./components/Footer";
import AppRouter from "./routers/AppRouter";
import SuperAdminLayout from "./components/superadmin/SuperAdminLayout";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [getMe] = useLazyGetMeQuery();
  const token = localStorage.getItem("token");

  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (token) {
      getMe()
        .then(({ data }) => {
          if (data) {
            dispatch(loginSuccess({ user: data, token }));
          } else {
            dispatch(logout());
          }
        })
        .catch(() => dispatch(logout()));
    } else {
      dispatch(logout());
    }
  }, [dispatch, getMe]); // Remove `token` to prevent multiple calls

  // Ensure only logged-in vendors see the VendorNavbar
  const isVendorPage = location.pathname.includes("/vendor") && user?.role === "vendor";
  const isSuperAdminPage = location.pathname.startsWith("/superadmin");

  return (
    <>
      {isSuperAdminPage ? (
        <SuperAdminLayout>
          <AppRouter />
        </SuperAdminLayout>
      ) : (
        <>
          {isVendorPage ? <VendorNavbar /> : <Navbar />}
          <AppRouter />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
