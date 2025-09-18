import express from "express";
import authSeller from "../middlewares/authSeller.js";
import { addTest, listTests, getTestById } from "../controllers/testCatalogController.js";

const catalogRouter = express.Router();

// Admin
catalogRouter.post("/add", authSeller, addTest);

// User
catalogRouter.get("/list", listTests);
catalogRouter.post("/id", getTestById);

export default catalogRouter;
