import { AccountData } from "@/context/AccountProvider";

export default async function getUserFromToken(
  token: string
): Promise<AccountData> {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/@me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return {
    user: json,
    token,
  };
}
