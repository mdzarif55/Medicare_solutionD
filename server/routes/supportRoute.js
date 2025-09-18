import express from "express";
import { aiSupport } from "../controllers/supportController.js";

const supportRouter = express.Router();

supportRouter.post("/ai", aiSupport);

export default supportRouter;
