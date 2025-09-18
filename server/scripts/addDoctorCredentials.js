import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Doctor from "../models/Doctor.js";

dotenv.config();

const doctorsWithEmails = [
  { name: "Prof. Dr. Haridas Biswas", email: "haridas@medicare.com", password: "Haridas@123" },
  { name: "Prof. Dr. Suha Jesmin", email: "suha@medicare.com", password: "Suha@123" },
  { name: "Dr. Farzana Rahman Shathi", email: "farzana@medicare.com", password: "Farzana@123" },
  { name: "Prof. Dr. Syed Khairul Amin", email: "amin@medicare.com", password: "Amin@123" },
  { name: "Prof. Dr. Subash Kanti Dey", email: "subash@medicare.com", password: "Subash@123" },
  { name: "Dr. Mohammad Selim Shahi", email: "selim@medicare.com", password: "Selim@123" },
  { name: "Prof. Dr. ABM Abdullah", email: "abdullah@medicare.com", password: "Abdullah@123" },
  { name: "Dr. Jasmine Sultana", email: "jasmine@medicare.com", password: "Jasmine@123" },
  { name: "Dr. Shakti Chowdhury", email: "shakti@medicare.com", password: "Shakti@123" },
  { name: "Prof. Dr. Azmeri Sultana", email: "azmeri@medicare.com", password: "Azmeri@123" },
  { name: "Prof. Dr. Md. Rafiqul Islam", email: "rafiq@medicare.com", password: "Rafiq@123" },
  { name: "Dr. Md. Ashrafuzzaman Khan", email: "ashraf@medicare.com", password: "Ashraf@123" },
  { name: "Dr. Hasna Fahmima Haque", email: "hasna@medicare.com", password: "Hasna@123" },
  { name: "Asst. Prof. Dr. Sharmin Akter Liza", email: "sharmin@medicare.com", password: "Sharmin@123" },
  { name: "Dr. Md. Nazmus Saleheen (Pavel)", email: "pavel@medicare.com", password: "Pavel@123" },
];

const run = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/medicare_solution`);
    console.log("✅ DB Connected");

    for (let doc of doctorsWithEmails) {
      const doctor = await Doctor.findOne({ name: doc.name });
      if (doctor) {
        const hashedPass = await bcrypt.hash(doc.password, 10);
        doctor.email = doc.email;
        doctor.password = hashedPass;
        await doctor.save();
        console.log(`🔑 Updated credentials for ${doc.name}`);
      } else {
        console.log(`⚠️ Doctor not found: ${doc.name}`);
      }
    }

    console.log("🎉 All credentials added successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

run();
