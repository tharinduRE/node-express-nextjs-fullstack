import mongoose from "mongoose";
import m2s from "mongoose-to-swagger";
import { Product, Product as ProductModel } from "./product";

export const productSchema = new mongoose.Schema<Product>(
  {
    itemId: {
      type: String,
    },
    name: {
      type: String,
      required: [true,'required'],
      trim: true,
      text: true,
    },
    description: {
      type: String,
      required:  [true,'required'],
    },
    listPrice: {
      type: Number,
      required:  [true,'required'],
    },
    category: {
      type: String,
      required:  [true,'required'],
    },
    subcategory: {
      type: String,
    },
    slug :{
      type: String,
    }
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
