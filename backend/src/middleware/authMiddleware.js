const jwt = require("jsonwebtoken");
const User = require("../users/users.model"); // Ensure correct path

const verifyToken = async (req, res, next) => {
  try {
    // Check if token is in cookies or headers
    const token = req.cookies.authToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user info in request object

    // Find user in DB
    const user = await User.findByPk(decoded.userId, { attributes: { exclude: ["password"] } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to request
    next(); // Proceed to next middleware/route
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
