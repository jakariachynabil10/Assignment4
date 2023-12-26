/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { TErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    message: "Invalid ID",
    errorMessage: `${extractedMessage} is already exists`,
    errorDetails: err,
  };
};

export default handleDuplicateError;
