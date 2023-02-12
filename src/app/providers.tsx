"use client";

import FeedSorterProvider from "@/hooks/FeedSorterProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <FeedSorterProvider>{children}</FeedSorterProvider>;
}
