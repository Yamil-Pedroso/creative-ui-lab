import mongoose, { Schema, Types, Document } from "mongoose";

export interface IFavorite extends Document {
  user: Types.ObjectId;
  meditations: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    meditations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Meditation",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IFavorite>("Favorite", FavoriteSchema);
