import { Request, Response, NextFunction } from 'express';

/**
 * 
 * @param fn Async Function
 * @returns Promise resolving function and catching errors if there's any
 * @description This would wrap any controller function to catch any error at one place.
 */
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default asyncHandler;
