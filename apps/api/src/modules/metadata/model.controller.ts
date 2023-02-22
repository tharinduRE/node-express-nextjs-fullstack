import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import asyncHandler from "../../middleware/asyncHandler";
import { PaginatedResults } from "../common/pagination";

/**
 * 
 */
export class ModelController<T> {
  model: mongoose.Model<any>;
  constructor(model: mongoose.Model<any>) {
    this.model = model;
  }

  create = asyncHandler(async (req: Request, res: Response) => {
    const product = await new this.model(req.body).save();
    if (product) {
      res.status(httpStatus.CREATED).send(product);
    }
  });

  updateOne = asyncHandler(async (req: Request, res: Response) => {
    const product = await this.model.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.params["id"]),
      req.body,
      { new: true }
    );
    res.send(product);
  });

  deleteOne = asyncHandler(async (req: Request, res: Response) => {
    await this.model.findOneAndDelete(
      new mongoose.Types.ObjectId(req.params["id"])
    );
    res.status(httpStatus.NO_CONTENT).send();
  });

  getAll = asyncHandler(
    async (req: Request, res: Response<PaginatedResults<T>>) => {
      const { page, pageSize, sortOrder, sortBy } = req._pagination;
      let query: mongoose.FilterQuery<T> = req._filterQuery;

      // console.log(query);
      const data = await this.model
        .find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(page * pageSize)
        .limit(pageSize)
        .collation({ locale: "en_US", strength: 2 });

      const count = await this.model.countDocuments(query);
      res.status(httpStatus.OK).json({
        data,
        pagination: {
          count,
          page,
          pageSize
        }
      });
    }
  );
}
