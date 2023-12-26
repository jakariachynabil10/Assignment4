import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";

const createReviewIntoDB = async (payload: TReview) => {
  const result = await ReviewModel.create(payload);
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
