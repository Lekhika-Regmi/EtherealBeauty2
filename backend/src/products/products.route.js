const express = require("express");
const Product = require("./products.model");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Op } = require("sequelize");
const verifyToken = require("../middleware/authMiddleware");
const Vendor = require("../users/vendor/vendors.model"); // Adjust the path to your Vendor model



// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products/"); // Save uploaded files in the "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// ✅ Get all products
// router.get("/allProducts", async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: "Failed to fetch products" });
//   }
// });




router.get("/allProducts", async (req, res) => {
  try {
    const { category, brand, skinType, minPrice, maxPrice } = req.query;

    let whereClause = {};

    if (category) whereClause.category = category;
    if (brand) whereClause.brand = brand;
    if (skinType) whereClause.skin_type_suitability = skinType;

    // Ensure price filters are valid numbers
    const min = parseFloat(minPrice) || 0; // Default minPrice to 0
    const max = parseFloat(999999); 

    if (!isNaN(min) && !isNaN(max) && max !== Infinity) {
      whereClause.price = { [Op.between]: [min, max] };
    } else if (!isNaN(min)) {
      whereClause.price = { [Op.gte]: min };
    } else if (!isNaN(max) && max !== Infinity) {
      whereClause.price = { [Op.lte]: max };
    }

    const products = await Product.findAll({ where: whereClause });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});


router.get('/display_all_products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Vendor,
          as: 'vendor', // The alias should match the one set in your association
          attributes: ['vendorName'], // You can include any vendor fields here
        }
      ]
    });

    const productsWithImagesAndVendor = products.map(product => {
      // If the product has an image, append the full path
      if (product.image) {
        product.image = `http://localhost:5000${product.image}`;
      }

      // Add the vendorName to the product object
      if (product.vendor) {
        product.vendorName = product.vendor.vendorName;
      }

      return product;
    });

    res.status(200).json(productsWithImagesAndVendor);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});



// Fetch all products (with vendor_id = 1)
router.get('/display_vendor_products', async (req, res) => {
  try {
    const { vendorId } = req.query;
    
    const products = await Product.findAll({ 
      where: { vendor_id: vendorId } 
    });

    const productsWithImages = products.map(product => {
      // If the product has an image, append the full path
      if (product.image) {
        product.image = `http://localhost:5000${product.image}`;
      }
      return product;
    });

    res.status(200).json(productsWithImages);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});


router.get("/total-vendor-products", async (req, res) => {
  try {
    console.log("Received query:", req.query); // Debug log
    const vendorId = req.query.vendorId; // Correct way to get vendorId

    if (!vendorId) {
      console.log("Vendor ID missing");
      return res.status(400).json({ message: "Vendor ID is required" });
    }

    const totalProducts = await Product.count({
      where: { vendor_id: vendorId }
    });

    console.log(`Total products for vendor ${vendorId}:`, totalProducts); // Debug log

    res.status(200).json({ totalProducts });
  } catch (error) {
    console.error("Error fetching total products:", error);
    res.status(500).json({ message: "Failed to fetch total products" });
  }
});



router.get("/total-products", async (req, res) => {
  try {
    const totalProducts = await Product.count();
    res.status(200).json({ totalProducts });
  } catch (error) {
    console.error("Error fetching total products:", error);
    res.status(500).json({ message: "Failed to fetch total products" });
  }
});


router.get("/total-vendors", async (req, res) => {
  try {
    const totalVendors = await Vendor.count();
    res.status(200).json({ totalVendors });
  } catch (error) {
    console.error("Error fetching total vendors:", error);
    res.status(500).json({ message: "Failed to fetch total vendors" });
  }
});

// Create a product (updated to use vendor_id from session)
router.post("/create-vendor-product", upload.single("image"), async (req, res) => {
  try {
    // Retrieve vendor_id from session
    const vendorId = req.body.vendor_id;  // ✅ Ensure correct key


    const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : null; // Get the file path

    // Create a new product with vendor_id
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      skin_type_suitability: req.body.skin_type_suitability,
      brand: req.body.brand,
      stock: req.body.stock,
      image: imageUrl, // Store the image URL in the database
      vendor_id: vendorId, // Set vendor_id from session
    });
    res.status(201).json(newProduct); // Respond with the created product
  } catch (error) {
  }
});

// Create a product
router.post("/create-product", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
});






// Update a product

router.patch("/update-product/:id", upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update data from the form
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      skin_type_suitability: req.body.skin_type_suitability,
      brand: req.body.brand,
      stock: req.body.stock,
    };

    // Handle image update
    if (req.file) {
      // If new image uploaded
      updateData.image = `/uploads/products/${req.file.filename}`;
    } else if (req.body.existingImage) {
      // Keep existing image
      updateData.image = req.body.existingImage;
    }

    await product.update(updateData);

    res.status(200).json({
      message: "Product updated successfully",
      product: product
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: "Error updating product" });
  }
});


// ✅ Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});



// Get products by brand
router.get("/brand/:brand", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { brand: req.params.brand },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this brand" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    res.status(500).json({ message: "Failed to fetch products by brand" });
  }
});


// Delete a product
router.delete("/:id", async (req, res) => {
  // ✅ Get products by skin type suitability
  router.get("/skin-type/:skinType", async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { skin_type_suitability: req.params.skinType },
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "No products found for this skin type" });
      }

      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products by skin type suitability:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  })
});

// ✅ Get related products by category
router.get("/related/:category", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { category: req.params.category },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No related products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: "Failed to fetch related products" });
  }
});

router.get('/vendor/:vendorId/inventory', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { vendor_id: req.params.vendorId },
      attributes: ['product_id', 'name', 'price', 'stock', 'image']
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

router.put('/update-stock/:productId', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.update({ stock: req.body.stock });
    res.json({ message: 'Stock updated successfully', currentStock: product.stock });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ error: 'Failed to update stock' });
  }
});





module.exports = router;