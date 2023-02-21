"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import getUserFromToken from "@/api/getUserFromToken";
import { useAccountStore } from "@/context/accountStore";

export interface ValidUserCheckProps {
  redirectToIfLogged?: string;
  redirectToIfNotLogged?: string;
}

export default function ValidUserCheck({
  redirectToIfLogged,
  redirectToIfNotLogged,
}: ValidUserCheckProps) {
  const account = useAccountStore();
  const router = useRouter();

  let currentToken = "";

  useEffect(() => {
    if (!currentToken) return;

    getUserFromToken(currentToken)
      .then((d) => {
        account.setData(d);
        if (redirectToIfLogged) router.replace(redirectToIfLogged);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage"));
        account.setData({});
        if (redirectToIfNotLogged) router.replace(redirectToIfNotLogged);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeof window !== "undefined") {
    currentToken = localStorage.getItem("token") ?? account.data?.token ?? "";
  }

  if (!currentToken && redirectToIfNotLogged) {
    router.replace(redirectToIfNotLogged);
    return null;
  }

  return null;
}
