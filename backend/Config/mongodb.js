

import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    // listeners BEFORE connect
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB Connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Connection Error:", err.message);
    });

    await mongoose.connect(process.env.MONGO_URI); // no extra options
  } catch (error) {
    console.error("❌ MongoDB Connection Error (catch):", error.message);
    process.exit(1);
  }
};

export default ConnectDB;
