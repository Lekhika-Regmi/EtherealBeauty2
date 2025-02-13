import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import { inventoryService } from '../../services/inventoryService';
import { inventoryService } from '../../services/inventoryServices';
import { useCurrentIds } from "../../features/authHelpers";


const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const { vendorId, role } = useCurrentIds();
  if (role !== 'vendor') {
    return <p className="text-center text-gray-500">no vendors </p>;
  }


  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await inventoryService.getVendorInventory(vendorId);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      toast.error('Failed to fetch inventory');
      setLoading(false);
    }
  };

  const handleStockUpdate = async (productId, newStock) => {
    if (newStock < 0) {
      toast.error('Stock cannot be negative');
      return;
    }

    setUpdatingProduct(productId);
    try {
      await inventoryService.updateStock(productId, newStock);
      setProducts(products.map(product =>
        product.product_id === productId
          ? { ...product, stock: parseInt(newStock) }
          : product
      ));
      toast.success('Stock updated successfully');
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Failed to update stock');
    } finally {
      setUpdatingProduct(null);
    }
  };

  const getStockStatus = (stock) => {
    if (stock <= 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock <= 5) return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }




  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Inventory Management</h2>

      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <tr key={product.product_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      value={product.stock}
                      onChange={(e) => handleStockUpdate(product.product_id, e.target.value)}
                      className="w-20 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {updatingProduct === product.product_id ? (
                      <span className="text-sm text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 inline-block mr-2"></div>
                        Updating...
                      </span>
                    ) : (
                      <button
                        onClick={() => handleStockUpdate(product.product_id, product.stock)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        Save
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;