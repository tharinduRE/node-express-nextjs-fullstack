import { Router } from "express";
import { paginatedRequest } from "../../../middleware/paginatedRequest";
import { keyTypeController } from "./keytype.controller";
export const router = Router();

router
  .route("/")
  .get(paginatedRequest,keyTypeController.getAll)
  .post(keyTypeController.create);
router
  .route("/:parent/")
  .get(paginatedRequest,keyTypeController.getByParent)

router
  .route("/:id")
  .put(keyTypeController.updateOne)
  .delete(keyTypeController.deleteOne);

export default router;
