"use client";

import { AccountContext } from "@/hooks/AccountProvider";
import getUserFromToken from "@/utils/getUserFromToken";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export interface ValidUserCheckProps {
  redirectToIfLogged?: string;
  redirectToIfNotLogged?: string;
}

export default function ValidUserCheck({
  redirectToIfLogged,
  redirectToIfNotLogged,
}: ValidUserCheckProps) {
  const account = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    const currentToken = localStorage.getItem("token") ?? account.data?.token;
    if (!currentToken) {
      if (redirectToIfNotLogged) router.replace(redirectToIfNotLogged);
      return;
    }

    getUserFromToken(currentToken)
      .then((d) => {
        account.setData(d);
        if (redirectToIfLogged) router.replace(redirectToIfLogged);
      })
      .catch(() => {
        localStorage.removeItem("token");
        account.setData({});
        if (redirectToIfNotLogged) router.replace(redirectToIfNotLogged);
        return;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps -- Prevent infinite re-render
  }, []);

  return <></>;
}
