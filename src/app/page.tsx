"use client";

import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";
import FeedSorterProvider from "@/hooks/FeedSorterProvider";

export default function Home() {
  if (typeof window === "undefined") return;

  return (
    <FeedSorterProvider>
      <Navbar />
      <Feed />
    </FeedSorterProvider>
  );
}
