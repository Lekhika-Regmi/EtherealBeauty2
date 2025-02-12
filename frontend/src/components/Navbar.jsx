// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import CartModel from "../pages/products/CartModel";

// const Navbar = () => {
  
//   const products = useSelector((state) => state.cart.products);
//   const user = useSelector((state) => state.auth.user); // Fetch user from Redux

//   // Temporary mock user state for testing purposes
// // const mockUser = {
// //   id: 1,
// //   name: "John Doe",
// //   email: "john@example.com",
// // };


// // Replace the actual Redux state with the mock data to test
// //const user = 0;  // For logged-in state
// // const user = null;  // For logged-out state (comment out the above line and uncomment this one)
// // const user = mockUser;
//  // const user = useSelector((state) => state.user);  // Assuming user state contains user info
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // State to toggle dropdown

//   // Function to open the cart
//   const handleOpenCart = () => setIsCartOpen(true);
  
//   // Function to close the cart
//   const handleCloseCart = () => setIsCartOpen(false);

//   // Toggle dropdown visibility
//   const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
//   const dispatch = useDispatch();
// const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   dispatch(logout()); // Create a logout action in Redux
//   navigate("/login");
// };


//   return (
//     <header className="fixed-nav-bar w-nav">
//       <nav className="max-w-screen-2xl mx-auto my-0 px-4 flex justify-between items-center">
//         <ul className="nav__links">
//           <li className="link">
//             <Link to="/">Home</Link>
//           </li>
//           <li className="link">
//             <Link to="/products">Products</Link>
//           </li>
//           <li className="link">
//             <Link to="/contact">Contact</Link>
//           </li>
//         </ul>

//         {/* Logo */}
//         <div className="nav__logo">
//           <Link to="/">Ethereal Beauty <span>.</span></Link>
//         </div>

//         {/* Nav Icons */}
//         <div className="nav__icons relative">
//           <span>
//             <Link to="/search">
//               <i className="ri-search-2-line"></i>
//             </Link>
//           </span>
//           <span>
//             <button onClick={handleOpenCart} className="hover:text-primary">
//               <i className="ri-shopping-bag-4-fill"></i>
//               <sup className="text-sm inline-block px-1.5 text-black rounded-full bg-primary text-center">
//                 {products.length}
//               </sup>
//             </button>
//           </span>
//           <span className="relative">
//   <button onClick={handleToggleDropdown} className="focus:outline-none">
//     <i className="ri-user-3-line"></i>
//   </button>
//   {isDropdownOpen && (
//     <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
//       {!user ? (
//         <Link 
//           to="/login" 
//           className="block px-4 py-2 text-black hover:bg-gray-100"
//           onClick={() => setIsDropdownOpen(false)} // Close dropdown when clicking
//         >
//           Login
//         </Link>
//       ) : (
//         <>
//           <Link 
//             to="/profile" 
//             className="block px-4 py-2 text-black hover:bg-gray-100"
//             onClick={() => setIsDropdownOpen(false)} // Close dropdown
//           >
//             View Profile
//           </Link>
//           <Link 
//             to="/orders" 
//             className="block px-4 py-2 text-black hover:bg-gray-100"
//             onClick={() => setIsDropdownOpen(false)} // Close dropdown
//           >
//             Orders
//           </Link>
//           <button 
//             className="block w-full px-4 py-2 text-black text-left hover:bg-gray-100"
//             onClick={() => handleLogout} // Close dropdown on logout
//           >
//             Logout
//           </button>
//         </>
//       )}
//     </div>
//   )}
// </span>

//         </div>
//       </nav>

//       {/* Cart Modal */}
//       <CartModel
//         products={products}
//         isOpen={isCartOpen}
//         onClose={handleCloseCart}  // <-- This function closes the cart
//       />
//     </header>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartModel from "../pages/products/CartModel";
import { logout } from "../auth/authSlice"; // Ensure you have a logout action

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.auth.user);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout()); // Call the Redux logout action
    navigate("/login");
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto my-0 px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link"><Link to="/">Home</Link></li>
          <li className="link"><Link to="/products">Products</Link></li>
          <li className="link"><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="nav__logo">
          <Link to="/">Ethereal Beauty <span>.</span></Link>
        </div>

        <div className="nav__icons relative">
          <span><Link to="/search"><i className="ri-search-2-line"></i></Link></span>
          <span>
            <button onClick={() => setIsCartOpen(true)} className="hover:text-primary">
              <i className="ri-shopping-bag-4-fill"></i>
              <sup className="text-sm inline-block px-1.5 text-black rounded-full bg-primary text-center">
                {products.length}
              </sup>
            </button>
          </span>

          <span className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
              <i className="ri-user-3-line"></i>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                {!user ? (
                  <Link to="/login" className="block px-4 py-2 text-black hover:bg-gray-100">
                    Login
                  </Link>
                ) : (
                  <>
                    <Link to="/profile" className="block px-4 py-2 text-black hover:bg-gray-100">
                      View Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-black hover:bg-gray-100">
                      Orders
                    </Link>
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
        </div>
      </nav>

      <CartModel products={products} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Navbar;
