import { Schema, model, Document, Types } from "mongoose";

export interface FeedbackDoc extends Document {
  userId: Types.ObjectId;
  meditationId: Types.ObjectId;
  rating: number; // 1–5
  comment?: string;
  createdAt: Date;
}

const FeedbackSchema = new Schema<FeedbackDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    meditationId: {
      type: Schema.Types.ObjectId,
      ref: "Meditation",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

export default model<FeedbackDoc>("Feedback", FeedbackSchema);
