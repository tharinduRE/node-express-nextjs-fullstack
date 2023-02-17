import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { ProductSchema } from "../product/product.model";
import { Order, Order as OrderModel, status } from "./order";

export const orderSchema = new mongoose.Schema<Order>(
  {
    orderNo: {
      type: String,
      default: faker.random.numeric(9, { allowLeadingZeros: true }),
    },
    items: [
      {
        product: ProductSchema,
        quantity: Number,
      },
    ],
    amount: {
      type: Number,
    },
    userId: {
      type: String,
      required: [true, "required"],
      ref: "User",
    },
    status: {
      type: String,
      default: "NEW",
      enum: status,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", async function (next) {
  this.amount =
    this.items?.reduce((a, c) => c.product.listPrice * c.quantity, 0) || 0;
  next();
});

const OrderModel = mongoose.model<OrderModel>("Order", orderSchema);

export default OrderModel;
