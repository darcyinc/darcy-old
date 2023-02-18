import type { AccountData } from "@/context/AccountProvider";
import { axios } from "./axios";

export default async function getUserFromToken(
  token: string
): Promise<AccountData> {
  const req = await axios.get("/users/@me");

  if (req.data.errors) {
    throw new Error(req.data.errors[0].message);
  }

  return {
    user: req.data,
    token,
  };
}
