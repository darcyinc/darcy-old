"use client";

import { useCallback } from "react";
import styles from "./index.module.scss";

interface ProfileImagesProps {
  avatar?: string;
  banner?: string;
}

export default function ProfileImages({ avatar, banner }: ProfileImagesProps) {
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.remove();
    },
    []
  );

  return (
    <>
      <div
        className={styles.bannerContainer}
        style={{ width: "600px", height: "175px" }}
      >
        {banner && (
          <img
            src={banner}
            alt="Profile banner"
            className={styles.banner}
            draggable={false}
            loading="lazy"
            decoding="async"
            width="600"
            height="175"
            onError={handleImageError}
          />
        )}
      </div>

      <div className={styles.avatarContainer}>
        {avatar && (
          <img
            src={avatar}
            alt="Profile avatar"
            className={styles.avatar}
            draggable={false}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
          />
        )}
      </div>
    </>
  );
}
