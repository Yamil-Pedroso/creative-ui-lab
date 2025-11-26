import { Schema, model, Document } from "mongoose";

export interface MeditationDoc extends Document {
  title: string;
  category: string;
  duration: number;
  level: "beginner" | "intermediate" | "advanced";
  description: string;
  audioUrl: string;

  image: string;
  video?: string;

  likes: number;
  fullImageUrl: string; // Virtual
  fullVideoUrl?: string; // Virtual
}

const MeditationSchema = new Schema<MeditationDoc>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    description: { type: String, required: true },
    audioUrl: { type: String, required: true },

    // 🔥 PATHS RELATIVOS DESDE TU JSON IMPORTADO
    image: { type: String, required: true },
    video: { type: String },

    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 🌍 Obtener BASE_URL dinámicamente
MeditationSchema.virtual("fullImageUrl").get(function () {
  const BASE = process.env.BASE_URL || "http://localhost:3010";
  return `${BASE}/images/${this.image}`;
});

MeditationSchema.virtual("fullVideoUrl").get(function () {
  if (!this.video) return null;

  const BASE = process.env.BASE_URL || "http://localhost:3010";
  return `${BASE}/video/${this.video}`;
});

export default model<MeditationDoc>("Meditation", MeditationSchema);
