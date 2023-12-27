import httpStatus from "http-status";
import AppError from "../../app/errors/AppErros";
import { TLoginUser, TUser } from "./User.interface";
import { User } from "./User.model";
import confiq from "../../app/confiq";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  // const {username, email, role, createdAt, updatedAt} = result
  // return {username, email, role, createdAt, updatedAt};
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // eslint-disable-next-line prefer-const
  let users = await User.findOne({ username: payload.username }).select(
    "+password"
  );

  if (!users) {
    throw new AppError(httpStatus.NOT_FOUND, "This User was not found");
  }

  // eslint-disable-next-line prefer-const
  let user = users;

  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not match!");
  }

  user = await User.findOne({ username: payload.username }).select("-password");

  const jwtPayload = {
    _id: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, confiq.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return { user, accessToken };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string }
) => {
  const user = await User.findById(userData._id).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This is User not Found");
  }

  if (!(await User.isPasswordMatched(payload.currentPassword, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not match!");
  }

  //   const lastTwoPassword = user.passwordHistory.slice(-2)

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(confiq.bcrypt_salt_rounds)
  );

  const newPasswordObject = [
    newHashPassword,
     new Date()
  ]

  await User.findOneAndUpdate(
    {
      _id: userData._id,
    },
    {
      $set: { password: newHashPassword },
      $push: { passwordHistory: newPasswordObject },
    },
    {
      new: true,
      upsert: true,
    }
  );

  return null;
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
  changePassword,
};
