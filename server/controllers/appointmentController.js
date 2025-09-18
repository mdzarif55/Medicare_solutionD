// import Appointment from "../models/Appointment.js";
// import Stripe from "stripe";

// const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// // ✅ Book Appointment
// export const bookAppointment = async (req, res) => {
//   try {
//     const { doctorId, date, time } = req.body;
//     const userId = req.body.userId; // from authUser

//     if (!doctorId || !date || !time) {
//       return res.json({ success: false, message: "Missing details" });
//     }

//     const appointment = await Appointment.create({
//       user: userId,
//       doctor: doctorId,
//       date,
//       time,
//     });

//     res.json({ success: true, message: "Appointment booked", appointment });
//   } catch (err) {
//     res.json({ success: false, message: err.message });
//   }
// };

// // ✅ Get logged-in user's appointments
// export const getMyAppointments = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     if (!userId) {
//       return res.json({ success: false, message: "User not authenticated" });
//     }

//     const appointments = await Appointment.find({ user: userId })
//       .populate("doctor", "name speciality image fees")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, appointments });
//   } catch (err) {
//     res.json({ success: false, message: err.message });
//   }
// };

// // ✅ Cancel appointment (hard delete)
// export const cancelAppointment = async (req, res) => {
//   try {
//     const { id } = req.body; // appointmentId
//     const userId = req.body.userId; // from authUser middleware

//     if (!id) {
//       return res.json({ success: false, message: "Appointment ID missing" });
//     }

//     const deleted = await Appointment.findOneAndDelete({ _id: id, user: userId });

//     if (!deleted) {
//       return res.json({ success: false, message: "Appointment not found or not yours" });
//     }

//     res.json({ success: true, message: "Appointment deleted" });
//   } catch (err) {
//     res.json({ success: false, message: err.message });
//   }
// };

// // ✅ Stripe Payment for Appointment
// export const payAppointment = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;
//     const origin = process.env.CLIENT_URL || "http://localhost:5173";

//     const apt = await Appointment.findById(appointmentId).populate("doctor");
//     if (!apt) return res.json({ success: false, message: "Appointment not found" });

//     const line_items = [
//       {
//         price_data: {
//           currency: "bdt",
//           product_data: {
//             name: `Appointment with ${apt.doctor.name}`,
//           },
//           unit_amount: apt.doctor.fees * 100, // Stripe expects smallest unit
//         },
//         quantity: 1,
//       },
//     ];

//     const session = await stripeInstance.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${origin}/my-appointments?success=true`,
//       cancel_url: `${origin}/my-appointments?cancel=true`,
//       metadata: {
//         appointmentId: apt._id.toString(),
//         userId: apt.user.toString(),
//       },
//     });

//     res.json({ success: true, url: session.url });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ✅ Stripe Webhook (marks appointment as Paid)
// export const stripeWebhook = async (req, res) => {
//   try {
//     const sig = req.headers["stripe-signature"];
//     let event;

//     try {
//       event = stripeInstance.webhooks.constructEvent(
//         req.rawBody, // ⚠️ raw body, not parsed JSON
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.error("Webhook signature error:", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       const appointmentId = session.metadata?.appointmentId;

//       if (appointmentId) {
//         await Appointment.findByIdAndUpdate(appointmentId, {
//           isPaid: true,
//           paymentType: "Online",
//           status: "Paid",
//         });
//         console.log(`✅ Appointment ${appointmentId} marked as paid`);
//       }
//     }

//     res.json({ received: true });
//   } catch (err) {
//     console.error("Webhook error:", err.message);
//     res.status(500).send(err.message);
//   }
// };



// // Controller to fetch all appointments for sellers
// export const getAllAppointments = async (req, res) => {
//     try {
//         const appointments = await Appointment.find()
//             .populate("doctor", "name speciality image fees")
//             .sort({ createdAt: -1 }); // Sort by latest created

//         res.json({ success: true, appointments });
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// };





import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

/* --------------------------------
   USER SIDE
-------------------------------- */

// ✅ Book Appointment
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const userId = req.body.userId; // from authUser middleware

    if (!doctorId || !date || !time) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Find doctor to attach fee
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.json({ success: false, message: "Doctor not found" });

    const appointment = await Appointment.create({
      user: userId,
      doctor: doctorId,
      date,
      time,
      fees: doctor.fees,
    });

    res.json({ success: true, message: "Appointment booked", appointment });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Get logged-in user's appointments
export const getMyAppointments = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    const appointments = await Appointment.find({ user: userId })
      .populate("doctor", "name speciality image fees")
      .sort({ createdAt: -1 });

    res.json({ success: true, appointments });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Cancel appointment (user deletes their booking)
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.body; // appointmentId
    const userId = req.body.userId; // from authUser middleware

    if (!id) {
      return res.json({ success: false, message: "Appointment ID missing" });
    }

    const deleted = await Appointment.findOneAndDelete({ _id: id, user: userId });

    if (!deleted) {
      return res.json({ success: false, message: "Appointment not found or not yours" });
    }

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Stripe Payment for Appointment
export const payAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const origin = process.env.CLIENT_URL || "http://localhost:5173";

    const apt = await Appointment.findById(appointmentId).populate("doctor");
    if (!apt) return res.json({ success: false, message: "Appointment not found" });

    const line_items = [
      {
        price_data: {
          currency: "bdt",
          product_data: {
            name: `Appointment with ${apt.doctor.name}`,
          },
          unit_amount: apt.doctor.fees * 100, // Stripe expects smallest unit
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/my-appointments?success=true`,
      cancel_url: `${origin}/my-appointments?cancel=true`,
      metadata: {
        appointmentId: apt._id.toString(),
        userId: apt.user.toString(),
      },
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Stripe Webhook (marks appointment as Paid)
export const stripeWebhook = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripeInstance.webhooks.constructEvent(
        req.rawBody, // ⚠️ use raw body, not parsed JSON
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const appointmentId = session.metadata?.appointmentId;

      if (appointmentId) {
        await Appointment.findByIdAndUpdate(appointmentId, {
          isPaid: true,
          paymentType: "Online",
          status: "Scheduled", // keep as scheduled until doctor completes
        });
        console.log(`✅ Appointment ${appointmentId} marked as paid`);
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(500).send(err.message);
  }
};

/* --------------------------------
   SELLER SIDE
-------------------------------- */

// ✅ Fetch all appointments (admin/seller)
export const getAllAppointments = async (_req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name speciality image fees")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

/* --------------------------------
/* -----------------------------
   DOCTOR SIDE
----------------------------- */

// ✅ Fetch appointments for logged-in doctor
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.doctorId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, appointments });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Doctor updates appointment status
// ✅ Doctor updates appointment status safely
export const updateAppointmentByDoctor = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    // ✅ atomic update, only change status
    const appointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, doctor: req.doctorId },
      { $set: { status } },
      { new: true, runValidators: false } // ✅ skip revalidating "fees"
    );

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // If completed & paid → add earnings
    if (status === "Completed" && appointment.isPaid) {
      await Doctor.findByIdAndUpdate(req.doctorId, {
        $inc: { totalEarnings: appointment.fees },
      });
    }

    res.json({ success: true, message: `Appointment marked as ${status}`, appointment });
  } catch (err) {
    console.error("❌ Update Error:", err.message);
    res.json({ success: false, message: err.message });
  }
};
