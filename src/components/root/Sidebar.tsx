"use client";

import { Category } from "@/@types/Category";
import { ProductQueries } from "@/@types/ProductQueries";
import CategoryContainer from "./sidebar/CategoryContainer";
import SidebarContainer from "./sidebar/SidebarContainer";
import FilterContainer from "./sidebar/FilterContainer";

export type SidebarProps = {
  categories: Category[];
  filters: string[];
  execute(filter: ProductQueries): void;
};

export function Sidebar({ execute, categories, filters }: SidebarProps) {
  return (
    <div className="h-fullcreen fixed w-64">
      <div className="flex h-full w-[20vw] flex-col gap-4">
        <button onClick={() => {}}>LOGGG</button>
        <SidebarContainer
          header="CATEGORIES"
          component={CategoryContainer({ categories, execute })}
        />
        <SidebarContainer
          header="FITLERS"
          component={FilterContainer({ filters, execute })}
        />
      </div>
    </div>
  );
}
