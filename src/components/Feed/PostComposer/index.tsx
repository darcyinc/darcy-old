"use client";

import isSpaceOrEnter, { ClickOrKeyboardEvent } from "@/utils/isSpaceOrEnter";
import { useState } from "react";
import PostComposerModal from "./PostComposerModal";
import styles from "./index.module.scss";

export default function PostComposer() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModal = (e: ClickOrKeyboardEvent) => {
    e.preventDefault();

    if (!isSpaceOrEnter(e)) return;

    setModalOpen(true);
  };

  return (
    <div className={styles.composer}>
      {isModalOpen ? (
        <PostComposerModal onClose={() => setModalOpen(false)} />
      ) : null}

      <img
        src="https://via.placeholder.com/150"
        alt="User avatar"
        height="60"
        width="60"
      />
      <div
        className={styles.fakeInput}
        onClick={handleModal}
        onKeyDown={handleModal}
        role="button"
        tabIndex={0}
      >
        <p>Começar publicação</p>
      </div>
    </div>
  );
}
