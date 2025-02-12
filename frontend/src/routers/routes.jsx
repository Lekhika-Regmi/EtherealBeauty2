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
};

export default routes;
