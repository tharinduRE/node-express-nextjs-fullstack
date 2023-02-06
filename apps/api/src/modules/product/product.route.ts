import { Router } from "express";
import {
  create,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./product.controller";
import { validation } from "./product.validation";
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
 *   name: Products
 *   description: Product management and retrieval
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a product
 *     description: Only admins can create other employees.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
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
 *                $ref: '#/components/schemas/Product'
 *
 *   get:
 *     summary: Get all employees
 *     description: Only admins can retrieve all employees.
 *     tags: [Products]

 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Product role
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
 *                     $ref: '#/components/schemas/Product'
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
 *     summary: Get a product
 *     description: Logged in employees can fetch only their own product information. Only admins can fetch other employees.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *
 *   put:
 *     summary: Update a product
 *     description: Logged in employees can only update their own information. Only admins can update other employees.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             $ref: '#/components/schemas/Product'
 *         
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *
 *
 *   delete:
 *     summary: Delete a product
 *     description: Logged in employees can delete only themselves. Only admins can delete other employees.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     responses:
 *       "200":
 *         description: No content
 */
