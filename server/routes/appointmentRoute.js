import express from "express";
import authUser from "../middlewares/authUser.js";
import { bookAppointment, cancelAppointment, getAllAppointments, getMyAppointments, payAppointment, stripeWebhook } from "../controllers/appointmentController.js";
import authSeller from "../middlewares/authSeller.js";

const appointmentRouter = express.Router();

// ✅ Protect with authUser
appointmentRouter.post('/book', authUser, bookAppointment);
appointmentRouter.get("/my", authUser, getMyAppointments); 
appointmentRouter.post("/cancel", authUser, cancelAppointment);
appointmentRouter.post("/pay", authUser, payAppointment);
appointmentRouter.get("/all", authSeller, getAllAppointments);

appointmentRouter.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);
export default appointmentRouter;
