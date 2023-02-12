"use client";

import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";
import { AccountContext } from "@/hooks/AccountProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const account = useContext(AccountContext);
  const router = useRouter();
  const token = localStorage.getItem("token") ?? account.data.token;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/@me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          localStorage.removeItem("token");
          return router.replace("/login");
        }

        account.setData({
          user: res,
          token,
        });
      });
  }, [account, router, token]);

  if (!account || !token) return router.replace("/login");
  if (typeof window === "undefined") return <></>;

  return (
    <>
      <Navbar active="feed" />
      <Feed />
    </>
  );
}
