/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import Modal from "@/components/Modal";

import isSpaceOrEnter from "@/utils/isSpaceOrEnter";
import Link from "next/link";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiOutlineClose, AiOutlinePicture } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import styles from "./index.module.scss";

export interface PostComposerModalProps {
  onOpen?: () => void;
  onClose?: () => void;
}

const MAX_FILE_SIZE = 100000000; // 100 MB in bytes

export default function PostComposerModal({
  onOpen,
  onClose,
}: PostComposerModalProps) {
  const [files, setFiles] = useState([] as File[]);

  const handleFileInputChange = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return;
    if (files.length >= 4) return;

    const newFiles = Array.from(uploadedFiles!)
      .slice(0, 4 - files.length)
      .filter((file) => file.size <= MAX_FILE_SIZE);

    // Allow up to 4 files
    setFiles([...files, ...newFiles.slice(0, 4 - files.length)]);
  };

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
    (e: ChangeEvent<HTMLTextAreaElement>) => setPostContent(e.target.value),
    []
  );

  useEffect(() => {
    autoResize();

    // Change counter color based on post content length
    if (counterRef.current) {
      counterRef.current.style.color = "inherit";
      if (postContent.length > 220) counterRef.current.style.color = "orange";
      if (postContent.length > 240) counterRef.current.style.color = "tomato";
      if (postContent.length > 260) counterRef.current.style.color = "red";
    }
  }, [autoResize, postContent]);

  const shouldDisableButton = useMemo(() => {
    if (files.length !== 0 && postContent.length === 0) return false;

    if (postContent.length === 0) return true;
    if (postContent.length > 260) return true;
  }, [files, postContent]);

  return (
    <Modal onClose={onClose} onOpen={onOpen}>
      <div
        className={styles.modalContent}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();

          handleFileInputChange(e.dataTransfer.files);
        }}
      >
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

        <div className={styles.fileUploader}>
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .gif, .mp4, .webm, .mov, .avi"
            id="fileInput"
            multiple
            onChange={(e) => handleFileInputChange(e.target.files)}
            disabled={files.length >= 4}
            style={{ display: "none" }}
          />

          <div className={styles.filesContainer}>
            {files.map((file, index) => (
              <div key={index} className={styles.filePreview}>
                <>
                  <FaTrash
                    onClick={() =>
                      setFiles(files.filter((_, i) => i !== index))
                    }
                    onKeyDown={(e) =>
                      isSpaceOrEnter(e) &&
                      setFiles(files.filter((_, i) => i !== index))
                    }
                    role="button"
                    tabIndex={0}
                  />

                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      draggable={false}
                    />
                  ) : (
                    <video src={URL.createObjectURL(file)} controls />
                  )}
                </>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.buttons}>
            <button type="button" disabled={shouldDisableButton}>
              Criar publicação
            </button>
            <label
              className={styles.fileInputLabel}
              htmlFor="fileInput"
              data-disabled={files.length >= 4}
            >
              <AiOutlinePicture />
            </label>
          </div>

          <p className={styles.publishingAs}>
            Publicando como <Link href="/johndoe">@johndoe</Link>
          </p>
        </div>
      </div>
    </Modal>
  );
}
