"use client";

import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";
import { AccountContext } from "@/hooks/AccountProvider";
import getUserFromToken from "@/utils/getUserFromToken";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  if (typeof window === "undefined") return <></>;

  const account = useContext(AccountContext);
  const router = useRouter();
  const token = localStorage.getItem("token") ?? account.data.token;

  useEffect(() => {
    if (!token) return;

    getUserFromToken(token, (err, user) => {
      if (err || !user) {
        localStorage.removeItem("token");
        account.setData({});
        return router.replace("/login");
      }

      account.setData(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Prevent infinite re-render
  }, [token]);

  if (!account || !token) {
    router.replace("/login");
    return;
  }

  return (
    <>
      <Navbar active="feed" />
      <Feed />
    </>
  );
}
