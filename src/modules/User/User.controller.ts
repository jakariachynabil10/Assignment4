import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { UserServices } from "./User.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result.role} registered successfully`,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result.user.role} is logged Successfully`,
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
    const user = req.user
    const {...passwordData} = req.body
    const result = await UserServices.changePassword(user, passwordData);

    

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password is Change Successfully',
      data: result,
    });
  });

export const UserController = {
  createUser,
  loginUser,
  changePassword
};
