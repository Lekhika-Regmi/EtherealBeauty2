import React, { useEffect, useState } from 'react';
import axios from 'axios';
import blicense from '../../assets/b_license.png';
import { getBaseUrl } from "../../utils/baseURL";

const PendingVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/vendors/unapproved`);
        setVendors(response.data);
      } catch (err) {
        setError("Error fetching vendors");
        console.error("Error fetching vendors:", err);
      }
    };

    fetchVendors();
  }, []);

  const approveVendor = async (vendorId) => {
    try {
      const response = await axios.put(`${getBaseUrl()}/api/vendors/approve/${vendorId}`, {
        isApproved: true, // Ensure this matches your backend's expected payload
      });
  
      if (response.status === 200) {
        // Update local state to remove the approved vendor from the pending list
        setVendors((prevVendors) => prevVendors.filter(vendor => vendor.id !== vendorId));
      } else {
        console.error("Failed to approve vendor:", response.data);
      }
    } catch (error) {
      console.error("Error approving vendor:", error);
      setError("Error approving vendor");
    }
  };
  

  return (
    <div className="vendors-container p-6">
      <h2 className="text-2xl font-bold">Pending Vendors</h2>
      
      {error && <p className="text-red-500">{error}</p>}

      <div className="vendors-list mt-4">
        {vendors.length > 0 ? (
          vendors.map((vendor) => (
            <div key={vendor.id} className="vendor-card bg-pink-200 p-4 rounded-md shadow-lg mb-4">
              <h3 className="text-lg font-semibold">{vendor.vendorName}</h3>
              <p><strong>Owner Name:</strong> {vendor.ownerName}</p>
              <p><strong>Email Address:</strong> {vendor.emailAddress}</p>
              <p><strong>Phone Number:</strong> {vendor.phoneNo}</p>
              <p><strong>Business Name:</strong> {vendor.businessName}</p>
              <p><strong>Business Registration Number:</strong> {vendor.businessRN}</p>
              <p><strong>Business Address:</strong> {vendor.businessAddress}</p>
              <p><strong>Business License:</strong></p>
              <img
                src={`${getBaseUrl()}/uploads/${vendor.businessLicense}`}
                alt={`Business License of ${vendor.businessName}`}
                className="mt-2 max-w-sm h-auto rounded-md"
                      onError={(e) => {
                                 e.target.src = blicense;
                               }}
              />
              <p><strong>Terms Accepted:</strong> {vendor.termsAccepted ? "Yes" : "No"}</p>
              <p><strong>Created At:</strong> {new Date(vendor.createdAt).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(vendor.updatedAt).toLocaleDateString()}</p>
              <button
  onClick={() => approveVendor(vendor.id)}
  className={`mt-2 px-4 py-2 rounded-md ${vendor.isApproved ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
  disabled={vendor.isApproved}
>
  {vendor.isApproved ? "Approved" : "Approve"}
</button>

            </div>
          ))
        ) : (
          <p>No vendors found.</p>
        )}
      </div>
    </div>
  );
};

export default PendingVendors;