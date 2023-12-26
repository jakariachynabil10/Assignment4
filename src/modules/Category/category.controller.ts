import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body, req.user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
};
