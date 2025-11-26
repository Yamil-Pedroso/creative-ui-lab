import { Schema, model, Document } from "mongoose";

export interface CategoryDoc extends Document {
  categoryId: string;
  name: string;
  description: string;
}

const CategorySchema = new Schema<CategoryDoc>(
  {
    categoryId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default model<CategoryDoc>("Category", CategorySchema);
