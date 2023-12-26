/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";

const createReviewIntoDB = async (payload: TReview, id : any) => {
  payload.createdBy = id
  const result = (await ReviewModel.create(payload)).populate('createdBy');
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
