import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../utils/baseURL";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const apiUrl = `${getBaseUrl()}/api/customers/display_all_customers`;
      try {
        const response = await axios.get(apiUrl);
        setCustomers(response.data);
      } catch (err) {
        setError("Error fetching customers");
        console.error("Error fetching customers from db:", err);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Customer ID</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id} className="text-center border">
                <td className="border p-2">{customer.customer_id}</td>
                <td className="border p-2">{customer.username}</td>
                <td className="border p-2">{customer.email}</td>
                <td className="border p-2">{customer.phone_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
