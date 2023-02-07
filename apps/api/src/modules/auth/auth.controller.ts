import httpStatus from "http-status";
import asyncHandler from "../../middleware/asyncHandler";
import UserModel from "../users/user.model";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  let user;
  user = await UserModel.findOne({ email });
  if (!user) {
    user = await new UserModel(req.body).save();
  }

  if (user) {
    const accessToken = jwt.sign(user.toJSON(), "accessTokenSecret");
    res.status(httpStatus.OK).json(accessToken);
  }
});
