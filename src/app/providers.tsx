"use client";

import AccountProvider from "@/context/AccountProvider";
import FeedSorterProvider from "@/context/FeedSorterProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AccountProvider>
      <FeedSorterProvider>{children}</FeedSorterProvider>
    </AccountProvider>
  );
}
