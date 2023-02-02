import mongoose from "mongoose";
import m2s from "mongoose-to-swagger";
import { User as UserModel } from "./user";

// @ts-ignore
const employeeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      // required: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    number: {
      type: String,
      required: true,
      minlength: 8,
    },
    gender: {
      type: String,
      enum: ["M", "F"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserModel>("User", employeeSchema);

export default UserModel;

export const swaggerSchema = {
  User: m2s(UserModel, { omitFields: ["_id"] }),
};
