/* eslint-disable prefer-const */
import mongoose from "mongoose";
import { TErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const statusCode = 400;
  // eslint-disable-next-line prefer-const
  let message = "Invalid ID";
  let errorMessage = err.path;
  let errorDetails = err;

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails,
  };
};

export default handleCastError;
