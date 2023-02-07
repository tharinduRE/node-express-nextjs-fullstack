import mongoose from "mongoose";
import m2s from "mongoose-to-swagger";
import { ProductSchema } from "../product/product.model";
import { Order, Order as OrderModel } from "./order";

const orderSchema = new mongoose.Schema<Order>(
  {
    items: [{ product: ProductSchema, quantity: Number }],
    amount: {
      type: Number,
    },
    userId: {
      type: String,
      ref: 'User'
    },
    status: {
      type: String,
      default : 'NEW',
      enum: ["NEW", "PENDING", "PROCESSING", "SHIPPED", "COMPLETED" , 'CANCELLED'],
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
