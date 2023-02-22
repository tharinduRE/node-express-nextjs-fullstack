import * as jose from "jose";
import { User } from "../users";

const secret = new TextEncoder().encode(
  "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
);

export const generateAuthToken = async(user: User) => {
  const { _id, email, id, role } = user;

  return await new jose.SignJWT({ user: { email, id, role } })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("urn:expressapi:issuer")
    .setAudience("urn:expressapi:audience")
    .setExpirationTime("24h")
    .setSubject(_id)
    .sign(secret);
};