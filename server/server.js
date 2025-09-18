import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/OrderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import prescriptionRouter from "./routes/prescriptionRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";
import supportRouter from "./routes/supportRoute.js";
import testRouter from "./routes/medicalTestRoute.js";
import catalogRouter from "./routes/testCatalogRoute.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// ✅ Allow frontend domains
const allowedOrigins = [
  "http://localhost:5173",              // local dev
  "https://medicare-solution.vercel.app" // production frontend
];

// Stripe raw body parsing BEFORE express.json
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);
app.use("/api/appointment/webhook", express.raw({ type: "application/json" }));

// Middlewares
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => res.send("✅ API is Working"));
app.post("/api/product/stock", (req, res) => {
  console.log("POST /api/product/stock route is hit");
  res.send("Route is working!");
});

// Routers
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/catalog", catalogRouter);
app.use("/api/test", testRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/prescriptions", prescriptionRouter);
// app.use("/api/support", supportRouter); // Not using now

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
