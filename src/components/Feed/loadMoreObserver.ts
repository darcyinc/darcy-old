/* eslint-disable promise/prefer-await-to-callbacks */

export default function loadMoreObserver(
  className: string,
  callback: () => void
) {
  const loadMore = document.querySelector(`.${className}`);
  if (!loadMore) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        callback();
        return;
      }
    }
  });

  observer.observe(loadMore!);
}
