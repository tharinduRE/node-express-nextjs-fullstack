import { Request } from "express";
import asyncHandler from "../../../middleware/asyncHandler";
import { ModelController } from "../model.controller";
import { KeyTypeModel } from "./keytype.model";

class KeyTypeController extends ModelController<KeyType> {
  constructor() {
    super(KeyTypeModel);
  }

  getByParent = asyncHandler(async (req: Request, res: any, next: any) => {
    req._filterQuery = {
      parent: req.params.parent
    };

    this.getAll(req, res, next);
  });
}

export const keyTypeController = new KeyTypeController();
