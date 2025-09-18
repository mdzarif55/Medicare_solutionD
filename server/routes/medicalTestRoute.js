import express from "express";
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";
import {
  bookTest,
  getMyTests,
  cancelTest,
  payTest,
  stripeWebhookForTest,
  getAllTests,
  updateTestStatus,
} from "../controllers/medicalTestController.js";

const testRouter = express.Router();

// User routes
testRouter.post("/book", authUser, bookTest);
testRouter.get("/my-tests", authUser, getMyTests);
testRouter.post("/cancel", authUser, cancelTest);
testRouter.post("/pay", authUser, payTest);
testRouter.post("/webhook", stripeWebhookForTest);

// Admin/Seller routes
testRouter.get("/all", authSeller, getAllTests);
testRouter.post("/update-status", authSeller, updateTestStatus);

export default testRouter;
