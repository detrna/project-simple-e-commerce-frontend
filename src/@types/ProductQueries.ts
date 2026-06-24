import { Category } from "./Category";

export interface ProductQueries {
  category?: string;
  priceMin?: string;
  priceMax?: string;
  locations?: string[];
}
