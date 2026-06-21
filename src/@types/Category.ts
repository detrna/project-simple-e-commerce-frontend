export interface Category {
  name: string;
  subcategory?: Subcategory[];
}

export type Subcategory = {
  name: string;
};
