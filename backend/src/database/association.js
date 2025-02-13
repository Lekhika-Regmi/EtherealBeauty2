const OrderItem = require('../orders/orderItems.model');
const Order = require('../orders/orders.model');
const Product = require('../products/products.model');
const Vendor = require('../users/vendor/vendors.model');
const Customer = require('../users/customer/customers.model');
// Order associations
// In the Order model:
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// Product associations
Product.hasMany(OrderItem, { foreignKey: "product_id", as: "orderItems" });
OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// Vendor associations
Vendor.hasMany(OrderItem, { foreignKey: "vendor_id", as: "orderItems" });
OrderItem.belongsTo(Vendor, { foreignKey: "id", as: "vendor" });

// Customer associations
Customer.hasMany(Order, { foreignKey: 'customer_id', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });


module.exports = { OrderItem, Order, Product, Vendor };
