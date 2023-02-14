import mongoose from "mongoose";
import m2s from "mongoose-to-swagger";
import { orderSchema } from "./order.model";

const dailyordersSchema = new mongoose.Schema({
  orders: [orderSchema],
  count: {
    type: Number,
  },
  date: {
    type: String,
  },
});

const DailyOrderModel = mongoose.model(
  "DailyOrder",
  dailyordersSchema,
  "orders.daily"
);

export default DailyOrderModel;

export const swaggerSchema = {
  Order: m2s(DailyOrderModel, { omitFields: ["_id"] }),
};
