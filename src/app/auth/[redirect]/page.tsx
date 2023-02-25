"use client";

import { notFound, useRouter } from "next/navigation";

export default function Redirector({
  params,
}: {
  params: { redirect: string };
}) {
  const router = useRouter();

  switch (params.redirect) {
    case "login":
    case "signin":
      router.push("/auth/sign_in");
      break;
    case "register":
    case "signup":
      router.push("/auth/sign_up");
      break;
    default:
      notFound();
  }
}
