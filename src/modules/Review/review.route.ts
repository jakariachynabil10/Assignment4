import express from "express";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/reviews", ReviewController.createReview);

export const ReviewRouter = router;
