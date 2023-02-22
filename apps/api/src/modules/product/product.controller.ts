import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../../errors/ApiError";
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
    const {page,pageSize,sortOrder,sortBy } = req._pagination 
    let query = req._filterQuery 
    
    if (req.query.q) {
      query = { $text: { $search: req.query.q as string } };
    }
    
    // console.log(query);
    const data = await ProductModel
      .find(query)
      .sort({ [sortBy] : sortOrder })
      .skip(page * pageSize)
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
