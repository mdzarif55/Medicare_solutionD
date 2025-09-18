// import { v2 as cloudinary } from "cloudinary";
// import Doctor from "../models/Doctor.js";

// /** POST /api/doctor/add  (authSeller)
//  *  Expect: multipart/form-data
//  *   - field "doctorData": JSON string
//  *   - field "image": file (single)
//  */
// export const addDoctor = async (req, res) => {
//   try {
//     const doctorData = JSON.parse(req.body.doctorData || "{}");

//     if (!req.file) {
//       return res.json({ success: false, message: "Doctor image is required" });
//     }

//     // Upload to Cloudinary
//     const upload = await cloudinary.uploader.upload(req.file.path, {
//       resource_type: "image",
//     });

//     await Doctor.create({ ...doctorData, image: upload.secure_url });

//     return res.json({ success: true, message: "Doctor added" });
//   } catch (e) {
//     console.log(e.message);
//     return res.json({ success: false, message: e.message });
//   }
// };

// // GET /api/doctor/list
// export const listDoctors = async (_req, res) => {
//   try {
//     const doctors = await Doctor.find({}).sort({ createdAt: -1 }); // ✅ removed filter
//     res.json({ success: true, doctors });
//   } catch (e) {
//     console.log(e.message);
//     res.json({ success: false, message: e.message });
//   }
// };

// // POST /api/doctor/id  { id }
// export const doctorById = async (req, res) => {
//   try {
//     const { id } = req.body;
//     const doctor = await Doctor.findById(id);
//     res.json({ success: true, doctor });
//   } catch (e) {
//     res.json({ success: false, message: e.message });
//   }
// };

// // POST /api/doctor/active  { id, isActive }
// export const toggleActive = async (req, res) => {
//   try {
//     const { id, isActive } = req.body;
//     await Doctor.findByIdAndUpdate(id, { isActive });
//     res.json({ success: true, message: "Doctor availability updated" });
//   } catch (e) {
//     res.json({ success: false, message: e.message });
//   }
// };



import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/Doctor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/** POST /api/doctor/add  (authSeller)
 * Expect: multipart/form-data
 *  - field "doctorData": JSON string { name, speciality, fees, email, password, ... }
 *  - field "image": file (single)
 */
/** POST /api/doctor/add  (authSeller)
 * Expect: multipart/form-data
 *  - field "doctorData": JSON string { name, speciality, fees, email, password, ... }
 *  - field "image": file (single)
 */
export const addDoctor = async (req, res) => {
  try {
    const doctorData = JSON.parse(req.body.doctorData || "{}");

    // Require image
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Doctor image is required" });
    }

    // Require email + valid format
    if (!doctorData.email || !/\S+@\S+\.\S+/.test(doctorData.email)) {
      return res.status(400).json({ success: false, message: "Valid email is required" });
    }

    // Require password
    if (!doctorData.password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    // Prevent duplicate email
    const exists = await Doctor.findOne({ email: doctorData.email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Doctor with this email already exists" });
    }

    // Upload image to Cloudinary
    const upload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    // Hash password
    const hashedPass = await bcrypt.hash(doctorData.password, 10);

    // Create doctor
    await Doctor.create({
      ...doctorData,
      password: hashedPass,
      image: upload.secure_url,
      availability: { days: [] },   // initialize empty availability
      totalEarnings: 0,             // start fresh
      isActive: true,               // default active
    });

    return res.status(201).json({ success: true, message: "Doctor added successfully" });
  } catch (e) {
    console.error("Add Doctor Error:", e);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// GET /api/doctor/list
export const listDoctors = async (_req, res) => {
  try {
    const doctors = await Doctor.find({}).sort({ createdAt: -1 });
    res.json({ success: true, doctors });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

// POST /api/doctor/id  { id }
export const doctorById = async (req, res) => {
  try {
    const { id } = req.body;
    const doctor = await Doctor.findById(id).select("-password");
    res.json({ success: true, doctor });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

// POST /api/doctor/active  { id, isActive }
export const toggleActive = async (req, res) => {
  try {
    const { id, isActive } = req.body;
    await Doctor.findByIdAndUpdate(id, { isActive });
    res.json({ success: true, message: "Doctor availability updated" });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

/* ------------------------
   NEW: Account Features
-------------------------*/

// POST /api/doctor/login
export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.json({ success: false, message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password || "");
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("doctorToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only secure in prod
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
      doctor: { id: doctor._id, name: doctor.name, email: doctor.email },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Logout Doctor
export const logoutDoctor = async (req, res) => {
  try {
    res.clearCookie("doctorToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.json({ success: true, message: "Logged out successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Logout failed. Please try again." });
  }
};

// GET /api/doctor/profile (authDoctor)
export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctorId).select("-password");
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, doctor });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};


// POST /api/doctor/profile/update (authDoctor)
export const updateDoctorProfile = async (req, res) => {
  try {
    const updateData = req.body.updateData;
    const doctor = await Doctor.findByIdAndUpdate(req.doctorId, updateData, { new: true }).select("-password");
    res.json({ success: true, message: "Profile updated successfully", doctor });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};



// ✅ Get doctor's earnings
export const getDoctorEarnings = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctorId).select("totalEarnings");
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, totalEarnings: doctor.totalEarnings });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};



