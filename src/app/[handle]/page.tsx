import { notFound } from "next/navigation";
import ProfileImages from "@/components/Profile/ProfileImages";
import styles from "./page.module.scss";

interface UserResponse {
  errors?: [
    {
      message: string;
    }
  ];
  user: {
    avatar: string;
    bio: string;
    handle: string;
    name: string;
  };
}

async function fetchUser(handle: string) {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${handle}`
    );
    const data = (await req.json()) as UserResponse;

    if (data.errors) return;

    return data;
  } catch {
    return undefined;
  }
}

export default async function Profile({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = params;

  const data = await fetchUser(handle);
  if (!data) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <section className={styles.profileImages}>
        <ProfileImages
          avatar={data.user.avatar}
          banner="https://via.placeholder.com/600x175/0000FF/FFFFFF"
        />
      </section>
 
      <section className={styles.profileInfo}>
        <div className={styles.main}>
          <h1 className={styles.username}>{data.user.name}</h1>
          <span>@{handle}</span>
          {data.user.bio && <p className={styles.bio}>{data.user.bio}</p>}
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
