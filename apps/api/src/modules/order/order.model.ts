import mongoose from "mongoose";
import m2s from "mongoose-to-swagger";
import { productSchema } from "../product/product.model";
import { Order, Order as OrderModel } from "./order";

const orderSchema = new mongoose.Schema<Order>(
  {
    items: [productSchema],
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<OrderModel>("Order", orderSchema);

export default OrderModel;

export const swaggerSchema = {
  Order: m2s(OrderModel, { omitFields: ["_id"] }),
};
