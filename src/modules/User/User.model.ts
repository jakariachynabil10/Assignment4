import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./User.interface";
import confiq from "../../app/confiq";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: { type: String, select: false },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(confiq.bcrypt_salt_rounds)
  );
  next();
});

// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findById(id).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPass,
  hashPass
) {
  return await bcrypt.compare(plainTextPass, hashPass);
};

export const User = model<TUser, UserModel>("user", userSchema);
