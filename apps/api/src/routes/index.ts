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
}

/**
 * Declare routes for all models
 */
const protectedRoutes: IRoute[] = [
  {
    path: "/orders",
    route: orderRoutes,
  },
  {
    path: "/products",
    route: productRoute,
  },
  {
    path: "/users",
    route: userRoutes,
  },
];

protectedRoutes.forEach((route) => {
  router.use(route.path, authenticateJWT, route.route);
});


const publicRoutes: IRoute[] = [
  {
    path: "/docs",
    route: docsRoute,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
];

publicRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
