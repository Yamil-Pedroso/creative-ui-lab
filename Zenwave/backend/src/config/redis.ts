import { createClient } from "redis";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "..", "config", "config.env") });

let redisClient: any;

export const connectRedis = async () => {
  try {
    redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
      password: process.env.REDIS_PASSWORD || undefined,
    });

    redisClient.on("error", (err: any) =>
      console.error("❌ Redis error:", err)
    );

    await redisClient.connect();
    console.log("🔥 Redis connected");
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
    process.exit(1);
  }
};

export const getRedis = () => redisClient;
