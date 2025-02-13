const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./users.model");
const verifyToken = require("../middleware/authMiddleware"); // Import middleware
const Customer = require("./customer/customers.model");
const Vendor = require("./vendor/vendors.model");

const router = express.Router();

// ✅ **Login Route**
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Store token in cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    //=========to get associated vendor id and customer id===================================
    // Get associated customer/vendor ID
    let associatedId = null;
    if (user.role === "customer") {
      const customer = await Customer.findOne({ where: { user_id: user.id } });
      console.log("Customer record:", customer); // Debug log
      associatedId = customer?.id;
    }
    else if (user.role === "vendor") {
      const vendor = await Vendor.findOne({ where: { user_id: user.id } });
      associatedId = vendor?.id;
    }
    console.log("associatedId", associatedId);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, role: user.role,  associatedId },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ **Authenticated User Route**
router.get("/me", verifyToken, async (req, res) => {
  try {
    res.status(200).json(req.user); // Return authenticated user
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ **Logout Route**
router.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
