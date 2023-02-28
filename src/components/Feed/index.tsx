'use client';

import { createEffect, createSignal, onCleanup } from 'solid-js';
import styles from './index.module.scss';
import loadMoreObserver from './loadMoreObserver';

export default function Feed() {
  // eslint-disable-next-line solid/reactivity
  const [, setPosts] = createSignal(Array.from({ length: 2 }));

  let lastAutoFetch = 0;
  let timeout: NodeJS.Timeout | undefined;

  const loadMorePosts = () => {
    if (timeout) return;

    if (lastAutoFetch && Date.now() - lastAutoFetch < 2_000) {
      // If user is scrolling fast, wait 2 seconds before loading more posts.
      // This will make only one request to the server.
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        timeout = undefined;

        loadMorePosts();
      }, 2_000);
      return;
    }

    lastAutoFetch = Date.now();

    setPosts((posts) => [...posts, ...Array.from({ length: 5 })]);
  };

  createEffect(() => {
    // if the span element "load more" is visible, try to load more posts
    loadMoreObserver(styles.loadMore, loadMorePosts);

    // If user is at or near the bottom of the page, load more posts
    window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      )
        loadMorePosts();
    });
  });

  onCleanup(() => {
    if (timeout) clearTimeout(timeout);
  });

  return (
    <div class={styles.feed}>
      <span
        class={styles.loadMore}
        onClick={loadMorePosts}
        onKeyDown={loadMorePosts}
        role="button"
        tabIndex={0}
      >
        Clique para carregar mais posts
      </span>
    </div>
  );
}
