import { FeedSorterContext } from "@/hooks/FeedSorterProvider";
import isSpaceOrEnter, { ClickOrKeyboardEvent } from "@/utils/isSpaceOrEnter";
import { useContext } from "react";

import styles from "./index.module.scss";

export default function FeedSorter() {
  const sortContext = useContext(FeedSorterContext);
  let friendlyName = "";

  switch (sortContext.data) {
    case "popular":
      friendlyName = "Populares";
      break;
    case "new":
      friendlyName = "Novos";
      break;
  }

  // TODO: open menu on click
  const handleSortChange = (e: ClickOrKeyboardEvent) => {
    if (!isSpaceOrEnter(e)) return;
    sortContext.setData(friendlyName === "Populares" ? "new" : "popular");
  };

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
