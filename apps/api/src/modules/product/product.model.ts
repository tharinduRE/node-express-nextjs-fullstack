import { slugify } from "./../common/utils";
import mongoose from "mongoose";
import { Product, Product as ProductModel } from "./product";
import { faker } from "@faker-js/faker";

export const ProductSchema = new mongoose.Schema<Product>(
  {
    itemId: {
      type: String,
      default : faker.random.numeric(6, { allowLeadingZeros: true })
    },
    name: {
      type: String,
      required: [true, "required"],
      trim: true,
      text: true,
    },
    description: {
      type: String,
      required: [true, "required"],
    },
    listPrice: {
      type: Number,
      required: [true, "required"],
    },
    category: {
      type: String,
      required: [true, "required"],
    },
    subcategory: {
      type: String,
    },
    slug: {
      type: String,
    },
    active: {
      type: Boolean,
      default : false,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index(
  { category: 1 },
  {
    collation: {
      locale: "en_US",
      strength: 2,
    },
  }
);

ProductSchema.pre("save", async function (next) {
  this.slug = slugify(this.name);
  next();
});

ProductSchema.pre("insertMany", async function (next, docs) {
  if (Array.isArray(docs) && docs.length) {
    for (const doc of docs) {
      doc.slug = slugify(doc.name);
    }
    next();
  }
});

const ProductModel = mongoose.model<ProductModel>("Product", ProductSchema);

export default ProductModel;