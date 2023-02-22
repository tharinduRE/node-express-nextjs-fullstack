import { Schema } from "mongoose";
import { Metadata } from "./metadata";

const AttributeSchema = new Schema<Metadata<String>>({
  key: String,
  value: String,
});

export default function metadataPlugin(schema: Schema) {
  schema.add({
    attributes: [AttributeSchema],
  });

  schema.index({ "attributes.key": 1, "attributes.value ": 1 });
}
