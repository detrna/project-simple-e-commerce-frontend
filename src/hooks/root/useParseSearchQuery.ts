import { queryURLToObject } from "@/lib/queryURLToObject";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function useParseSearchQuery<T>() {
  const searchParams: URLSearchParams = useSearchParams();
  const currentQuery: T = useMemo(
    () => queryURLToObject(searchParams),
    [searchParams],
  );

  return { searchParams, currentQuery };
}
