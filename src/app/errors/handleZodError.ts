/* eslint-disable prefer-const */
import { ZodError, ZodIssue } from "zod";
import { TErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TErrorResponse => {
  let errorMessage: string = "";
  err.issues.forEach((issue: ZodIssue) => {
    errorMessage += `${issue?.path[issue.path.length - 1]} is required. `;
  });

  let errorDetails = err;

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessage,
    errorDetails,
  };
};

export default handleZodError;
