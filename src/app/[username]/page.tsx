import styles from "./page.module.scss";

export default function Profile({ params }: { params: { username: string } }) {
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
        <h1 className={styles.username}>{params.username}</h1>
        <span>@{params.username}</span>
        <p className={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        </p>
      </section>
    </div>
  );
}
