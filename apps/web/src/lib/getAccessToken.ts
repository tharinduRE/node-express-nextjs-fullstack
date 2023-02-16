import axios from "axios";
import { API_BASE_URL } from ".";

export async function getAccessToken(user: any) {
  try {
    const res = await axios.post(API_BASE_URL + "/auth/login", user);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
