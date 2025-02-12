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

  // Vendor Routes
  
  vendor: "/vendor",
  vendorDashboard: "/vendor/Dashboard",
  vendorCreateProduct: "/vendor/dashboard-create-product",
  vendorProducts: "/vendor/dashboard-products",
  vendorEditProduct: "/vendor/edit-product/:id",
  vendorInventory: "/vendor/inventory",
  vendorOrders: "/vendor/dashboard-orders",


  //superadmin routes 
  superadmin: {
    dashboard: "/superadmin/dashboard",
    products: "/superadmin/products",
    vendors: "/superadmin/vendors",
    customers: "/superadmin/customers",
    inventory: "/superadmin/inventory",
    reports: "/superadmin/reports",
    orders: "/superadmin/orders",
    settings: "/superadmin/settings",
    pendingVendors: "/superadmin/vendors/pending",
    approvedVendors: "/superadmin/vendors/approved"
  }

};

export default routes;
