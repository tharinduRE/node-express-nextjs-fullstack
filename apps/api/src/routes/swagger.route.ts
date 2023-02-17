import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swagger from "../config/swagger";
const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition: swagger,
  apis: ["dist/modules/**/*.route.js"],
});

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: false,
    swaggerOptions: {
      docExpansion:"list"
    }
  })
);

export default router;
