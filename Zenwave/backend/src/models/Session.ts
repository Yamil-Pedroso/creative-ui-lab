import { Schema, model, Document, Types } from "mongoose";

export interface SessionDoc extends Document {
  userId: Types.ObjectId;
  meditationId: Types.ObjectId;
  completedAt: Date;
  duration: number; // minutes meditated
}

const SessionSchema = new Schema<SessionDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    meditationId: {
      type: Schema.Types.ObjectId,
      ref: "Meditation",
      required: true,
    },
    completedAt: { type: Date, default: Date.now },
    duration: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<SessionDoc>("Session", SessionSchema);
