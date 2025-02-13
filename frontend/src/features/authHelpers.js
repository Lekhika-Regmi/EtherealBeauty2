// src/utils/authHelpers.js
import { useSelector } from 'react-redux';
export const useCurrentIds = () => {
    const { user, customerId, vendorId } = useSelector((state) => state.auth);
    return {
      userId: user?.id,
      customerId,
   
      vendorId,
      role: user?.role
    };
  };