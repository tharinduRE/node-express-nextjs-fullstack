import httpStatus from "http-status";
import asyncHandler from "../../middleware/asyncHandler";
import UserModel from "../users/user.model";
import { Request, Response } from "express";
import * as jose from "jose";

const secret = new TextEncoder().encode(
  "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
);

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  let user;
  user = await UserModel.findOne({ email });
  if (!user) {
    user = await new UserModel(req.body).save();
  }

  if (user) {
    const { email, id, provider } = user;
    const jwt = await new jose.SignJWT({ user: { email, id, provider } })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("urn:expressapi:issuer")
      .setAudience("urn:expressapi:audience")
      .setExpirationTime("24h")
      .setSubject(user._id)
      .sign(secret);

    res.status(httpStatus.OK).json(jwt);
  }
});
