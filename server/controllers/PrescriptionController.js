import { v2 as cloudinary } from "cloudinary";
import Order from "../models/Order.js";

export const uploadPrescription = async (req, res) => {
  try {
    const { note } = req.body;
    const prescriptionFile = req.files?.[0];

    if (!prescriptionFile) {
      return res.json({ success: false, message: "Prescription file is required." });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(prescriptionFile.path, {
      resource_type: "auto", // auto-detect image/pdf
    });

    const fileUrl = uploadResponse.secure_url;

    // Use userId directly from authUser (no DB lookup needed)
    const userId = req.body.userId;

    // Create order
    const order = await Order.create({
      userId,
      items: [
        { product: "Prescription Upload", quantity: 1 }
      ],
      amount: 0,
      address: "Prescription order (no address needed)",
      paymentType: "Prescription",
      isPaid: false,
      prescriptionUrl: fileUrl,
    });

    res.json({
      success: true,
      message: "Prescription uploaded and order created.",
      fileUrl,
      orderId: order._id,
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
