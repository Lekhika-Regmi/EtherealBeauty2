import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../auth/authSlice"; // Ensure you have a logout action
import { useDispatch, useSelector } from "react-redux";
import  { useState } from "react";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout()); // Call the Redux logout action
    navigate("/login");
  };
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/"> Home </Link>
          </li>
  
          <li className="link">
            <Link to="/contact"> Contact </Link>
          </li>
        </ul>
        {/*  name of website */}
        <div className="nav__logo">
          <Link to="/"> Ethereal Beauty</Link>
        </div>
        <div className="nav__icons relative">
          
          <span>
            <span className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
              >
                <i className="ri-user-3-line"></i>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  {!user ? (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                    >
                      Login
                    </Link>
                  ) : (
                    <>
                      {/* <Link
                        to="/profile"
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        View Profile
                      </Link> */}
                      {/* <Link to="/orders" className="block px-4 py-2 text-black hover:bg-gray-100">
                                           Orders
                                         </Link> */}
                      <button
                        className="block w-full px-4 py-2 text-black text-left hover:bg-gray-100"
                        onClick={handleLogout} // ✅ Corrected
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </span>
          </span>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
