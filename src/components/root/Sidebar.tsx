"use client";

import { Category } from "@/@types/Category";
import { CategoryContainer } from "./sidebar/CategoryContainer";
import { SidebarContainer } from "./sidebar/SidebarContainer";
import { FilterContainer } from "./sidebar/FilterContainer";

export type SidebarProps = {
  categories: Category[];
  filters: string[];
};

export function Sidebar({ categories, filters }: SidebarProps) {
  return (
    <div className="fixed top-[10vh] left-0 z-10 h-screen w-64 p-4 shadow-md">
      <div className="flex h-full w-[20vw] flex-col gap-4">
        <SidebarContainer
          header="CATEGORIES"
          component={<CategoryContainer categories={categories} />}
        />
        <div>
          <SidebarContainer
            header="FITLERS"
            component={<FilterContainer filters={filters} />}
          />
        </div>
      </div>
    </div>
  );
}
