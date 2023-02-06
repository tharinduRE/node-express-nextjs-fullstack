import express, { Router } from "express";
import docsRoute from "./swagger.route";
import productRoute from "../modules/product/product.route";
import orderRoutes from "../modules/order/order.route";

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

/**
 * Declare routes for all models
 */
const defaultIRoute: IRoute[] = [
  {
    path: "/orders",
    route: orderRoutes,
  },
  {
    path: "/products",
    route: productRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

// if (config.env === "development" || config.env === "production") {
  router.use("/docs", docsRoute);
// }

export default router;
