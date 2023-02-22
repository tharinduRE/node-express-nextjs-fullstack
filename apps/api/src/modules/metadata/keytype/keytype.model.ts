import mongoose from "mongoose";
import { KeyType } from "../metadata";

export const KeyTypeSchema = new mongoose.Schema<KeyType>(
  {
    name: {
      type: String,
      required: true,
      uppercase : true,
    },
    description: {
      type: String,
    },
    parent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

KeyTypeSchema.pre("save", async function (next) {
  this.description = this.name.toLowerCase();
  next();
});

KeyTypeSchema.index(
  { name: 1, parent: 1 },
  {
    collation: {
      locale: "en_US",
      strength: 2,
    },
  }
);

export const KeyTypeModel = mongoose.model<KeyType>(
  "KeyType",
  KeyTypeSchema,
  "metadata.keytypes"
);
