import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
// import { loadStripe } from "@stripe/stripe-js"; // Commenting out Stripe
// import { getBaseUrl } from "../../utils/baseURL";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router-dom for navigation

const OrderSummary = ({ onClose }) => {  // Accept onClose as a prop
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirection

  // Fallback to guest user if no auth
  const { user } = useSelector(state => state.auth) || {};
  const currentUser = user || { id: "guest-12345", name: "Guest User", email: "guest@example.com" };
  const authState = useSelector(state => state.auth);
  console.log("OrderSummary Auth State:", authState);
  
  // Ensuring default values to prevent undefined issues
  const { 
    tax = 0, 
    taxRate = 0, 
    totalPrice = 0, 
    grandTotal = 0, 
    selectedItems = 0 
  } = useSelector((store) => store.cart) || {};
  
  const products = useSelector((store) => store.cart.products);

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  const proceedToCheckout = async(e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to proceed to checkout.");
      navigate("/login");
      return;
    }
    navigate("/checkout"); // Navigate to checkout page
    onClose(); // Close the cart when proceeding to checkout
  
  }

  return (
    <div className="bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl text-text-dark">Order Summary</h2>
        <p className="text-text-dark mt-2">Selected Items: {selectedItems}</p>
        <p>Total Price: ${totalPrice?.toFixed(2) || "0.00"}</p>
        <p>Tax ({taxRate * 100}%): ${tax?.toFixed(2) || "0.00"}</p>
        <h3 className="font-bold">Grand Total: ${grandTotal?.toFixed(2) || "0.00"}</h3>
        <div className="px-4 mb-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4">
            <span className="mr-2">Clear Cart</span>
            <i className="ri-delete-bin-7-line"></i>
          </button>
          <button
            onClick={proceedToCheckout}
            className="bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center">
            <span className="mr-2">Proceed to Checkout</span>
            <i className="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
