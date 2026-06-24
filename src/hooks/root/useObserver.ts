import { observeScroll } from "@/lib/observeScroll";
import { useEffect, useRef } from "react";

export default function useObserver({
  dependencies = [],
}: {
  dependencies: any;
}) {
  const observerTarget = useRef<HTMLDivElement>(null);

  const scroll = useRef<number>(0);
  const activateScroll = (): void => {
    scroll.current += 1;
  };

  useEffect(() => {
    if (observerTarget.current) {
      const disconnect = observeScroll({
        activate: () => activateScroll(),
        observerTarget: observerTarget as React.RefObject<HTMLDivElement>,
      });

      return () => {
        if (disconnect) disconnect();
      };
    }
  }, dependencies);

  return { observerTarget, scroll };
}
