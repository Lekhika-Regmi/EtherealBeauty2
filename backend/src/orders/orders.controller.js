const Order = require('./orders.model');
const OrderItem = require('./orderItems.model');
const Product = require('../products/products.model');

const getVendorOrders = async (req, res) => {
  try {
    console.log('Fetching orders for vendor:', req.params.vendorId);
    
    // const orderItems = await OrderItem.findAll({
    //   where: { 
    //     vendor_id: req.params.vendorId 
    //   },
    //   include: [
    //     {
    //       model: Order,
    //       as: 'order',
    //       attributes: ['order_id', 'created_at', 'status', 'total_price']
    //     },
    //     {
    //       model: Product,
    //       as: 'product',
    //       attributes: ['name', 'price', 'image']
    //     }
    //   ],
    //   order: [[Order, 'created_at', 'DESC']]
    // });

    const orderItems = await OrderItem.findAll({
      where: { 
        vendor_id: req.params.vendorId 
      },include: [
        {
          model: Order,
          as: 'order',
          attributes: ['order_id','customer_id', 'address','created_at', 'total_price']
        }, {
          model: Product,
          as: 'product',
          attributes: ['name', 'price', 'image']
        }
      ],
      attributes: ['order_item_id', 'quantity', 'subtotal', 'status'], // Add status here

      order: [['order', 'created_at', 'DESC']]
    });


    console.log(`Found ${orderItems.length} orders`);
    res.json({ orders: orderItems });
  } catch (error) {
    console.error('Error fetching vendor orders:', error);
    res.status(500).json({ error: "Error fetching vendor orders."});
  }
};

module.exports = {
  getVendorOrders
};
