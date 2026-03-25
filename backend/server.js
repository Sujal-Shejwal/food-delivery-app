import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ FINAL CORS FIX
app.use(cors({
  origin: [
    "https://food-delivery-app-gd5y.vercel.app",       // admin panel
    "https://food-delivery-app-lemon-phi.vercel.app"   // frontend (NEW)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ SERVE IMAGES
app.use("/images", express.static("uploads"));

// db
connectDB();

// routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// server start
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});