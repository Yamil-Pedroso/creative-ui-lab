import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Meditation from "../models/Meditation";

dotenv.config({ path: path.join(__dirname, "..", "config", "config.env") });

// 🔌 Connect DB
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

async function importData() {
  try {
    await connectDB();

    // Load JSON
    const filePath = path.join(__dirname, "..", "data", "meditation.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const { meditations } = jsonData;

    // Clean meditation collection
    await Meditation.deleteMany();
    console.log("🧹 Cleared Meditation collection");

    // Format JSON into your model fields
    const formatted = meditations.map((m: any) => ({
      title: m.title,
      category: m.category,
      duration: m.duration,
      level: m.level.toLowerCase(), // "Beginner" → "beginner"
      description: m.content,
      audioUrl: "/audios/default.mp3", // temporal hasta que tengas audios
      videoUrl: m.video || undefined,
      imageUrl: m.image,
      likes: m.likes,
    }));

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
