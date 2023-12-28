/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized Access",
        errorMessage: "You do not have the necessary permissions to access this resource.",
      });
    }

    try {
      // checking if the given token is valid
      const decoded = jwt.verify(token, confiq.jwt_access_secret as string) as JwtPayload;

      const { role, _id, iat } = decoded;

      const user = await User.findById(_id);

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This User was not found");
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        return res.status(httpStatus.FORBIDDEN).json({
          success: false,
          message: "Unauthorized Access",
          errorMessage: "You do not have the necessary permissions to access this resource.",
        });
      }

      req.user = decoded as JwtPayload;
      return next();
    } catch (err) {
      next (err)
    }
  });
};

export default auth;
