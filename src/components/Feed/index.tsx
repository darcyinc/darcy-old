"use client";

import loadMoreObserver from "./loadMoreObserver";

import FeedPost from "./FeedPost";
import FeedSorter from "./FeedSorter";
import PostComposer from "./PostComposer";

import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

export default function Feed() {
  const [posts, setPosts] = useState(Array.from({ length: 2 }));

  const lastAutoFetch = useRef<number | null>(null);
  const timeout = useRef<NodeJS.Timeout>();

  const loadMorePosts = useCallback(() => {
    if (timeout.current) return;

    if (lastAutoFetch.current && Date.now() - lastAutoFetch.current < 2000) {
      // If user is scrolling fast, wait 2 seconds before loading more posts.
      // This will make only one request to the server.
      timeout.current = setTimeout(() => {
        clearTimeout(timeout.current);
        timeout.current = undefined;

        loadMorePosts();
      }, 2000);
      return;
    }

    lastAutoFetch.current = Date.now();

    setPosts((posts) => [...posts, ...Array.from({ length: 5 })]);
  }, []);

  useEffect(() => {
    // if the span element "load more" is visible, try to load more posts
    loadMoreObserver(styles.loadMore, loadMorePosts);

    // If user is at or near the bottom of the page, load more posts
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      )
        loadMorePosts();
    });

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [loadMorePosts]);

  return (
    <div className={styles.feed}>
      <PostComposer />
      <FeedSorter />

      {posts.map((_, index) => (
        <FeedPost
          key={`post-${index}`}
          user={{
            name: "John Doe",
            handle: "johndoe",
            avatar: `https://i.pravatar.cc/150?img=${index}`,
          }}
          postContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nisl nisl eget nisl."
          postCreationDate={new Date()}
          postURL="/post/lorem-ipsum"
          likes={1}
          reposts={1}
          comments={1}
          data={{
            hasLiked: false,
            hasReposted: false,
          }}
        />
      ))}

      <span
        className={styles.loadMore}
        onClick={loadMorePosts}
        role="button"
        onKeyDown={loadMorePosts}
        tabIndex={0}
      >
        Clique para carregar mais posts
      </span>
    </div>
  );
}
