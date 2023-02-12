export default function loadMoreObserver(
  className: string,
  callback: () => void
) {
  const loadMore = document.querySelector(`.${className}`);
  if (!loadMore) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
      }
    });
  });

  observer.observe(loadMore!);
}
