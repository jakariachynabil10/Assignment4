/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./User.constant";

export type TRole = "user" | "admin";

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: TRole;
};

export type TLoginUser = {
  username: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  // myStaticMethod() : number
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(plainTextPass : string, hashPass : string) : Promise<boolean>
  // isJWTIssuedBeforePasswordChanged(passwordChangeTimestamp : Date, jwtIssueTimestamp : number) : boolean
}

export type TUserRole = keyof typeof USER_ROLE;
