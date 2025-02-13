const OrderItem = require('../orders/orderItems.model');
const Order = require('../orders/orders.model');
const Product = require('../products/products.model');
const Vendor = require('../users/vendor/vendors.model');

// Order associations
Order.hasMany(OrderItem, { foreignKey: 'order_item_id', as: 'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// Product associations
Product.hasMany(OrderItem, { foreignKey: "product_id", as: "orderItems" });
OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// Vendor associations
Vendor.hasMany(OrderItem, { foreignKey: "vendor_id", as: "orderItems" });
OrderItem.belongsTo(Vendor, { foreignKey: "vendor_id", as: "vendor" });

module.exports = { OrderItem, Order, Product, Vendor };
