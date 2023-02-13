"use client";

import AccountProvider from "@/hooks/AccountProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AccountProvider>
      {children}
    </AccountProvider>
  );
}
