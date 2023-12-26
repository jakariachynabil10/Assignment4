import express from "express";
import { ReviewController } from "./review.controller";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../User/User.constant";

const router = express.Router();

router.post("/reviews",auth(USER_ROLE.user), ReviewController.createReview);

export const ReviewRouter = router;
