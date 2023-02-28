import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import httpStatus from "http-status";
import config from "../config/config";

export default function ErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  let { statusCode, message , errors} = err;
  res.locals["errorMessage"] = err.message;
  
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = "Internal Server Error";
  }
  
  if(err instanceof mongoose.mongo.MongoServerError){
    if(err.code === 11000){
      message = `${Object.keys(err.keyValue)} already exists`;
      statusCode = httpStatus.BAD_REQUEST;
    }
  }

  if (err instanceof mongoose.Error.ValidationError) {
    let errMsg = Object.fromEntries(Object.entries(err.errors).map(([k, v]) => ([k, v.message])));
    message = 'Validation Error';
    errors = errMsg;
    statusCode = httpStatus.BAD_REQUEST;
  }

  const response = {
    code: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    message,
    errors
  };

  res.status(response.code).json(response);
}
