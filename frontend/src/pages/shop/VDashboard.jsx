import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../utils/baseURL";
import { useCurrentIds } from "../../features/authHelpers";

const VDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [error, setError] = useState(null);

  const { vendorId, role } = useCurrentIds();

  if (role !== "vendor") {
    return <p className="text-center text-gray-500">No vendors</p>;
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!vendorId) {
        console.warn("🚨 No vendor ID found, skipping fetch");
        return;
      }

      try {
        console.log("🔹 Fetching total products for vendor:", vendorId);

        const productResponse = await axios.get(
          `${getBaseUrl()}/api/products/total-vendor-products?vendorId=${vendorId}`
        );

        console.log("✅ API Response:", productResponse.data);
        setTotalProducts(productResponse.data.totalProducts);

        const orderResponse = await axios.get(
          `${getBaseUrl()}/api/orders/vendor/${vendorId}/total-orders`
        );
        setTotalOrders(orderResponse.data.totalOrders);
      } catch (err) {
        console.error("❌ Error fetching dashboard data:", err);
        setError("Error fetching dashboard data");
      }
    };

    fetchDashboardData();
  }, [vendorId]);

  useEffect(() => {
    console.log("🎯 Updated totalProducts state:", totalProducts);
  }, [totalProducts]);

  return (
    <div className="dashboard-container p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-6 mt-4 justify-center">
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
      </div>
    </div>
  );
};

export default VDashboard;
