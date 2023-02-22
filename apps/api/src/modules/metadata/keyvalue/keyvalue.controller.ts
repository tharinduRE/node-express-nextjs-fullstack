import { Request } from "express";
import asyncHandler from "../../../middleware/asyncHandler";
import { ModelController } from "../model.controller";
import { KeyValue } from "../metadata";
import { KeyValueModel } from "./keyvalue.model";

class KeyValueController extends ModelController<KeyValue<any>> {
  constructor() {
    super(KeyValueModel);
  }

  getByKey = asyncHandler(async (req: Request, res: any, next: any) => {
    req._filterQuery = {
      key: req.params.key
    };

    this.getAll(req, res, next);
  });
}

export const keyValueController = new KeyValueController();
