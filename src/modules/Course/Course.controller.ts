import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { CourseServices } from "./Course.service";

const createCourse = catchAsync(async (req, res) => {
  
  const result = await CourseServices.createCourseIntoDB(req.body, req.user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is created succesfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course are retrieved successfully",
    data: result,
  });
});

const updateSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseServices.updateSingleCourseFromDB(
    courseId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

const getSingleCourseWithReview = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const { course, review } =
    await CourseServices.getSingleCourseWithReviewFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course and Reviews retrieved successfully",
    data: { course, review },
  });
});

const getBestCourseOnAvarageRating = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseOnAvarageRatingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Best course retrieved successfully",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  updateSingleCourse,
  getSingleCourseWithReview,
  getBestCourseOnAvarageRating,
};
