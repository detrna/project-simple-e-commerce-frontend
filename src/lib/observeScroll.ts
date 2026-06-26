import React from "react";

export function observeScroll({
  activate,
  observerTarget,
}: {
  activate: () => void;
  observerTarget: React.RefObject<HTMLDivElement | null>;
}): () => void {
  const target = observerTarget.current;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        activate();
      }
    },
    {
      rootMargin: "200px",
    },
  );

  if (target) {
    observer.observe(target);
  }

  return () => {
    observer.disconnect();
  };
}
