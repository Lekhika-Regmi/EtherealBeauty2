
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Vendor = require("./vendors.model"); // Adjust the path to your model
const User = require("../users.model");
const upload = require("../../middleware/upload"); 



router.get('/unapproved', async (req, res) => {
  try {
    const unapprovedVendors = await Vendor.findAll({ where: { isApproved: false } });
    res.json(unapprovedVendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/approve/:vendorId', async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findByPk(vendorId);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    vendor.isApproved = true;
    await vendor.save();

    res.json({ message: 'Vendor approved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// In your backend API (e.g., `products.router.js` or `vendors.router.js`)

// Route for getting all approved vendors
router.get('/vendor/display_all_vendors', async (req, res) => {
  try {
    const approvedVendors = await Vendor.findAll({ where: { isApproved: 1 } });
    res.json(approvedVendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// POST route for vendor registration
// router.post("/register/vendor", upload, async (req, res) => {
//   try {
//     console.log("Uploaded files check 1:", req.files);
//     console.log("Received body:", req.body); // Debugging log
//     const {
//       vendorName,
//       ownerName,
//       emailAddress,
//       phoneNo,
//       password,
//       businessRN,
//       businessAddress,
//       termsAccepted,
//     } = req.body;

//     const govtIssuedIds = [
//       req.files.govtIssuedId1 ? req.files.govtIssuedId1[0].path : null,
//       req.files.govtIssuedId2 ? req.files.govtIssuedId2[0].path : null,
//     ].filter(Boolean);

//     console.log("Uploaded govtIssuedIds:", govtIssuedIds);

//     const businessLicense = req.files?.businessLicense ? req.files.businessLicense[0].path : null;

//     console.log("businessLicense:", businessLicense);

//     if (govtIssuedIds.length < 2 || !businessLicense) {
//       return res.status(400).json({ message: "All required files must be uploaded!" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//    // Create Vendor instance
//     const vendor = await Vendor.create({
//       vendorName,
//       ownerName,
//       phoneNo,
//       businessRN,
//       businessAddress,
//       businessLicense,
//       govtIssuedIds,
//       termsAccepted,
//     });

//     // Create User instance (linked to Vendor)
//     const user = await User.create({
//       email: emailAddress,
//       password: hashedPassword,
//       role: "vendor",
     
//     });

//     res.status(201).json({
//       message: "Vendor registered successfully!",
//       vendor,
//       user,
//     });
//   } catch (error) {
//     console.error("Error during vendor registration:", error);
//     res.status(500).json({ message: "Error during registration", error });
//   }
// });
// POST route for vendor registration
router.post("/register/vendor", upload, async (req, res) => {
  try {
    console.log("Uploaded files check 1:", req.files);
    console.log("Received body:", req.body); // Debugging log
    const {
      vendorName,
      ownerName,
      emailAddress,
      phoneNo,
      password,
      businessRN,
      businessAddress,
      termsAccepted,
    } = req.body;

    const govtIssuedIds = [
      req.files.govtIssuedId1 ? req.files.govtIssuedId1[0].path : null,
      req.files.govtIssuedId2 ? req.files.govtIssuedId2[0].path : null,
    ].filter(Boolean);

    console.log("Uploaded govtIssuedIds:", govtIssuedIds);

    const businessLicense = req.files?.businessLicense ? req.files.businessLicense[0].path : null;

    console.log("businessLicense:", businessLicense);

    if (govtIssuedIds.length < 2 || !businessLicense) {
      return res.status(400).json({ message: "All required files must be uploaded!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User instance (linked to Vendor)
    const user = await User.create({
      email: emailAddress,
      password: hashedPassword,
      role: "vendor",
    });

    // Create Vendor instance with user_id linked to User
    const vendor = await Vendor.create({
      vendorName,
      ownerName,
      phoneNo,
      businessRN,
      businessAddress,
      businessLicense,
      govtIssuedIds,
      termsAccepted,
      user_id: user.id,  // Link the vendor to the newly created user
    });

    res.status(201).json({
      message: "Vendor registered successfully!",
      vendor,
      user,
    });
  } catch (error) {
    console.error("Error during vendor registration:", error);
    res.status(500).json({ message: "Error during registration", error });
  }
});

// Register a vendor with file upload
// router.post(
//   "/register/vendor",
//   upload.fields([
//     { name: "businessLicense", maxCount: 1 },
//     { name: "govtIssuedId", maxCount: 1 }
//   ]),
//   async (req, res) => {
//     try {
//       const { vendorName, ownerName, emailAddress, phoneNo, password, businessName, businessRN, businessAddress, termsAccepted } = req.body;

//       const existingVendor = await Vendor.findOne({ where: { emailAddress } });
//       if (existingVendor) {
//         return res.status(400).json({ error: "Email already in use" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newVendor = await Vendor.create({
//         vendorName,
//         ownerName,
//         emailAddress,
//         phoneNo,
//         password: hashedPassword,
//         businessName,
//         businessRN,
//         businessAddress,
//         businessLicense: req.files.businessLicense ? req.files.businessLicense[0].path : null,
//         govtIssuedId: req.files.govtIssuedId ? req.files.govtIssuedId[0].path : null,
//         termsAccepted
//       });
  
   

//     // Respond with success message and vendor data
//     res.status(201).json({
//       message: "Vendor registered successfully!",
//       vendor: {
//         id: newVendor.id,                  
//         vendorName: newVendor.vendorName,  
//         ownerName: newVendor.ownerName,
//         phoneNo: newVendor.phoneNo,        
//         emailAddress: newVendor.emailAddress,  
//         businessName: newVendor.businessName,
//         businessRN: newVendor.businessRN,
//         businessAddress: newVendor.businessAddress,
//         businessLicense: newVendor.businessLicense,
//         govtIssuedId: newVendor.govtIssuedId,
//         termsAccepted: newVendor.termsAccepted,
//       }
//     });
    
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ message: "Error registering vendor", error: err.message });
//   }
// });

module.exports = router;
