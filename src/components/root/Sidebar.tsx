"use client";

import { Category } from "@/@types/Category";
import { CategoryContainer } from "./sidebar/CategoryContainer";
import { SidebarContainer } from "./sidebar/SidebarContainer";
import { FilterContainer } from "./sidebar/FilterContainer";
import { motion } from "motion/react";

export type SidebarProps = {
  categories: Category[];
  filters: string[];
};

export function Sidebar({ categories, filters }: SidebarProps) {
  return (
    <motion.div layout="position" className="fixed h-screen w-64">
      <div className="flex h-full w-[20vw] flex-col gap-4">
        <SidebarContainer
          header="CATEGORIES"
          component={<CategoryContainer categories={categories} />}
        />
        <motion.div layout="position">
          <SidebarContainer
            header="FITLERS"
            component={<FilterContainer filters={filters} />}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
