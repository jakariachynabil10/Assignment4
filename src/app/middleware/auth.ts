/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppErros";
import confiq from "../confiq";
import { User } from "../../modules/User/User.model";
import { TUserRole } from "../../modules/User/User.interface";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      confiq.jwt_access_secret as string
    ) as JwtPayload;

    
    const { role, _id, iat } = decoded;

    const user = await User.findById(_id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This User was not found");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized  hi!"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
