import { Request, Response } from "express";
import { body, param, query } from "express-validator";
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
  const product = await ProductModel.findOne({ _id: req.params["empId"] });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "product not found");
  }
  res.send(product);
});

export const updateOne = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(req.params["empId"]),
    req.body
  );
  res.send(product);
});

export const deleteOne = asyncHandler(async (req: Request, res: Response) => {
  await ProductModel.findOneAndDelete(
    new mongoose.Types.ObjectId(req.params["empId"])
  );
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Get All
 */
export const getAll = asyncHandler(
  async (req: Request, res: Response<PaginatedResults<Product>>) => {
    const { order, orderBy, filters } = req.query;
    const sortOrder = order == "asc" ? 1 : -1;
    let page = Number(req.query.page || 0);
    let pageSize = Number(req.query.pageSize || 10);

    let filterQuery;
    if (filters) {
      filterQuery = JSON.parse(filters as string);
    }
    // console.log(filterQuery);
    let query = ProductModel.find(filterQuery);

    const data = await query
      .sort({ [String(orderBy)]: sortOrder })
      .skip((page + 1 - 1) * pageSize)
      .limit(pageSize)
      .collation({ locale: "en_US", strength: 2 });

    const count = await ProductModel.countDocuments(filterQuery);

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

export const validation = (method: any) => {
  switch (method) {
    case "updateOne":
    case "save": {
      return [
        // body("email", "invalid email address").exists().isEmail(),
        // body("number").exists().isInt().isMobilePhone("si-LK"),
        // body("gender").exists().isIn(["M", "F"]),
        // body(["first_name",'last_name'])
        //   .exists()
        //   .isAlpha()
        //   .withMessage("must contain only alphabets")
        //   .isLength({ min: 6 })
        //   .withMessage("must be min. 6"),
      ];
    }
    case "getOne":
    case "updateOne":
    case "deleteOne": {
      return [
        param("empId").exists().isMongoId().withMessage("Invalid Product Id"),
      ];
    }
    case "getAll": {
      return [
        query("order").optional().isString().isIn(['asc','desc']).withMessage(`order should be 'asc' or 'desc' `),
        query("orderBy").optional().isString(),
        query("page").optional().isInt(),
        query("pageSize").optional().isInt(),
      ];
    }
    default:
      return [];
  }
};
