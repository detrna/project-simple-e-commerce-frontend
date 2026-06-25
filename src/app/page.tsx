"use client";

import React, { createContext } from "react";

import { ScrollObserver } from "@/components/public/ScrollObserver";
import { BtnSort } from "@/components/root/BtnSort";
import ProductsList from "@/components/root/ProductsList";

import { ProductQueries } from "@/@types/ProductQueries";

import useProduct from "@/hooks/root/useProduct";
import useParseSearchQuery from "@/hooks/root/useParseSearchQuery";
import useObserver from "@/hooks/root/useObserver";
import { useCategories } from "@/hooks/root/useCategories";
import { Sidebar } from "@/components/root/Sidebar";

export type FilterContextTypes = {
  currentQuery: ProductQueries;
};
export const FilterContext = createContext<FilterContextTypes | null>(null);

export default function Home() {
  const { searchParams, currentQuery } = useParseSearchQuery<ProductQueries>();
  const { observerTarget, scrollTrigger } = useObserver({});
  const { products, productsLoading, hasMore } = useProduct({
    dependencies: [scrollTrigger],
    searchParams,
    currentQuery,
  });
  const { categories, categoriesLoading } = useCategories();

  return (
    <div className="flex gap-8 p-8">
      <FilterContext.Provider value={{ currentQuery }}>
        <Sidebar
          categories={categories}
          filters={["Price", "Rating", "Locations"]}
        />
      </FilterContext.Provider>
      <div className="ml-[22vw] flex flex-1 flex-col gap-4">
        <BtnSort
          log={() => {
            console.log(scrollTrigger);
          }}
        />

        <div className="mt-16 flex w-full flex-wrap justify-between gap-y-8">
          <ProductsList products={products} />
        </div>

        <ScrollObserver
          hasMore={hasMore.current}
          observerTarget={observerTarget as React.RefObject<HTMLDivElement>}
          loading={productsLoading}
        />
      </div>
    </div>
  );
}
