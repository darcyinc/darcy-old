"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function Profile({ params }: { params: { handle: string } }) {
  const [username, setUsername] = useState<string | null>(null);
  const [biography, setBiography] = useState<string | null>(null);

  useEffect(() => {
    setUsername("Darcy");
    setBiography("A social media platform for everyone.");
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <section className={styles.profileImages}>
          <img
            src="https://via.placeholder.com/500x220"
            alt="Profile banner"
            className={styles.banner}
            draggable={false}
            loading="lazy"
            decoding="async"
          />

          <img
            src="https://via.placeholder.com/120"
            alt="Profile avatar"
            className={styles.avatar}
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </section>
      </header>

      <section className={styles.content}>
        <h1 className={styles.username}>{username}</h1>
        <span>@{params.handle}</span>
        <p className={styles.bio}>{biography}</p>
      </section>
    </div>
  );
}
