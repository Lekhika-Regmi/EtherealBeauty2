import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import { getBaseUrl } from "../../utils/baseURL";
import { useCurrentIds } from "../../features/authHelpers";


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const { vendorId, role } = useCurrentIds();

  // Role check संशोधन गर्नुहोस्
  if (role !== 'vendor') {
    return <p className="text-center text-gray-500">no vendors </p>;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = `${getBaseUrl()}/api/products/display_vendor_products`;
      
      try {
        const response = await axios.get(apiUrl, {
          params: {
            vendorId: vendorId 
          }
        });
        setProducts(response.data);
      } catch (err) {
        setError("unable to fetch the data ");
        console.error("त्रुटि:", err);
      }
    };

    if (vendorId) { 
      fetchProducts();
    }
  }, [vendorId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {error && <p className="text-red-500">{error}</p>}

      {products.map((product) => (
        <div
          key={product.product_id}
          className="bg-white p-4 shadow-lg rounded-lg relative flex flex-col min-h-[400px] border"
        >
          {/* Product Image */}
          {product.image && (
            <div className="w-full h-48 mb-3 overflow-hidden flex justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full h-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-image.jpg"; // Default fallback image
                }}
              />
            </div>
          )}

          {/* Product Details */}
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-green-600 font-semibold mt-2">${product.price}</p>
          <div className="text-sm text-gray-500 mt-2">
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>Stock :{product.stock}</p>
          </div>

          {/* Edit Button Positioned at Bottom Right */}
          <div className="absolute bottom-4 right-4 ">
            <Link
              to={`/vendor/edit-product/${product.product_id}`}
              className="btn"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;