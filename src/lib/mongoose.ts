import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI: string = process.env.MONGO_URI || "";
const DB_NAME: string = process.env.MONGO_DB_NAME || "";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGODB_URI, {
    dbName: DB_NAME,
  });

  console.log("✅ Connected to MongoDB Atlas");
};
