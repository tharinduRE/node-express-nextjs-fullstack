import { User } from "../modules/users";
import { generateAuthToken } from "./../modules/auth/auth.service";

const getAccessToken = (user: User) => {
  let accessToken:string;

  beforeAll(async function () {
    accessToken = await generateAuthToken(user);
  });
};

export default getAccessToken;
