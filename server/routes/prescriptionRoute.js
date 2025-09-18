import express from "express";
import authUser from "../middlewares/authUser.js";
import { upload } from "../configs/multer.js";
import { uploadPrescription } from "../controllers/PrescriptionController.js";

const prescriptionRouter = express.Router();

prescriptionRouter.post(
  "/upload",
  authUser,                                 // inject userId first
  (req, res, next) => {                     // preserve it before multer wipes body
    req._userId = req.body.userId;
    next();
  },
  upload.array("prescription"),             // multer overwrites req.body
  (req, res, next) => {                     // restore after multer
    if (!req.body) req.body = {};
    req.body.userId = req._userId;
    next();
  },
  uploadPrescription
);
export default prescriptionRouter;
