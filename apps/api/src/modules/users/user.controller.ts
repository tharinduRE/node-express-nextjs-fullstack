import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../../errors/ApiError";
import asyncHandler from "../../middleware/asyncHandler";
import UserModel from "./user.model";
import { User } from "./user";
import { PaginatedResults } from "../common/pagination";

/**
 *  Create
 */
export const create = asyncHandler(async (req: Request, res: Response) => {
  const user = await new UserModel(req.body).save();
  if (user) {
    res.status(httpStatus.CREATED).send(user);
  }
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ _id: req.params["id"] });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }
  res.send(user);
});

export const updateOne = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(req.params["id"]),
    req.body,
    { new : true}
  );
  res.send(user);
});

export const deleteOne = asyncHandler(async (req: Request, res: Response) => {
  await UserModel.findOneAndDelete(
    new mongoose.Types.ObjectId(req.params["id"])
  );
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Get All
 */
export const getAll = asyncHandler(
  async (req: Request, res: Response<PaginatedResults<User>>) => {
    const { order, orderBy, filters, q } = req.query;
    const sortOrder = order == "asc" ? 1 : -1;
    let page = Number(req.query.page || 0);
    let pageSize = Number(req.query.pageSize || 10);

    let filterQuery;
    if (filters) {
      filterQuery = JSON.parse(filters as string);
    }
    // console.log(filterQuery);
    let query : mongoose.FilterQuery<User> = filterQuery;

    if (q) {
      query = { $text: { $search: q as string } };
    }

    const data = await UserModel.find(query)
      .sort({ [String(orderBy)]: sortOrder })
      .skip((page + 1 - 1) * pageSize)
      .limit(pageSize)
      .collation({ locale: "en_US", strength: 2 });

    const count = await UserModel.countDocuments(query);

    res.status(httpStatus.OK).json({
      data,
      pagination: {
        count,
        page,
        pageSize,
      },
    });
  }
);
