import ProfileImages from "@/components/Profile/ProfileImages";
import styles from "./page.module.scss";

export default async function Profile({
  params,
}: {
  params: { handle: string };
}) {
  let username = "";

  username = "Darcy";

  return (
    <div className={styles.container}>
      <section className={styles.profileImages}>
        <ProfileImages avatar="https://via.placeholder.com/150/FFFFFF/FFFFFF" banner="https://via.placeholder.com/600/0000FF/FFFFFF" />
      </section>

      <section className={styles.profileInfo}>
        <div className={styles.main}>
          <h1 className={styles.username}>{username}</h1>
          <span>@{params.handle}</span>
          <p className={styles.bio}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            natus quidem libero ut. Incidunt esse cumque deleniti commodi! Hic
            illum aperiam illo dignissimos ipsam, voluptate iusto beatae dicta
            corrupti veritatis!
          </p>
        </div>

        {/* TODO USER EDIT/BLOCK */}
      </section>

      <section className={styles.profileStats}>
        <div>
          <span>0</span>
          <span>Seguidores</span>
        </div>

        <div>
          <span>0</span>
          <span>Seguindo</span>
        </div>
      </section>
    </div>
  );
}
