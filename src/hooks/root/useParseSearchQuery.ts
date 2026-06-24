import queryURLToObject from "@/lib/queryURLToObject";
import { useSearchParams } from "next/navigation";

export default function useParseSearchQuery() {
  const searchParams: URLSearchParams = useSearchParams();
  const currentQuery = queryURLToObject(searchParams);

  return { searchParams, currentQuery };
}
