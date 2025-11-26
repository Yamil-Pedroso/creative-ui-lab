import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Meditation from "../models/Meditation";

// Load config.env in dev
dotenv.config({ path: path.join(__dirname, "..", "config", "config.env") });

/* ---------------------- CONNECT DATABASE ---------------------- */
async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("❌ MONGO_URI missing");

    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to DB:", error);
    process.exit(1);
  }
}

/* ---------------------- IMPORT DATA ---------------------- */
async function importData() {
  try {
    await connectDB();

    // Load meditation.json
    const filePath = path.join(__dirname, "..", "data", "meditation.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const { meditations } = jsonData;

    // Clear collection
    await Meditation.deleteMany();
    console.log("🧹 Cleared Meditation collection");

    // Transform JSON → DB format
    const formatted = meditations.map((m: any) => {
      // Remove full URLs → keep only relative paths
      const imagePath = m.image
        ?.replace(/^https?:\/\/[^/]+\/images\//, "")
        ?.replace(/^http:\/\/localhost:\d+\/images\//, "")
        ?.replace(/^\/images\//, "");

      const videoPath = m.video
        ? m.video
            .replace(/^https?:\/\/[^/]+\/video\//, "")
            .replace(/^http:\/\/localhost:\d+\/video\//, "")
            .replace(/^\/video\//, "")
        : null;

      return {
        title: m.title,
        category: m.category,
        duration: m.duration,
        level: m.level.toLowerCase(),
        description: m.content,
        audioUrl: "/audios/default.mp3", // static for now

        image: imagePath,
        video: videoPath,

        likes: m.likes || 0,
      };
    });

    // Insert into DB
    await Meditation.insertMany(formatted);

    console.log(`🧘 Inserted ${formatted.length} meditations`);
    console.log("🎉 Import completed!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing:", error);
    process.exit(1);
  }
}

importData();
