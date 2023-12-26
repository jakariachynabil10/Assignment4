import { Types } from "mongoose";

export type Ttags = [
  {
    name: string;
    isDeleted: boolean;
  },
];

export type Tdetail = {
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: Ttags;
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: Tdetail;
  createdBy : Types.ObjectId
};
