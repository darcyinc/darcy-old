"use client";

import AccountProvider from "@/hooks/AccountProvider";
import FeedSorterProvider from "@/hooks/FeedSorterProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AccountProvider>
      <FeedSorterProvider>{children}</FeedSorterProvider>
    </AccountProvider>
  );
}
