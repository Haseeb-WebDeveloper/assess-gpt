import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let isConnected = false;

export default async function connectToDB() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}