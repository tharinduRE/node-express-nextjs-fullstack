import { body, param, query } from "express-validator";
import * as controllerFns from "./auth.controller";

export const validation = (method: any) => {
  switch (method) {
    case "login":
      return [
        body("id").exists(),
        body("email").exists().isEmail(),
        body("provider").exists().isIn(["github"]),
      ];
    default:
      return [];
  }
};
