import express, { Router } from "express";
import docsRoute from "../modules/common/swagger";
import productRoute from "../modules/product/product.route";
import orderRoutes from "../modules/order/order.route";
import userRoutes from "../modules/users/user.route";
import authRoutes from "../modules/auth/auth.route";
import { authenticateJWT } from "../modules/auth/auth.middleware";
import { keytypeRoutes, keyvalueRoutes } from "../modules/metadata";

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
    path: "/metadata/keytypes",
    route: keytypeRoutes,
    public: true,
  },
  {
    path: "/metadata/keyvalues",
    route: keyvalueRoutes,
    public: true,
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
    : router.use(route.path, authenticateJWT, route.route);
});

export default router;
