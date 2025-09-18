// models/TestCatalog.js
import mongoose from "mongoose";

const testCatalogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },         // Test name (e.g. CBC, X-Ray)
    description: { type: String },                  // Short description
    fees: { type: Number, required: true },         // Price
    image: { type: String },                        // Optional image/logo
    category: { type: String, default: "Medical Test" },
    isActive: { type: Boolean, default: true }      // Enable/disable test
  },
  { timestamps: true }
);

const TestCatalog = mongoose.model("testcatalog", testCatalogSchema);
export default TestCatalog;
