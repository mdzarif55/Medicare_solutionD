import Order from "../models/Order.js";
import Product from "../models/product.js";
import stripe from "stripe"
import user from "../models/User.js"

// placed or COD : /api/order/cod

export const placeOrderCod = async (req, res) => {
    try {
        const { origin } = req.headers;
        const { userId, items, address } = req.body;
        if (!address || items.length == 0) {
            return res.json({ success: false, message: "Indalid Date" })
        }

        //calculate amount using items c
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"

        });

        return res.json({
            success: true,
            url: `${origin}/loader?next=my-orders&notify=Placed+Order`
        })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// Placed Order Stripe

export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        if (!address || items.length == 0) {
            return res.json({ success: false, message: "Indalid Date" })
        }

        let productData = [];


        //calculate amount using items c
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",

        });

        // stripe gateway Initialize

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //Create line items for stripe 

        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "BDT",
                    product_data: {
                        name: item.name,
                    }, unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity,
            }
        })

        //create session 

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        return res.json({ success: true, url: session.url })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//stripe webhooks to verify payments action : /stripe

export const stripeWebhooks = async (request, response) => {
    //stripe gateway initialize 
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers["stripe-signature"];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        response.status(400).send(`webhook Error: ${error.message}`)

    }
    //Handle  key  event 

    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //Get  session metadata 
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId, userId } = session.data[0].metadata;

            //Mark paymet as  paid 

            await Order.findByIdAndUpdate(orderId, { isPaid: true })
            //clear user cart
            await UserActivation.findByIdAndUpdate(userId, { cartItems: {} });
            break;
        }

        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //Get  session metadata 
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId } = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }

        default:
            console.error(`Unhandled event type ${event.type}`)
            break;
    }
    response.json({ recived: true })
}

//Get order by user ID : api/order/user

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// works for to get prescriptions order

// export const getUserOrders = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     let orders = await Order.find({
//       userId,
//       $or: [
//         { paymentType: "COD" },
//         { isPaid: true },
//         { paymentType: "Prescription" }
//       ]
//     }).sort({ createdAt: -1 });

//     // Populate only if product looks like an ObjectId
//     for (let order of orders) {
//       if (order.paymentType !== "Prescription") {
//         await order.populate("items.product");
//         await order.populate("address");
//       }
//     }

//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("getUserOrders error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };


//Get All  orders for seller / admin : api/order/seller

// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({
//             $or: [{ paymentType: "COD" }, { isPaid: true }]
//         }).populate("items.product address").sort({ createdAt: -1 });
//         res.json({ success: true, orders });
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }

// SHOWing The seller order with prescriptions


export const getAllOrders = async (req, res) => {
  try {
    let orders = await Order.find({
      $or: [
        { paymentType: "COD" },
        { isPaid: true },
        { paymentType: "Prescription" }   // 👈 include prescriptions
      ]
    }).sort({ createdAt: -1 });

    // Populate only if it's not a prescription order
    for (let order of orders) {
      if (order.paymentType !== "Prescription") {
        await order.populate("items.product");
        await order.populate("address");
      }
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error("getAllOrders error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
