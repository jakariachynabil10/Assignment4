import { Schema, model } from "mongoose";
import { TCourse, Tdetail } from "./Course.interface";

const detailsSchema = new Schema<Tdetail>(
  {
    level: {
      type: String,
      enum: {
        values: ["Beginner", "Intermediate", "Advanced"],
      },
    },
    description: { type: String },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
  },
  instructor: { type: String },
  categoryId: {
    type: Schema.Types.ObjectId,
    unique: true,
    ref: "category",
  },
  price: { type: Number },
  tags: [
    {
      name: { type: String },
      isDeleted: { type: Boolean },
    },
  ],
  startDate: { type: String },
  endDate: { type: String },
  language: { type: String },
  provider: { type: String },
  durationInWeeks: { type: Number },
  details: detailsSchema,
});

export const CourseModel = model<TCourse>("Course", courseSchema);
