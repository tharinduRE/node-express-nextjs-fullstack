import { Router } from "express";
import {
  create,
  deleteOne,
  getAll,
  getAllDailyOrders,
  getOne,
  getOrdersByStatus,
  updateOne,
} from "./order.controller";
import { validation } from "./order.validation";
import { validate } from "../../middleware/validate";

export const router = Router();

router
  .route("/")
  .get(validate(validation("getAll")),getAll)
  .post(validate(validation("save")), create);

router
  .route("/getdailyorders")
  .get(getAllDailyOrders)

router
  .route("/getordersbystatus")
  .get(getOrdersByStatus)

router
  .route("/:orderId")
  .get(validate(validation("getOne")), getOne)
  .put(validate(validation("updateOne")), updateOne)
  .delete(validate(validation("deleteOne")), deleteOne);

export default router;

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and retrieval
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a order
 *     description: Only admins can create other orders.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
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
 *                $ref: '#/components/schemas/Order'
 *
 *   get:
 *     summary: Get all orders
 *     description: Only admins can retrieve all orders.
 *     tags: [Orders]

 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Order role
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
 *         description: Maximum number of orders
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
 *                     $ref: '#/components/schemas/Order'
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
 * /orders/{id}:
 *   get:
 *     summary: Get a order
 *     description: Logged in orders can fetch only their own order information. Only admins can fetch other orders.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Order'
 *
 *   put:
 *     summary: Update a order
 *     description: Logged in orders can only update their own information. Only admins can update other orders.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             $ref: '#/components/schemas/Order'
 *         
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Order'
 *
 *
 *   delete:
 *     summary: Delete a order
 *     description: Logged in orders can delete only themselves. Only admins can delete other orders.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order id
 *     responses:
 *       "200":
 *         description: No content
 */
