// import mongoose from "mongoose";

// const appointmentSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
//   doctor: { type: mongoose.Schema.Types.ObjectId, ref: "doctor", required: true },
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   status: { type: String, default: "Scheduled" },
//   paymentType: { type: String, default: "Unpaid" },
// }, { timestamps: true });

// const Appointment = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);

// export default Appointment;

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "doctor", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "Scheduled" }, // Scheduled, Cancelled, Completed
  paymentType: { type: String, default: "Unpaid" }, // Unpaid, COD, Online
  fees: { type: Number, required: true }, // 💰 doctor fee snapshot
  isPaid: { type: Boolean, default: false }, // ✅ track payment status
}, { timestamps: true });

const Appointment = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);

export default Appointment;
