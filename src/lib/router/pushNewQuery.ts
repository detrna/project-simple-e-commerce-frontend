import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { objectToSearchQuery } from "./objectToSearchQuery";

export function pushNewQuery({
  router,
  currentQuery,
  newQuery,
}: {
  router: AppRouterInstance;
  currentQuery: Record<string, any>;
  newQuery: Record<string, any>;
}): void {
  const query: Record<string, any> = {
    ...currentQuery,
  };

  if (newQuery[Object.keys(newQuery)[0]] === "") return;

  query[Object.keys(newQuery)[0]] = newQuery[Object.keys(newQuery)[0]];

  const newSearchQuery = objectToSearchQuery(query);
  router.push(`?${newSearchQuery}`);
}
