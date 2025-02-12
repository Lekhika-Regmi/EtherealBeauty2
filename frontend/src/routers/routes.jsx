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
  vendorOrders: "/vendor/dashboard-orders",
  vendorDashboard: "/vendor/dashboard",
  vendorCreateProduct: "/vendor/dashboard-create-product",
  vendorProducts: "/vendor/dashboard-products",
  vendorEditProduct: "/vendor/edit-product/:id",
};

export default routes;
