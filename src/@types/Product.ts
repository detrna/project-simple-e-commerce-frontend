import { Store } from "./Store";
import { Variant } from "./Variant";

export type Product = {
  id: string;
  name: string;
  category: Category;
  subcategory: Subcategory;
  createdAt: Date;
  store?: Store;
  variants: Variant[];
};
