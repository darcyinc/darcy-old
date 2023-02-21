import styles from "./page.module.scss";

export default function Profile({ params }: { params: { username: string } }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <section className={styles.profileImages}>
          {/* 1270x720 placeholder */}
          <img
            src="https://via.placeholder.com/500x220"
            alt="Profile banner"
            className={styles.banner}
          />
          {/* 300x300 placeholder */}
          <img
            src="https://via.placeholder.com/120"
            alt="Profile avatar"
            className={styles.avatar}
          />
        </section>
      </header>
    </div>
  );
}
