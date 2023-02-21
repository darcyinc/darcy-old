"use client";

import { useCallback } from "react";
import {
  useFeedSorterStore
} from "@/context/feedSortStore";
import type { ClickOrKeyboardEvent } from "@/utils/isSpaceOrEnter";
import isSpaceOrEnter from "@/utils/isSpaceOrEnter";
import styles from "./index.module.scss";

export default function FeedSorter() {
  const sortContext = useFeedSorterStore();
  let friendlyName = "";

  switch (sortContext.sort) {
    case "popular":
      friendlyName = "Populares";
      break;
    case "newest":
      friendlyName = "Novos";
      break;
  }

  // TODO: open menu on click
  const handleSortChange = useCallback(
    (e: ClickOrKeyboardEvent) => {
      if (!isSpaceOrEnter(e)) return;
      sortContext.setSort(friendlyName === "Populares" ? "newest" : "popular");
    },
    [friendlyName, sortContext]
  );

  return (
    <div
      className={styles.feedSorter}
      onClick={handleSortChange}
      onKeyDown={handleSortChange}
      role="button"
      tabIndex={0}
    >
      <span className={styles.sortBy}>Classificar por: </span>
      <span className={styles.state}>{friendlyName}</span>
    </div>
  );
}
