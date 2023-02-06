import mongoose from "mongoose";
import m2s from "mongoose-to-swagger";
import { Product, Product as ProductModel } from "./product";

export const productSchema = new mongoose.Schema<Product>(
  {
    itemId: {
      required: [true, "Item id is required."],
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    listPrice: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductModel>("Product", productSchema);

export default ProductModel;

export const swaggerSchema = {
  Product: m2s(ProductModel, { omitFields: ["_id"] }),
};
