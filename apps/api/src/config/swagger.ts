import { OAS3Definition } from "swagger-jsdoc";
import m2s from "mongoose-to-swagger";

/**
 * Import all modules here
 */
import OrderModel from "../modules/order/order.model";
import ProductModel from "../modules/product/product.model";
import UserModel from "../modules/users/user.model";

const omitFields = { omitFields: ["_id", "createdAt", "updatedAt"] };

const swaggerSchemas = {
  Product: m2s(ProductModel, omitFields),
  Order: m2s(OrderModel, omitFields),
  User: m2s(UserModel, omitFields),
};


/**
 *  Swagger Definition
 *
 */
const swagger: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Shopping App API documentation",
    version: "0.0.1",
    description: "This is a node express mongoose typescript API",
    license: {
      name: "MIT",
    },
  },
  servers: [
    {
      url: `/api/v1/`,
      description: "Express Server",
    },
  ],
  components: {
    schemas: swaggerSchemas,
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export default swagger;
