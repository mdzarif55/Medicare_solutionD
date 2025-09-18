// import mongoose from "mongoose";

// const doctorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   speciality: { type: String, required: true },
//   degree: { type: String },
//   experience: { type: String },
//   about: { type: String },
//   fees: { type: Number, required: true },

//   // Cloudinary URL of the uploaded photo
//   image: { type: String, required: true },

//   address: {
//     line1: String,
//     line2: String,
//   },
//   isActive: { type: Boolean, default: true },
// }, { timestamps: true });

// const Doctor = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
// export default Doctor;


import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String },
  experience: { type: String },
  about: { type: String },
  fees: { type: Number, required: true },

  // Cloudinary URL of the uploaded photo
  image: { type: String, required: true },

  address: {
    line1: String,
    line2: String,
  },
  isActive: { type: Boolean, default: true },

  // 🔑 New login fields
  email: { type: String, unique: true, sparse: true },
  password: { type: String },

  // 🔄 Doctor availability (editable in dashboard)
  availability: {
    days: [String],  // e.g. ["Mon", "Wed", "Fri"]
    time: String     // e.g. "6 PM - 9 PM"
  },

  // 💰 Track doctor earnings
  totalEarnings: { type: Number, default: 0 },

}, { timestamps: true });

const Doctor = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
export default Doctor;
