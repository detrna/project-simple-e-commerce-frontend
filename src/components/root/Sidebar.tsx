"use client";

import { Category } from "@/@types/Category";
import { ProductQueries } from "@/@types/ProductQueries";
import CategoryContainer from "./sidebar/CategoryContainer";
import SidebarContainer from "./sidebar/SidebarContainer";
import FilterContainer from "./sidebar/FilterContainer";

export type SidebarProps = {
  categories: Category[];
  filters: string[];
};

export function Sidebar({ categories, filters }: SidebarProps) {
  return (
    <div className="h-fullcreen fixed w-64">
      <div className="flex h-full w-[20vw] flex-col gap-4">
        <SidebarContainer
          header="CATEGORIES"
          component={CategoryContainer({ categories })}
        />
        <SidebarContainer
          header="FITLERS"
          component={FilterContainer({ filters })}
        />
      </div>
    </div>
  );
}
