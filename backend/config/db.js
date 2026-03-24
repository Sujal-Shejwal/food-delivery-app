import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://sujalshejwal2004:8652046450@cluster0.smp7bjm.mongodb.net/Food-Delivery')
  .then(()=>console.log("DB Connected"));
}