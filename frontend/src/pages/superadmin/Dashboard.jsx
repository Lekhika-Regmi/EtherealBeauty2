import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from "../../utils/baseURL";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [totalVendors, setTotalVendors] = useState(null);
  const [totalCustomers, setTotalCustomers] = useState(null); // Added state for total customers
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const productResponse = await axios.get(`${getBaseUrl()}/api/products/total-products`);
        setTotalProducts(productResponse.data.totalProducts);

        const orderResponse = await axios.get(`${getBaseUrl()}/api/orders/total-orders`);
        setTotalOrders(orderResponse.data.totalOrders);

        const vendorResponse = await axios.get(`${getBaseUrl()}/api/products/total-vendors`);
        setTotalVendors(vendorResponse.data.totalVendors);

        const customerResponse = await axios.get(`${getBaseUrl()}/api/customers/total-customers`);
        setTotalCustomers(customerResponse.data.totalCustomers);

      } catch (err) {
        setError("Error fetching dashboard data");
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-6 mt-4 justify-center flex-wrap">
        <div className="bg-pink-200 p-6 rounded-md shadow-lg max-w-[350px]">
          <h3 className="text-lg font-semibold">Total Products:</h3>
          <div className="text-3xl font-bold text-center mt-2">
            {totalProducts !== null ? totalProducts : "Loading..."}
          </div>
        </div>

        <div className="bg-pink-200 p-6 rounded-md shadow-lg max-w-[350px]">
          <h3 className="text-lg font-semibold">Total Orders:</h3>
          <div className="text-3xl font-bold text-center mt-2">
            {totalOrders !== null ? totalOrders : "Loading..."}
          </div>
        </div>

        <div className="bg-pink-200 p-6 rounded-md shadow-lg max-w-[350px]">
          <h3 className="text-lg font-semibold">Total Vendors:</h3>
          <div className="text-3xl font-bold text-center mt-2">
            {totalVendors !== null ? totalVendors : "Loading..."}
          </div>
        </div>

        <div className="bg-pink-200 p-6 rounded-md shadow-lg max-w-[350px]">
          <h3 className="text-lg font-semibold">Total Customers:</h3>
          <div className="text-3xl font-bold text-center mt-2">
            {totalCustomers !== null ? totalCustomers : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
