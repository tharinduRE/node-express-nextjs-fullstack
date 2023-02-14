import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../common/apiError";
import asyncHandler from "../../middleware/asyncHandler";
import ProductModel from "./product.model";
import { Product } from "./product";
import { PaginatedResults } from "../common/pagination";

/**
 *  Create
 */
export const create = asyncHandler(async (req: Request, res: Response) => {
  const product = await new ProductModel(req.body).save();
  if (product) {
    res.status(httpStatus.CREATED).send(product);
  }
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductModel.findOne({ _id: req.params["id"] });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "product not found");
  }
  res.send(product);
});

export const getBySlug= asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductModel.findOne({ slug : req.params["slug"] });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "product not found");
  }
  res.send(product);
});

export const updateOne = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(req.params["id"]),
    req.body,
    { new : true}
  );
  res.send(product);
});

export const deleteOne = asyncHandler(async (req: Request, res: Response) => {
  await ProductModel.findOneAndDelete(
    new mongoose.Types.ObjectId(req.params["id"])
  );
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Get All
 */
export const getAll = asyncHandler(
  async (req: Request, res: Response<PaginatedResults<Product>>) => {
    const { order, orderBy, filters, q } = req.query;
    const sortOrder = order == "asc" ? 1 : -1;
    let page = Number(req.query.page || 0);
    let pageSize = Number(req.query.pageSize || 10);

    let filterQuery;
    if (filters) {
      filterQuery = JSON.parse(filters as string);
    }
    let query : mongoose.FilterQuery<Product> = filterQuery;
    
    if (q) {
      query = { $text: { $search: q as string } };
    }
    
    // console.log(query);
    const data = await ProductModel.find(query)
      .sort({ [String(orderBy)]: sortOrder })
      .skip((page + 1 - 1) * pageSize)
      .limit(pageSize)
      .collation({ locale: "en_US", strength: 2 });

    const count = await ProductModel.countDocuments(query);
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
