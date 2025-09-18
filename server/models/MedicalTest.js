// models/MedicalTest.js
import mongoose from "mongoose";

const medicalTestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    testName: { type: String, required: true },
    lab: { type: String }, // optional: which lab/hospital
    date: { type: String, required: true },
    time: { type: String, required: true },
    fees: { type: Number, required: true },
    status: { type: String, default: "Scheduled" }, // Scheduled, Processing, Completed, Cancelled
    isPaid: { type: Boolean, default: false },
    paymentType: { type: String, default: "COD" }, // COD or Online
  },
  { timestamps: true }
);

const MedicalTest = mongoose.model("medicaltest", medicalTestSchema);
export default MedicalTest;
