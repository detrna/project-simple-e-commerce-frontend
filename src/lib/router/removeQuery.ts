import { objectToSearchQuery } from "./objectToSearchQuery";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function removeQuery<T extends Record<string, any>>({
  router,
  currentQuery,
  key,
}: {
  router: AppRouterInstance;
  currentQuery: T;
  key: string;
}): void {
  const searchParams = objectToSearchQuery(currentQuery);

  searchParams.delete(key);

  router.push(`?${searchParams}`);
}
