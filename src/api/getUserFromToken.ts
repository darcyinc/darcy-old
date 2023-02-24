import type { AccountData } from "@/context/accountStore";
import { axios } from "./axios";

export default async function getUserFromToken(): Promise<AccountData> {
  const req = await axios.get("/users/@me");

  if (req.data.errors) {
    throw new Error(req.data.errors[0].message);
  }

  return req.data;
}
