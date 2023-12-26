/* eslint-disable prefer-const */
import mongoose from "mongoose";
import { TErrorResponse } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  let errorMessage: string = "";

  Object.values(err.errors).forEach(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      errorMessage += `${val?.path} is required`;
    },
  );

  const statusCode = 400;
  let errorDetails = err;

  return {
    statusCode,
    message: "Validation Error",
    errorMessage,
    errorDetails,
  };
};

export default handleValidationError;
