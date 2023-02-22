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
            alt="Profile banner"
            className={styles.banner}
            decoding="async"
            draggable={false}
            height="175"
            loading="lazy"
            onError={handleImageError}
            src={banner}
            width="600"
          />
        )}
      </div>

      <div
        className={styles.avatarContainer}
        style={{ width: "120px", height: "120px" }}
      >
        {avatar && (
          <img
            alt="Profile avatar"
            className={styles.avatar}
            decoding="async"
            draggable={false}
            height="120"
            loading="lazy"
            onError={handleImageError}
            src={avatar}
            width="120"
          />
        )}
      </div>
    </>
  );
}
