import { Category } from "./Category";

export interface ProductQueries {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  locations?: string[] | string;
}
