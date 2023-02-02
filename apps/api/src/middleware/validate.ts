import express from "express";
import { validationResult, ValidationChain } from "express-validator";
import { BAD_REQUEST } from "http-status";

/**
 * 
 * Validation middleware 
 *  - supports parallel processing
 */
export const validate = (validations: ValidationChain[]) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(BAD_REQUEST).json({
      code: BAD_REQUEST,
      message:"Validation Failed",
      errors: errors
        .array()
        .map((e) => ({ [e.param]: e.msg }))
        .reduce((a, c) => Object.assign(a, c), {}),
    });
  };
};
