import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, ".", "config", "config.env") });

import app from "./app";
import connectDB from "./config/db";
import { connectRedis } from "./config/redis";

const PORT = process.env.PORT || 3010;

async function startServer() {
  try {
    await connectDB();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
