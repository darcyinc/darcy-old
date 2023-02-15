"use client";

import Modal from "@/components/Modal";

import styles from "./index.module.scss";

export interface PostComposerModalProps {
  onOpen?: () => void;
  onClose?: () => void;
}

export default function PostComposerModal({
  onOpen,
  onClose,
}: PostComposerModalProps) {
  return (
    <Modal onClose={onClose} onOpen={onOpen}>
      <input type="text" className={styles.input} />
    </Modal>
  );
}
