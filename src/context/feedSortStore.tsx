import { create } from "zustand";

interface FeedSorterData {
  setSort(_sort: FeedSorterData['sort']): void;
  sort: "newest" | "popular";
}

export const useFeedSorterStore = create<FeedSorterData>((set) => ({
  sort: "popular",
  setSort: (sort) => set({ sort }),
}));