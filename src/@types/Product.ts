import { Subcategory } from "./Category";
import { Store } from "./Store";
import { Variant } from "./Variant";

export type Product = {
  id: string;
  name: string;
  subcategory: Subcategory;
  createdAt: Date;
  store?: Store;
  variants: Variant[];
  priceMin: number;
  sold: number;
};
