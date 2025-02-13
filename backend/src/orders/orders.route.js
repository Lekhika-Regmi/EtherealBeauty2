const express = require("express");
const router = express.Router();
const Order = require("./orders.model");
const OrderItem = require("./orderItems.model");
const sequelize = require('../database/db.config'); // Adjust path if necessary
const Product= require('../products/products.model');
const Customer = require('../users/customer/customers.model');
//const authenticate = require("../middleware/authenticate"); // Assuming JWT-based auth middleware
const authenticate = (req, res, next) => {
  console.log("Authentication middleware triggered");
  next();
};
const { body, validationResult } = require("express-validator");
const { getVendorOrders } = require("./orders.controller");
router.get('/vendor/:vendorId', getVendorOrders);
router.get('/vendor/:vendorId/total-orders', async (req, res) => {
  try {
    const totalOrders = await OrderItem.count({
      where: { 
        vendor_id: req.params.vendorId 
      },
      distinct: true,
      col: 'order_id'
    });

    console.log(`Found ${totalOrders} total orders for vendor ${req.params.vendorId}`);
    res.json({ totalOrders });
    
  } catch (error) {
    console.error('Error fetching total orders:', error);
    res.status(500).json({ error: 'Failed to fetch total orders' });
  }
});

// Create an Order
router.post(
  "/",
  authenticate,
  [
    body("customer_id").isInt().withMessage("Customer ID must be an integer"),
    body("total_price").isFloat({ min: 0.01 }).withMessage("Total price must be valid"),
    body("payment_method").isIn(["eSewa", "Khalti", "Cash On Delivery"]).withMessage("Invalid payment method"),
    body("address.province").notEmpty().withMessage("Province is required"),
    body("address.district").notEmpty().withMessage("District is required"),
    body("address.municipality").notEmpty().withMessage("Municipality is required"),
    body("address.additionalInfo").optional().isString(),
    body("products").isArray({ min: 1 }).withMessage("At least one product is required"),
    body("products.*.id").isInt().withMessage("Product ID must be an integer"),
    body("products.*.name").isString().withMessage("Product name must be a string"),
    body("products.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("products.*.price").isFloat({ min: 0.01 }).withMessage("Price must be valid"),
  
  ], async (req, res) => {
    console.log("Received order creation request for customer_id:", req.body.customer_id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const t = await sequelize.transaction();
  
    try {
      const { customer_id, total_price, payment_method, address, products } = req.body;
  
      // Create order
      const newOrder = await Order.create({
        customer_id,
        total_price,
        payment_method,
        address: JSON.stringify(address),
      }, { transaction: t });
  
      // Process each product and update stock
      for (const product of products) {
        // Check stock availability
        const dbProduct = await Product.findByPk(product.id, { transaction: t });
        
        if (!dbProduct || dbProduct.stock < product.quantity) {
          await t.rollback();
          return res.status(400).json({ 
            error: `Insufficient stock for product ${product.name}` 
          });
        }
  
        // Update stock
        await dbProduct.update(
          { stock: dbProduct.stock - product.quantity },
          { transaction: t }
        );
  
        // Create order item
        await OrderItem.create({
          order_id: newOrder.order_id,
          product_id: product.id,
          vendor_id: dbProduct.vendor_id,
          quantity: product.quantity,
          subtotal: product.quantity * product.price,
        }, { transaction: t });
      }
  
      await t.commit();
      console.log("Order created and stock updated successfully!");
      
      res.status(201).json({ 
        message: "Order placed successfully", 
        order: newOrder 
      });
  
    } catch (error) {
      await t.rollback();
      console.error("Error creating order:", error);
      res.status(500).json({ error: error.message });
    }
  });

// Get all orders
router.get("/allOrders", authenticate, async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

///✅ Get Orders by Customer ID
router.get("/customer/:customerId", async (req, res) => {
  const { customerId } = req.params;
  // console.log(`Fetching orders for customer: ${customerId}`);

  try {
    const orders = await Order.findAll({
      where: { customer_id: customerId },
      include: [
        {
          model: OrderItem,
          as: "orderItems", // ✅ Make sure the alias is correct
          attributes: {
            exclude: ['id'], // Ensure we're not selecting 'id' from OrderItems
          },
        },
      ],
    });

    // console.log("Fetched orders:", JSON.stringify(orders, null, 2));
    res.json(orders);
  } catch (error) {
    console.error("Error fetching customer orders:", error); // More detailed error message
    res.status(500).json({ error: error.message || "Failed to fetch orders" });
  }
});



router.get("/:id", authenticate, async (req, res) => {
  console.log("Fetching order with ID:", req.params.id);
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;