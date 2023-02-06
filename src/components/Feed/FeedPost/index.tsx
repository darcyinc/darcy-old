import Link from "next/link";
import React, { useCallback } from "react";
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
  postURL: string;

  likes: number;
  reposts: number;
  comments: number;

  data: {
    hasLiked: boolean;
    hasReposted: boolean;
  };
}

export default function FeedPost(props: FeedPostProps) {
  const isSpaceOrEnter = useCallback(
    (e: React.KeyboardEvent<HTMLOrSVGElement>) => {
      return ["Enter", " "].includes(e.key);
    },
    []
  );

  const handleUserSettingsClick = useCallback(
    (
      e:
        | React.MouseEvent<HTMLOrSVGElement>
        | React.KeyboardEvent<HTMLOrSVGElement>
    ) => {
      // @ts-expect-error
      if (!isSpaceOrEnter(e)) return;
    },
    [isSpaceOrEnter]
  );

  return (
    <div className={styles.post}>
      <div className={styles.user}>
        <img src={props.user.avatar} alt="User" height="50" width="50" />
        <div className={styles.userInfo}>
          <div className={styles.top}>
            <Link href={`/${props.user.handle}`}>{props.user.name}</Link>
            <BiDotsHorizontalRounded
              onClick={handleUserSettingsClick}
              onKeyDown={handleUserSettingsClick}
              role="button"
              tabIndex={0}
            />
          </div>

          <div className={styles.bottom}>
            <Link href={`/${props.user.handle}`}>@{props.user.handle}</Link>
            {/* TODO: handle dates client-side */}
            <span className={styles.date}>12h</span>
          </div>
        </div>
      </div>

      <article className={styles.postContent}>{props.postContent}</article>

      <div className={styles.socialButtons}>
        {/* Add data-liked attribute only if user has liked the post */}
        <div
          className={styles.likeButton}
          {...(props.data.hasLiked && { "data-liked": true })}
        >
          <AiOutlineHeart />
          <span>{props.likes}</span>
        </div>

        <div
          className={styles.shareButton}
          {...(props.data.hasReposted && { "data-shared": true })}
        >
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
