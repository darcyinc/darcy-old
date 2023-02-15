"use client";

import AccountProvider from "@/context/AccountProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AccountProvider>
      {children}
    </AccountProvider>
  );
}
