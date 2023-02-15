/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
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
    (e: ClickOrKeyboardEvent | KeyboardEvent) => {
      if (e.type === "keydown" && (e as React.KeyboardEvent).key !== "Escape")
        return;

      onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    // remove window scroll
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleESCOrOutsideClick);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleESCOrOutsideClick);
    };
  }, [handleESCOrOutsideClick]);

  return (
    <div className={styles.modalContainer} onClick={handleESCOrOutsideClick}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
