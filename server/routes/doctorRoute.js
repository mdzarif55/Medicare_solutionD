// import express from "express";
// import { upload } from "../configs/multer.js";
// import authSeller from "../middlewares/authSeller.js";
// import { addDoctor, doctorById, listDoctors, toggleActive } from "../controllers/doctorController.js";

// const doctorRouter = express.Router();

// doctorRouter.post("/add", authSeller, upload.single("image"), addDoctor);
// doctorRouter.get("/list", listDoctors);
// doctorRouter.post("/id", doctorById);
// doctorRouter.post("/active", authSeller, toggleActive);

// export default doctorRouter;


import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";
import authDoctor from "../middlewares/authDoctor.js";
import {
  addDoctor,
  doctorById,
  listDoctors,
  toggleActive,
  doctorLogin,
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorEarnings,
  logoutDoctor,
} from "../controllers/doctorController.js";

import {
  getDoctorAppointments,
  updateAppointmentByDoctor,
} from "../controllers/appointmentController.js";

const doctorRouter = express.Router();

/* ---------- SELLER SIDE ---------- */
doctorRouter.post("/add", authSeller, upload.single("image"), addDoctor);
doctorRouter.post("/active", authSeller, toggleActive);

/* ---------- PUBLIC SIDE (patients) ---------- */
doctorRouter.get("/list", listDoctors);
doctorRouter.post("/id", doctorById);

/* ---------- DOCTOR SIDE ---------- */
doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/logout", logoutDoctor);
doctorRouter.get("/profile", authDoctor, getDoctorProfile);
doctorRouter.post("/profile/update", authDoctor, updateDoctorProfile);

// Appointment management (doctor only)
doctorRouter.get("/appointments", authDoctor, getDoctorAppointments);
doctorRouter.post("/appointments/update", authDoctor, updateAppointmentByDoctor);
doctorRouter.get("/earnings", authDoctor, getDoctorEarnings);

export default doctorRouter;
