import { Schema, model, Document } from "mongoose";

export interface MeditationDoc extends Document {
  title: string;
  category: string;
  duration: number; // minutes
  level: "beginner" | "intermediate" | "advanced";
  description: string;
  audioUrl: string;
  imageUrl: string;
  videoUrl?: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
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
    videoUrl: { type: String },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<MeditationDoc>("Meditation", MeditationSchema);
