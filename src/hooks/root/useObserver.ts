import { observeScroll } from "@/lib/observeScroll";
import { useEffect, useRef, useState } from "react";

export default function useObserver({ dependencies }: { dependencies?: any }) {
  const observerTarget = useRef<HTMLDivElement>(null);

  const [scrollTrigger, setScrollTrigger] = useState<number>(Date.now());
  const activateScroll = (): void => {
    setScrollTrigger(Date.now());
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

  return { observerTarget, scrollTrigger };
}
