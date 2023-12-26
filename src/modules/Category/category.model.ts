import { Schema, model } from "mongoose";
import { Tcategory } from "./category.interface";

const categorySchema = new Schema<Tcategory>({
  name: { type: String, unique: true },
});

export const categoryModel = model<Tcategory>("category", categorySchema);
