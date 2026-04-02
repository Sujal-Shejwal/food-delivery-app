import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// ✅ Lazy Stripe Initialization
let stripe;

const getStripe = () => {
  if (!stripe) {
    console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
};

// placing user order
const placeOrder = async (req, res) => {
  const stripe = getStripe();

  const frontend_url = "https://food-delivery-app-lemon-phi.vercel.app";

  try {
    const newOrder = new orderModel({
      userId: req.userId,   // ✅ FIXED (was req.body.userId)
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });

    await newOrder.save();

    // clear cart
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} }); // ✅ FIXED

    // create line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    // delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 100
      },
      quantity: 1
    });

    // ✅ FIXED Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log("STRIPE ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// verify payment
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying order" });
  }
};

// user orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({
      userId: req.body.userId?.toString()
    });

    res.json({ success: true, data: orders });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching user orders" });
  }
};

// admin orders
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// update order status
const updateStatus = async (req, res) => {
  try {
    if (!req.body.orderId || !req.body.status) {
      return res.json({ success: false, message: "Missing data" });
    }

    console.log("Incoming ID:", req.body.orderId);

    const updated = await orderModel.findByIdAndUpdate(
      req.body.orderId,
      { $set: { status: req.body.status } },
      { new: true }
    );

    console.log("UPDATED:", updated);

    res.json({ success: true, message: "Status Updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus
};