import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BiCommentDetail, BiDotsHorizontalRounded } from "react-icons/bi";

import styles from "./index.module.scss";

interface FeedPostProps {
  user: {
    name: string;
    handle: string;
    avatar: string;
  };

  postContent: string;
  postCreationDate: Date;

  likes: number;
  reposts: number;
  comments: number;
}

export default function FeedPost(props: FeedPostProps) {
  return (
    <div className={styles.post}>
      <div className={styles.user}>
        <img src={props.user.avatar} alt="User" height="50" width="50" />
        <div className={styles.userInfo}>
          <div className={styles.top}>
            <span className={styles.name}>{props.user.name}</span>
            <BiDotsHorizontalRounded />
          </div>

          <div className={styles.bottom}>
            <span className={styles.handle}>@{props.user.handle}</span>
            {/* TODO: handle dates client-side */}
            <span className={styles.date}>12h</span>
          </div>
        </div>
      </div>

      <article className={styles.postContent}>{props.postContent}</article>

      <div className={styles.socialButtons}>
        <div className={styles.likeButton}>
          <AiOutlineHeart />
          <span>{props.likes}</span>
        </div>

        <div className={styles.shareButton}>
          <AiOutlineRetweet />
          <span>{props.reposts}</span>
        </div>

        <div className={styles.commentButton}>
          <BiCommentDetail />
          <span>{props.comments}</span>
        </div>
      </div>
    </div>
  );
}
