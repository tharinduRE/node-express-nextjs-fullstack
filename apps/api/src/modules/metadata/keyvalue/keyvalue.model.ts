import mongoose from "mongoose";
import { KeyValue } from "../metadata";

export const KeyValueSchema = new mongoose.Schema<KeyValue<any>>(
  {
    key: {
      type: String,
      required: true,
      uppercase: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

KeyValueSchema.index(
  { key: 1,value : 1},
  {
    collation: {
      locale: "en_US",
      strength: 2,
    },
  }
);

export const KeyValueModel = mongoose.model<KeyValue<any>>("KeyValue", KeyValueSchema,'metadata.keyvalues');

