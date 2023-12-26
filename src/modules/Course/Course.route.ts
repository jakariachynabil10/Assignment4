import express from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { CourseValidationSchema } from "./Course.validation";
import { CourseControllers } from "./Course.controller";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../User/User.constant";

const router = express.Router();

router.post(
  "/courses",
  auth(USER_ROLE.admin),
  validateRequest(CourseValidationSchema.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get("/courses", CourseControllers.getAllCourses);
router.put("/courses/:courseId", auth(USER_ROLE.admin), CourseControllers.updateSingleCourse);
router.get(
  "/courses/:courseId/reviews",
  CourseControllers.getSingleCourseWithReview,
);
router.get("/courses/best", CourseControllers.getBestCourseOnAvarageRating);

export const CourseRoutes = router;
