import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from "../../utils/baseURL";
import blicense from '../../assets/b_license.png';

const ApprovedVendors = () => {
  const [approvedVendors, setApprovedVendors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedVendors = async () => {
      try {
        console.log('Fetching approved vendors...');
        const response = await axios.get(`${getBaseUrl()}/api/vendor/display_all_vendors`);
        console.log('Response data:', response.data);  // Log the full response data

        // Filter vendors with isApproved = 1 if not filtered by backend
        const filteredVendors = response.data.filter(vendor => vendor.isApproved === true);
        console.log('Filtered approved vendors:', filteredVendors); // Log the filtered vendors

        setApprovedVendors(filteredVendors);
      } catch (err) {
        setError("Error fetching approved vendors");
        console.error("Error fetching approved vendors:", err);
      }
    };

    fetchApprovedVendors();
  }, []);

  return (
    <div className="vendors-container p-6">
      <h2 className="text-2xl font-bold">Approved Vendors</h2>
      
      {error && <p className="text-red-500">{error}</p>}

      <div className="vendors-list mt-4">
        {approvedVendors.length > 0 ? (
          approvedVendors.map((vendor) => (
            <div key={vendor.id} className="vendor-card bg-green-200 p-4 rounded-md shadow-lg mb-4">
              <h3 className="text-lg font-semibold">{vendor.vendorName}</h3>
              <p><strong>Owner Name:</strong> {vendor.ownerName}</p>
              <p><strong>Phone Number:</strong> {vendor.phoneNo}</p>
              <p><strong>Business Name:</strong> {vendor.vendorName}</p> {/* Corrected here */}
              <p><strong>Business Registration Number:</strong> {vendor.businessRN}</p>
              <p><strong>Business Address:</strong> {vendor.businessAddress}</p>

              {/* Business License Image */}
              <p><strong>Business License:</strong></p>
              <img
                src={`${getBaseUrl()}/uploads/${vendor.businessLicense.replace(/\\/g, '/')}`}
                alt={`Business License of ${vendor.vendorName}`}
                className="mt-2 max-w-sm h-auto rounded-md"
                onError={(e) => {
                  e.target.src = blicense;
                }}
                
              />

              <p><strong>Terms Accepted:</strong> {vendor.termsAccepted ? "Yes" : "No"}</p>
              <p><strong>Created At:</strong> {new Date(vendor.createdAt).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(vendor.updatedAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No approved vendors found.</p>
        )}
      </div>
    </div>
  );
};

export default ApprovedVendors;
