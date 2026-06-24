import { objectToMap } from "./objectToMap";
import { ProductQueries } from "../@types/ProductQueries";

export function objectToSearchQuery(
  objectQuery: ProductQueries,
): URLSearchParams {
  const filtered = objectToMap(objectQuery);

  const searchQuery = new URLSearchParams(filtered);

  return searchQuery;
}
