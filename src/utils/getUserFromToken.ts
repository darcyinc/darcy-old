import { AccountData } from "@/hooks/AccountProvider";

export default function getUserFromToken(
  token: string,
  callback: (_err: any, _context?: AccountData) => void
) {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/@me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        callback(res.errors);
        return;
      }

      callback(null, {
        user: res,
        token,
      });
    });
}
