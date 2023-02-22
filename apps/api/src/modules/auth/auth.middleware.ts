import { NextFunction, Request, Response } from "express";
import * as jose from "jose";
import { UnauthorizedError } from "../../errors/errors";
import getToken from "./getToken";

const secret = new TextEncoder().encode(
  "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
);

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  try {
    const token = getToken(req.headers);

    const { payload } = await jose.jwtVerify(token, secret, {
      issuer: "urn:expressapi:issuer",
      audience: "urn:expressapi:audience",
    });

    req.auth = {
      token,
      payload,
    };
    next();
  } catch (error: any) {
    next(new UnauthorizedError());
  }
};
