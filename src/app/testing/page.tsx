"use client";

import { useEffect, useRef } from "react";

export default function page() {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = observerTarget.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("test");
        }
      },
      {
        rootMargin: "200px",
      },
    );

    if (target) {
      observer.observe(target);
    }
  }, []);

  return (
    <div className="w-screen h-[200vh]">
      <p ref={observerTarget} className="absolute top-[190vh]">
        test
      </p>
    </div>
  );
}
