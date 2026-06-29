import { observeScroll } from "@/lib/observeScroll";
import { useEffect, useRef, useState, useCallback } from "react";

export function useObserver(params: URLSearchParams) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const formattedParams = new URLSearchParams(params.toString());
  const [scrollTrigger, setScrollTrigger] = useState<number>(Date.now());

  const activateScroll = useCallback(() => {
    setScrollTrigger(Date.now());
  }, []);

  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget) return;

    const disconnect = observeScroll({
      activate: activateScroll,
      observerTarget: observerTarget,
    });

    return () => {
      if (disconnect) disconnect();
    };
  }, [formattedParams]);

  return { observerTarget, scrollTrigger };
}
