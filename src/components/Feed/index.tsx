"use client";

import FeedPost from "./FeedPost";
import FeedSorter from "./FeedSorter";
import PostComposer from "./PostComposer";

import { useContext, useEffect, useRef, useState } from "react";
import { FeedSorterContext } from "@/hooks/FeedSorterProvider";

import styles from "./index.module.scss";

export default function Feed() {
  const [posts, setPosts] = useState(Array.from({ length: 2 }));
  const [willLoadMorePosts, setWillLoadMorePosts] = useState(false);

  const lastAutoFetch = useRef(Date.now());
  const timeout = useRef<NodeJS.Timeout>();

  const loadMorePosts = () => {
    if (Date.now() - lastAutoFetch.current < 2000) {
      return;
    }

    lastAutoFetch.current = Date.now();
    console.log("loading more posts");

    setPosts((posts) => [...posts, ...Array.from({ length: 5 })]);
  };

  console.log(useContext(FeedSorterContext).data);

  // if user is at or near the bottom of the page, load more posts
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 300
    ) {
      // If user is scrolling fast, wait 2 seconds before loading more posts.
      // This will make only one request to the server.

      if (!willLoadMorePosts) {
        loadMorePosts();
        setWillLoadMorePosts(true);
        return;
      }

      if (timeout.current) return;
      timeout.current = setTimeout(() => {
        setWillLoadMorePosts(false);
        loadMorePosts();

        clearTimeout(timeout.current);
        timeout.current = undefined;
      }, 2000);
    }
  });

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return (
    <div className={styles.feed}>
      <PostComposer />
      <FeedSorter />

      {posts.map((_, index) => (
        <FeedPost
          key={index}
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
