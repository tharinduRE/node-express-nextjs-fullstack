import { Router } from "express";
import { validate } from "../../middleware/validate";
import { login } from "./auth.controller";
import { validation } from "./auth.validation";

export const router = Router();

router
  .route("/login")
  .post(validate(validation('login')),login)

export default router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: login and get access token
 *     description: Only admins can create other users.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *     responses:
 *       "201":
 *         description: Created
 */