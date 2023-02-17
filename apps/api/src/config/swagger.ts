import { OAS3Definition } from "swagger-jsdoc";
import { swaggerSchemas } from "../modules/common/swaggerSchema";

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
