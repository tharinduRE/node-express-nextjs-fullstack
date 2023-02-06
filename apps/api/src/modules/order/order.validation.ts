import { param, query } from "express-validator";


export const validation = (method: any) => {
  switch (method) {
    case "updateOne":
    case "save": {
      return [
        // body("email", "invalid email address").exists().isEmail(),
        // body("number").exists().isInt().isMobilePhone("si-LK"),
        // body("gender").exists().isIn(["M", "F"]),
        // body(["first_name",'last_name'])
        //   .exists()
        //   .isAlpha()
        //   .withMessage("must contain only alphabets")
        //   .isLength({ min: 6 })
        //   .withMessage("must be min. 6"),
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
