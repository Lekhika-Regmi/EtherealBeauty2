const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  about: "/about",
  contact: "/contact",
  search: "/search",
  brands: "/brands/:brandName",
  webcam: "/webcam",
  checkout: "/checkout",
  payment: "/payment-status",
  product: "/products",
  singleProduct: "/product/:id",
  orders: "/orders",
  aqi: "/aqi",

  // Vendor Routes
  
  vendor: "/vendor",
  vendorDashboard: "/vendor/Dashboard",
  vendorDashboardContent: "/vendor/dashboard-content",
  vendorCreateProduct: "/vendor/dashboard-create-product",
  vendorProducts: "/vendor/dashboard-products",
  vendorEditProduct: "/vendor/edit-product/:id",
  vendorInventory: "/vendor/inventory",
  vendorOrders: "/vendor/dashboard-orders",

  //superadmin routes 

  // superadmin: {
  //  superadmin : "/superadmin",
  //   dashboard: "/superadmin/dashboard",
  //   products: "/superadmin/products",
  //   vendors: "/superadmin/vendors",
  //   customers: "/superadmin/customers",
  //   inventory: "/superadmin/inventory",
   
  //   orders: "/superadmin/orders",
  
  //   pendingVendors: "/superadmin/vendors/pending",
  //   approvedVendors: "/superadmin/vendors/approved"
  // }
  superadmin: {
    root: "/superadmin",
    dashboard: "/superadmin/dashboard",
    products: "/superadmin/products",
    customers: "/superadmin/customers",
    vendors: {
      pending: "/superadmin/vendors/pending",
      approved: "/superadmin/vendors/approved"
    },
    orders: "/superadmin/orders"
  }
};

export default routes;
