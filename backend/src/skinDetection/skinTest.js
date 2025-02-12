const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Save file in memory

// POST endpoint for analyzing the image
router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    const form = new FormData();

    // API credentials for Face++
    const API_KEY = 'xBNjK9aX1ZN8Tb15g6PlVIG3Q-Zp9BsX';
    const API_SECRET = 'triz080BGPjlip0DpSVBCVxpmz3P6nlh';
    form.append("api_key", API_KEY);
    form.append("api_secret", API_SECRET);

    // Append the uploaded image
    if (req.file) {
      form.append("image_file", req.file.buffer, "image.jpg");
    } else {
      console.error("No image uploaded.");
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Send the image to the Face++ API for skin analysis
    const response = await axios.post(
      "https://api-us.faceplusplus.com/facepp/v1/skinanalyze",
      form,
      { headers: form.getHeaders() }
    );

    // Return the Face++ response to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error uploading image:", error?.response?.data || error.message);

    if (error.response) {
      // Log detailed error from Face++ API
      return res.status(error.response.status).json({
        error: "Failed to analyze image.",
        details: error.response.data,
      });
    } else if (error.request) {
      // No response received from Face++ API
      return res.status(500).json({ error: "No response received from Face++ API." });
    } else {
      // General errors
      return res.status(500).json({ error: "Error in processing request." });
    }
  }
});

module.exports = router;
