import { Schema, model } from "mongoose";
import { Tcategory } from "./category.interface";

const categorySchema = new Schema<Tcategory>({
  name: { type: String, unique: true },
  createdBy : {
    type : Schema.Types.ObjectId,
    ref : 'user'
  }
});

export const categoryModel = model<Tcategory>("category", categorySchema);
