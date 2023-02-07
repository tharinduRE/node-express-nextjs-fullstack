import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import ApiError from "../common/apiError";

export const authenticateJWT = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "accessTokenSecret", (err: any, user: any) => {
      if (err) {
        throw new ApiError(httpStatus.FORBIDDEN,'Forbidden'); 
      }

      req.user = user;
      next();
    });
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED,'Unauthorized'); 
  }
};
