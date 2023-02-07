import { Router } from "express";
import { login } from "./auth.controller";

export const router = Router();

router
  .route("/login")
  .post(login)

export default router;