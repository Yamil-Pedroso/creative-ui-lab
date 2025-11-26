import { Schema, model, Document } from "mongoose";

export interface UserDoc extends Document {
  email: string;
  password: string;
  name: string;
  favorites: string[]; // meditation IDs
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Meditation" }],
  },
  { timestamps: true }
);

export default model<UserDoc>("User", UserSchema);
