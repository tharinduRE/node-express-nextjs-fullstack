import m2s from "mongoose-to-swagger";

import OrderModel from "../order/order.model";
import ProductModel from "../product/product.model";
import UserModel from "../users/user.model";

const omitFields = { omitFields: ["_id", "createdAt", "updatedAt"] };

export const swaggerSchemas = {
  Product: m2s(ProductModel, omitFields),
  Order: m2s(OrderModel, omitFields),
  User: m2s(UserModel, omitFields),
};
