"use client";

import { ClickOrKeyboardEvent } from "@/utils/isSpaceOrEnter";
import styles from "./index.module.scss";
import { useCallback, useEffect } from "react";

export interface ModalProps {
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const handleESCOrOutsideClick = useCallback(
    (e: ClickOrKeyboardEvent) => {
      e.preventDefault();

      if (e.type === "keydown" && (e as React.KeyboardEvent).key !== "Escape")
        return;

      onClose?.();
    },
    [onClose]
  );

  // remove window scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className={styles.modalContainer}
      onClick={handleESCOrOutsideClick}
      onKeyDown={handleESCOrOutsideClick}
      role="button"
      tabIndex={0}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === "Escape" && e.stopPropagation()}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}
