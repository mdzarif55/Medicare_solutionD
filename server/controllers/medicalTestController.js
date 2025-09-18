import MedicalTest from "../models/MedicalTest.js";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

/* ---------------------------
   USER SIDE
--------------------------- */

// ✅ Book a test
export const bookTest = async (req, res) => {
  try {
    const { testName, lab, date, time, fees } = req.body;
    const userId = req.body.userId;

    if (!testName || !date || !time || !fees) {
      return res.json({ success: false, message: "Missing details" });
    }

    const test = await MedicalTest.create({
      user: userId,
      testName,
      lab,
      date,
      time,
      fees,
    });

    res.json({ success: true, message: "Test booked successfully", test });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Get logged-in user's tests
export const getMyTests = async (req, res) => {
  try {
    const tests = await MedicalTest.find({ user: req.body.userId })
      .sort({ createdAt: -1 });
    res.json({ success: true, tests });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Cancel test
export const cancelTest = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.body.userId;

    const deleted = await MedicalTest.findOneAndDelete({ _id: id, user: userId });
    if (!deleted) return res.json({ success: false, message: "Test not found or not yours" });

    res.json({ success: true, message: "Test booking cancelled" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Pay for test (Stripe)
export const payTest = async (req, res) => {
  try {
    const { testId } = req.body;
    const origin = process.env.CLIENT_URL || "http://localhost:5173";

    const test = await MedicalTest.findById(testId);
    if (!test) return res.json({ success: false, message: "Test not found" });

    const session = await stripeInstance.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: { name: `Medical Test: ${test.testName}` },
            unit_amount: test.fees * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/my-tests?success=true`,
      cancel_url: `${origin}/my-tests?cancel=true`,
      metadata: { testId: test._id.toString(), userId: test.user.toString() },
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Stripe Webhook for Test
export const stripeWebhookForTest = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    let event;

    event = stripeInstance.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const testId = session.metadata?.testId;

      if (testId) {
        await MedicalTest.findByIdAndUpdate(testId, {
          isPaid: true,
          paymentType: "Online",
          status: "Scheduled",
        });
      }
    }

    res.json({ received: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/* ---------------------------
   SELLER / ADMIN SIDE
--------------------------- */

// ✅ Fetch all tests (admin/seller)
export const getAllTests = async (_req, res) => {
  try {
    const tests = await MedicalTest.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, tests });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Update test status
export const updateTestStatus = async (req, res) => {
  try {
    const { testId, status } = req.body;

    const test = await MedicalTest.findByIdAndUpdate(
      testId,
      { $set: { status } },
      { new: true }
    );

    if (!test) return res.json({ success: false, message: "Test not found" });

    res.json({ success: true, message: `Test marked as ${status}`, test });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
