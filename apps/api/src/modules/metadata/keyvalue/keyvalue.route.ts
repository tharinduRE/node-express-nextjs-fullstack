import { Router } from "express";
import { paginatedRequest } from "../../../middleware/paginatedRequest";
import { keyValueController } from "./keyvalue.controller";

export const router = Router();
router
  .route("/")
  .get(paginatedRequest,keyValueController.getAll)
  .post(keyValueController.create);

router
  .route("/:key")
  .get(paginatedRequest,keyValueController.getByKey)

router
  .route("/:id")
  .put(keyValueController.updateOne)
  .delete(keyValueController.deleteOne);

export default router;
