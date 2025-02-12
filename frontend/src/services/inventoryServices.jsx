import axios from 'axios';
import { getBaseUrl } from '../utils/baseURL';

export const inventoryService = {
  getVendorInventory: async (vendorId) => {
    try {
      const response = await axios.get(`${getBaseUrl()}/api/products/vendor/${vendorId}/inventory`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateStock: async (productId, newStock) => {
    try {
      const response = await axios.put(`${getBaseUrl()}/api/products/update-stock/${productId}`, {
        stock: newStock
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};