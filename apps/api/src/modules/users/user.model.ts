import { slugify } from "./../common/utils";
import mongoose from "mongoose";
import m2s from "mongoose-to-swagger";
import { User, User as UserModel } from "./user";

export const UserSchema = new mongoose.Schema<User>(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      text: true,
    },
    email: {
      type: String,
    },
    provider: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserModel>("User", UserSchema);

export default UserModel;

export const swaggerSchema = {
  User: m2s(UserModel, { omitFields: ["_id"] }),
};
