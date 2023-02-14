import express, { Router } from "express";
import docsRoute from "./swagger.route";
import productRoute from "../modules/product/product.route";
import orderRoutes from "../modules/order/order.route";
import userRoutes from "../modules/users/user.route";
import authRoutes from "../modules/auth/auth.route";
import { authenticateJWT } from "../modules/auth/auth.middleware";

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
  public?: boolean;
}

/**
 * Declare routes for all models
 */
const routes: IRoute[] = [
  {
    path: "/orders",
    route: orderRoutes,
  },
  {
    path: "/products",
    route: productRoute,
    public: true,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/docs",
    route: docsRoute,
    public: true,
  },
  {
    path: "/auth",
    route: authRoutes,
    public: true,
  },
];

routes.forEach((route) => {
  route.public
    ? router.use(route.path, route.route)
    : router.use(route.path, route.route);
});

export default router;
