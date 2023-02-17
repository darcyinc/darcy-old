'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BiCommentDetail, BiDotsHorizontalRounded } from "react-icons/bi";
import isSpaceOrEnter from "@/utils/isSpaceOrEnter";
import type { ClickOrKeyboardEvent } from "@/utils/isSpaceOrEnter";
import styles from "./index.module.scss";

type FeedPostProps = {
  comments: number;

  data: {
    hasLiked: boolean;
    hasReposted: boolean;
  };
  likes: number;
  postContent: string;

  postCreationDate: Date;
  postURL: string;
  reposts: number;

  user: {
    avatar: string;
    handle: string;
    name: string;
  };
}

export default function FeedPost(props: FeedPostProps) {
  const router = useRouter();

  const handleUserSettingsClick = useCallback((e: ClickOrKeyboardEvent) => {
    if (!isSpaceOrEnter(e)) return null;
  }, []);

  const handlePostLike = useCallback((e: ClickOrKeyboardEvent) => {
    if (!isSpaceOrEnter(e)) return null;
  }, []);

  const handlePostRepost = useCallback((e: ClickOrKeyboardEvent) => {
    if (!isSpaceOrEnter(e)) return null;
  }, []);

  const handlePostComment = useCallback(
    (e: ClickOrKeyboardEvent) => {
      if (!isSpaceOrEnter(e)) return;

      router.push(props.postURL);
    },
    [props.postURL, router]
  );

  return (
    <div className={styles.post}>
      <div className={styles.user}>
        <Link href={`/${props.user.handle}`}>
          <img
            alt="User"
            decoding="async"
            height="50"
            loading="lazy"
            src={props.user.avatar}
            width="50"
          />
        </Link>
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
          onClick={handlePostLike}
          onKeyDown={handlePostLike}
          role="button"
          tabIndex={0}
        >
          <AiOutlineHeart />
          <span>{props.likes}</span>
        </div>

        <div
          className={styles.shareButton}
          {...(props.data.hasReposted && { "data-shared": true })}
          onClick={handlePostRepost}
          onKeyDown={handlePostRepost}
          role="button"
          tabIndex={0}
        >
          <AiOutlineRetweet />
          <span>{props.reposts}</span>
        </div>

        <div
          className={styles.commentButton}
          onClick={handlePostComment}
          onKeyDown={handlePostComment}
          role="button"
          tabIndex={0}
        >
          <BiCommentDetail />
          <span>{props.comments}</span>
        </div>
      </div>
    </div>
  );
}
