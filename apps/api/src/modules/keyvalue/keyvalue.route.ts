import { Router } from "express";
import {
  create,
  deleteOne,
  getAll,
  getOne,
  updateOne,
  validation,
} from "./user.controller";
import { validate } from "../../middleware/validate";

export const router = Router();

router
  .route("/")
  .get(validate(validation("getAll")),getAll)
  .post(validate(validation("save")), create);

router
  .route("/:empId")
  .get(validate(validation("getOne")), getOne)
  .put(validate(validation("updateOne")), updateOne)
  .delete(validate(validation("deleteOne")), deleteOne);

export default router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other employees.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *             example:
 *               first_name: fake name
 *               last_name: fake name
 *               email: fake@example.com
 *               number: 0771234567
 *               gender: M
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *
 *   get:
 *     summary: Get all employees
 *     description: Only admins can retrieve all employees.
 *     tags: [Users]

 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: User role
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of employees
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 */

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get a user
 *     description: Logged in employees can fetch only their own user information. Only admins can fetch other employees.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *
 *   put:
 *     summary: Update a user
 *     description: Logged in employees can only update their own information. Only admins can update other employees.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             $ref: '#/components/schemas/User'
 *         
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *
 *
 *   delete:
 *     summary: Delete a user
 *     description: Logged in employees can delete only themselves. Only admins can delete other employees.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: No content
 */
