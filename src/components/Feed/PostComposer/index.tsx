"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AiOutlineSend } from "react-icons/ai";
import { MdAddPhotoAlternate } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

import isSpaceOrEnter from "@/utils/isSpaceOrEnter";
import { FaTrash } from "react-icons/fa";

import styles from "./index.module.scss";

const MAX_FILE_SIZE = 100000000; // 100 MB in bytes

export default function PostComposer() {
  const [files, setFiles] = useState([] as File[]);
  const [postContent, setPostContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const autoResize = useCallback(() => {
    if (!textareaRef.current) return;

    if (postContent.length === 0) textareaRef.current.style.height = `40px`;
    else
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [postContent]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setPostContent(e.target.value),
    []
  );

  const handleFileInputChange = useCallback(
    (uploadedFiles: FileList | null) => {
      if (!uploadedFiles) return;
      if (files.length >= 4) return;

      const newFiles = Array.from(uploadedFiles!)
        .slice(0, 4 - files.length)
        .filter((file) => file.size <= MAX_FILE_SIZE);

      // Allow up to 4 files
      setFiles([...files, ...newFiles.slice(0, 4 - files.length)]);
    },
    [files]
  );

  useEffect(() => {
    autoResize();

    // Change counter color based on post content length
    if (counterRef.current) {
      counterRef.current.style.color = "inherit";
      if (postContent.length > 200) counterRef.current.style.color = "yellow";
      if (postContent.length > 220) counterRef.current.style.color = "orange";
      if (postContent.length > 240) counterRef.current.style.color = "tomato";
      if (postContent.length > 260) counterRef.current.style.color = "red";
    }
  }, [postContent, autoResize]);

  const handlePrivacyChange = useCallback(() => {}, []);

  const shouldDisableButton = useMemo(() => {
    if (files.length !== 0 && postContent.length === 0) return false;

    if (postContent.length === 0) return true;
    if (postContent.length > 260) return true;

    return false;
  }, [files, postContent]);

  const handleImageDelete = useCallback((index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);

  return (
    <div className={styles.composer}>
      <div className={styles.header}>
        <div className={styles.main}>
          <img
            src="https://via.placeholder.com/150"
            alt="User avatar"
            height="60"
            width="60"
          />
          <textarea
            placeholder="O que você está pensando?"
            ref={textareaRef}
            value={postContent}
            onChange={handleChange}
          />
        </div>

        <span ref={counterRef}>{postContent.length}/260</span>
      </div>

      <div className={styles.footer}>
        <div className={styles.options}>
          <div
            className={styles.privacy}
            onClick={handlePrivacyChange}
            onKeyDown={handlePrivacyChange}
            role="button"
            tabIndex={0}
          >
            <TbWorld />
            <span>Todos podem responder</span>
          </div>

          <input
            type="file"
            accept=".png, .jpg, .jpeg, .gif, .mp4, .webm, .mov, .avi"
            id="fileInput"
            multiple
            onChange={(e) => handleFileInputChange(e.target.files)}
            // Clear input value so the same file can be uploaded again
            onClick={(e) => (e.currentTarget.value = "")}
            disabled={files.length >= 4}
            style={{ display: "none", visibility: "hidden" }}
          />

          <label htmlFor="fileInput">
            <MdAddPhotoAlternate data-disabled={files.length >= 4} />
          </label>
        </div>

        <button className={styles.send} disabled={shouldDisableButton}>
          <AiOutlineSend />
        </button>
      </div>

      {files.length !== 0 && (
        <div className={styles.filesContainer}>
          {files.map((file, index) => (
            <div key={file.name} className={styles.filePreview}>
              <FaTrash
                onClick={() => handleImageDelete(index)}
                onKeyDown={(e) => isSpaceOrEnter(e) && handleImageDelete(index)}
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
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={URL.createObjectURL(file)} controls />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
