import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import CartModel from "../pages/products/CartModel";
import { logout } from "../auth/authSlice"; // Your logout action
import { clearCart } from "../features/cart/cartSlice"; // Ensure you have a clearCart action

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.auth.user);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef(null); // Ref for dropdown container

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    // If there are items in the cart, ask for confirmation before logging out.
    if (products.length > 0) {
      const confirmLogout = window.confirm(
        "Your cart has items. Logging out will clear your cart. Proceed?"
      );
      if (!confirmLogout) {
        // User canceled the logout.
        return;
      }
       // Display the logout message for 2 seconds
       setLogoutMessage("You are being logged out and your cart is cleared.");
       setTimeout(() => {
         setLogoutMessage(""); // Clear the message after 2 seconds
       }, 2000);
      // Clear the cart if the user confirmed.
      dispatch(clearCart());
    }
    // Log out the user.
    dispatch(logout());
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);


  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto my-0 px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/products">Products</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="nav__logo">
          <Link to="/">Ethereal Beauty <span>.</span></Link>
        </div>

        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-2-line"></i>
            </Link>
          </span>
       
            <span>
              <button onClick={() => setIsCartOpen(true)} className="hover:text-primary">
                <i className="ri-shopping-bag-4-fill"></i>
                <sup className="text-sm inline-block px-1.5 text-black rounded-full bg-primary text-center">
                  {products.length}
                </sup>
              </button>
            </span>
          

          <span className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="focus:outline-none"
            >
              <i className="ri-user-3-line"></i>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                {!user ? (
                  <Link
                    to="/login"
                    onClick={() => setIsDropdownOpen(false)} 
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Login
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/orders"
                      onClick={() => setIsDropdownOpen(false)} 
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      className="block w-full px-4 py-2 text-black text-left hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </span>
        </div>
      </nav>
{/* Display the logout message */}
{logoutMessage && (
        <div className="logout-message">
          {logoutMessage}
        </div>
      )}

      <CartModel
        products={products}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </header>
  );
};

export default Navbar;

