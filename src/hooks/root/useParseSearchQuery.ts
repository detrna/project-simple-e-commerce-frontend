import { queryURLToObject } from "@/lib/router/queryURLToObject";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useParseSearchQuery<T extends Record<string, any>>() {
  const searchParams: URLSearchParams = useSearchParams();
  const currentQuery: T = useMemo(
    () => queryURLToObject(searchParams),
    [searchParams],
  );

  return { searchParams, currentQuery };
}
