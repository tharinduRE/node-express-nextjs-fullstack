import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../common/apiError";
import asyncHandler from "../../middleware/asyncHandler";
import OrderModel from "./order.model";
import { Order } from "./order";
import { PaginatedResults } from "../common/pagination";
import { getDailyOrders, getOrderCountByStatus } from "./order.service";

/**
 *  Create
 */
export const create = asyncHandler(async (req: Request, res: Response) => {
  const order = await new OrderModel({...req.body,userId : req.auth.payload.sub }).save();
  if (order) {
    res.status(httpStatus.CREATED).send(order);
  }
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderModel.findOne({ _id: req.params["orderId"] });
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "order not found");
  }
  res.send(order);
});

export const updateOne = asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(req.params["orderId"]),
    req.body
  );
  res.send(order);
});

export const getAllDailyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await getDailyOrders()
  res.send(orders);
});

export const getOrdersByStatus = asyncHandler(async (req: Request, res: Response) => {
  const orders = await getOrderCountByStatus()
  res.send(orders);
});

export const deleteOne = asyncHandler(async (req: Request, res: Response) => {
  await OrderModel.findOneAndDelete(
    new mongoose.Types.ObjectId(req.params["orderId"])
  );
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Get All
 */
export const getAll = asyncHandler(
  async (req: Request, res: Response<PaginatedResults<Order>>) => {
    const { order, orderBy, filters } = req.query;
    const sortOrder = order == "asc" ? 1 : -1;
    let page = Number(req.query.page || 0);
    let pageSize = Number(req.query.pageSize || 10);

    let filterQuery;
    if (filters) {
      filterQuery = JSON.parse(filters as string);
    }
    // console.log(filterQuery);
    let query = OrderModel.find(filterQuery);

    const data = await query
      .populate(['userId'])
      .sort({ [String(orderBy)]: sortOrder })
      .skip((page + 1 - 1) * pageSize)
      .limit(pageSize)
      .collation({ locale: "en_US", strength: 2 });

    const count = await OrderModel.countDocuments(filterQuery);

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

