import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from "../../utils/baseURL";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(null);  // State for total products
  const [totalOrders, setTotalOrders] = useState(null);  // State for total orders
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch total products and total orders when the component is mounted
    const fetchDashboardData = async () => {
      try {
        const productResponse = await axios.get(`${getBaseUrl()}/api/products/total-vendor-products`);
        setTotalProducts(productResponse.data.totalProducts);

        // const orderResponse = await axios.get(`${getBaseUrl()}/api/orders/total-orders`);  // Assuming your backend has an API for total orders
        // setTotalOrders(orderResponse.data.totalOrders);
        
      } catch (err) {
        setError("Error fetching dashboard data");
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);  // Empty dependency array, so it runs only once when component is mounted

  return (
    <div className="dashboard-container p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      {/* Display error message if there is an error */}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-6 mt-4 justify-center">
        {/* Display total products in a larger box */}
        <div className="bg-pink-200 p-6 rounded-md shadow-lg max-w-[350px]">
          <h3 className="text-lg font-semibold">Total Products:</h3>
          <div className="text-3xl font-bold text-center mt-2">
            {totalProducts !== null ? totalProducts : "Loading..."} {/* Display loading message */}
          </div>
        </div>

        {/* Display total orders in a larger box */}
        <div className="bg-pink-200 p-6 rounded-md shadow-lg max-w-[350px]">
          <h3 className="text-lg font-semibold">Total Orders:</h3>
          <div className="text-3xl font-bold text-center mt-2">
            {totalOrders !== null ? totalOrders : "Loading..."} {/* Display loading message */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
