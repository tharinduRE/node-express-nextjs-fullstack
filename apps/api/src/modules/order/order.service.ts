import { PipelineStage } from "mongoose";
import DailyOrderModel from "./order.daily.model";
import OrderModel from "./order.model";

export async function getDailyOrders() {
  const pipeline: PipelineStage[] = [
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        count: {
          $sum: 1,
        },
        orders: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $addFields: {
        date: "$_id",
      },
    },
    { $merge: { into: "orders.daily", whenMatched: "replace" } },
  ];

  await OrderModel.aggregate(pipeline);
  return DailyOrderModel.find();
}

export async function getOrderCountByStatus() {
  const pipeline: PipelineStage[] = [
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
  ];

  return OrderModel.aggregate(pipeline);
}
