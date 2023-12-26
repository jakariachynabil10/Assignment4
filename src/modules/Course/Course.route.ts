import express from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { CourseValidationSchema } from "./Course.validation";
import { CourseControllers } from "./Course.controller";

const router = express.Router();

router.post(
  "/course",
  validateRequest(CourseValidationSchema.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get("/courses", CourseControllers.getAllCourses);
router.put("/courses/:courseId", CourseControllers.updateSingleCourse);
router.get(
  "/courses/:courseId/reviews",
  CourseControllers.getSingleCourseWithReview,
);
router.get("/courses/best", CourseControllers.getBestCourseOnAvarageRating);

export const CourseRoutes = router;
