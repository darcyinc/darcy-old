"use client";

import styles from "./index.module.scss";

export default function PostComposer() {
  return (
    <div className={styles.composer}>
      <img
        src="https://via.placeholder.com/150"
        alt="User avatar"
        height="60"
        width="60"
      />
      <div className={styles.fakeInput}>
        <p>Começar publicação</p>
      </div>
    </div>
  );
}
