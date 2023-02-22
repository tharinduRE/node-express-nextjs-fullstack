import httpStatus from "http-status";
import ApiError from "./ApiError";

export class UnauthorizedError extends ApiError {
  constructor(message?: string) {
    super(httpStatus.UNAUTHORIZED, message || "Unauthorized");
  }
}

export class ForbidddenError extends ApiError {
  constructor() {
    super(httpStatus.FORBIDDEN, "Forbidden");
  }
}

export class InvalidRequestError extends ApiError {
  constructor(message?: string) {
    super(httpStatus.BAD_REQUEST, message || "Invalid Request");
  }
}
