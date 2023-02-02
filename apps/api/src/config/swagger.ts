import { OAS3Definition } from "swagger-jsdoc";

/**
 *  Swagger Definition
 *
 */
const swagger: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Employee Manager API documentation",
    version: "0.0.1",
    description: "This is a node express mongoose typescript",
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
  // components: { schemas: swaggerSchema },
};

export default swagger;
