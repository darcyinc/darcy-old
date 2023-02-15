"use client";

import Modal from "@/components/Modal";

import isSpaceOrEnter from "@/utils/isSpaceOrEnter";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import styles from "./index.module.scss";

export interface PostComposerModalProps {
  onOpen?: () => void;
  onClose?: () => void;
}

export default function PostComposerModal({
  onOpen,
  onClose,
}: PostComposerModalProps) {
  const [postContent, setPostContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const autoResize = useCallback(() => {
    if (!textareaRef.current) return;

    if (postContent.length === 0) textareaRef.current.style.height = `50px`;
    else
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [postContent]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPostContent(event.target.value);
    },
    []
  );

  useEffect(() => {
    autoResize();

    if (counterRef.current) {
      counterRef.current.style.color = "inherit";
      if (postContent.length > 220) counterRef.current.style.color = "orange";
      if (postContent.length > 240) counterRef.current.style.color = "tomato";
      if (postContent.length > 260) counterRef.current.style.color = "red";
    }
  }, [autoResize, postContent]);

  return (
    <Modal onClose={onClose} onOpen={onOpen}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <p>Nova publicação</p>
          <AiOutlineClose
            onClick={onClose}
            onKeyDown={(e) => isSpaceOrEnter(e) && onClose?.()}
            role="button"
            tabIndex={0}
          />
        </div>

        <div className={styles.input}>
          <textarea
            placeholder="O que você está pensando?"
            ref={textareaRef}
            value={postContent}
            onChange={handleChange}
          />
          <span ref={counterRef}>{postContent.length}/260</span>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            disabled={postContent.length === 0 || postContent.length > 260}
          >
            Criar publicação
          </button>
          <p className={styles.publishingAs}>
            Publicando como <Link href="/johndoe">@johndoe</Link>
          </p>
        </div>
      </div>
    </Modal>
  );
}
