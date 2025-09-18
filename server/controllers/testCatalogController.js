import TestCatalog from "../models/TestCatalog.js";

// Add a new test
export const addTest = async (req, res) => {
  try {
    const { name, description, fees, image } = req.body;
    if (!name || !fees) return res.json({ success: false, message: "Missing fields" });

    const test = await TestCatalog.create({ name, description, fees, image });
    res.json({ success: true, message: "Test added", test });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// List all tests
export const listTests = async (_req, res) => {
  try {
    const tests = await TestCatalog.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, tests });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Get single test
export const getTestById = async (req, res) => {
  try {
    const { id } = req.body;   // ✅ from request body
    if (!id) {
      return res.json({ success: false, message: "Test ID required" });
    }

    const test = await TestCatalog.findById(id);
    if (!test) return res.json({ success: false, message: "Test not found" });

    res.json({ success: true, test });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};