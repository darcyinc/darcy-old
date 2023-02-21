import { axios } from "./axios";

export default async function doUserLogin(data: {
  email: string;
  password: string;
}) {
  const req = await axios.post("/auth/users", data);

  return req.data;
}
