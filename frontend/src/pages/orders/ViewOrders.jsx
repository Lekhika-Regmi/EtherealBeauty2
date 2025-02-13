import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCurrentIds } from "../../features/authHelpers";
import { useGetCustomerOrdersQuery } from "../../features/orders/orderApi";
import { useFetchAllProductsQuery } from "../../features/products/productsApi";

const ViewOrders = () => {
  const [sortOrder, setSortOrder] = useState("desc");
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <p className="text-center text-gray-500">
        Please log in to proceed with checkout.
      </p>
    );
  }

  const { customerId, role } = useCurrentIds();

  if (role !== "customer") {
    return (
      <p className="text-center text-gray-500">
        Please log in as a customer to view your orders.
      </p>
    );
  }

  const {
    data: orders,
    error,
    isLoading,
  } = useGetCustomerOrdersQuery(customerId);
  const { data: products } = useFetchAllProductsQuery();

  if (isLoading)
    return <p className="text-center text-gray-500">Loading orders...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error fetching orders: {error.message}
      </p>
    );
  if (!orders?.length)
    return <p className="text-center text-gray-500">No orders found.</p>;

  const getProductName = (productId) => {
    if (!products || !Array.isArray(products)) return "Loading...";
    return products.find((p) => p.product_id === productId)?.name || "Unknown Product";
  };

  // Sort orders by order_id
  const sortedOrders = [...orders].sort((a, b) => {
    return sortOrder === "desc" 
      ? b.order_id - a.order_id 
      : a.order_id - b.order_id;
  });
  

  // Debug logging - remove in production
  console.log("Original orders:", orders);
  console.log("Sorted orders:", sortedOrders);
  console.log("Current sort order:", sortOrder);

  return (
    <div className="section__container">
      <h2 className="uppercase myh2 mb-2 mt-0">Your Orders</h2>
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Sort by: {sortOrder === "asc" ? "Oldest Order First" : "Latest Order First"}
        </button>
        <span className="text-sm text-gray-500">
          {sortedOrders.length} orders found
        </span>
      </div>
      <div className="section__container header__container">
      {sortedOrders.map((order) => (
  <div key={order.order_id} className="border border-pink-300 p-6 rounded-2xl mb-8 shadow-md bg-white hover:shadow-xl transition-shadow">
    <h4 className="mt-4 font-semibold text-pink-700 text-lg">
      Ordered Items:
    </h4>
    <ul className="mt-3 space-y-2">
      {[...order.orderItems] // Clone before sorting
        .sort((a, b) => {
          const nameA = getProductName(a.product_id).toLowerCase();
          const nameB = getProductName(b.product_id).toLowerCase();
          return nameA.localeCompare(nameB);
        })
        .map((item) => (
          <li key={item.order_item_id} className="ml-4 pl-2 border-l-4 border-pink-300 text-gray-700">
            <span className="text-lg font-medium text-pink-400">{item.quantity}x</span>{" "}
            {getProductName(item.product_id)} -{" "}
            <span className="font-semibold text-gray-900">NPR {item.subtotal}</span>
          </li>
        ))}
    </ul>
  </div>
))}
      </div>
    </div>
  );
};

export default ViewOrders;