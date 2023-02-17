import { body, param, query } from "express-validator";
import { status } from "./order";


export const validation = (method: any) => {
  switch (method) {
    case "updateOne":
    case "save": {
      return [
        body("items").exists().isArray({min : 1}),
        body("status").optional().isIn(status),
        body("userId").exists(),
      ];
    }
    case "getOne":
    case "updateOne":
    case "deleteOne": {
      return [
        param("orderId").exists().isMongoId().withMessage("Invalid Order Id"),
      ];
    }
    case "getAll": {
      return [
        query("order").optional().isString().isIn(['asc', 'desc']).withMessage(`order should be 'asc' or 'desc' `),
        query("orderBy").optional().isString(),
        query("page").optional().isInt(),
        query("pageSize").optional().isInt(),
      ];
    }
    default:
      return [];
  }
};
