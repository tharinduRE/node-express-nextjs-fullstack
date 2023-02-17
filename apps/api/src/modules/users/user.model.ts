import mongoose from "mongoose";
import { User, User as UserModel } from "./user";

export const UserSchema = new mongoose.Schema<User>(
  {
    id: {
      type: String,
      required: [true, "required"],
    },
    name: {
      type: String,
      text: true,
    },
    email: {
      type: String,
      required: [true, "required"],
    },
    provider: {
      type: String,
      required: [true, "required"],
    },
    role: {
      type: String,
      required: [true, "required"],

      default: "USER",
      enum: ["ADMIN", "USER"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserModel>("User", UserSchema);

export default UserModel;
