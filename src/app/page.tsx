"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { ScrollObserver } from "@/components/public/ScrollObserver";
import { BtnSort } from "@/components/root/BtnSort";
import ProductsList from "@/components/root/ProductsList";

import { objectToSearchQuery } from "@/lib/objectToSearchQuery";

import { ProductQueries } from "@/@types/ProductQueries";

import useProduct from "@/hooks/root/useProduct";
import useParseSearchQuery from "@/hooks/root/useParseSearchQuery";
import useObserver from "@/hooks/root/useObserver";
import { useCategories } from "@/hooks/root/useCategories";
import { Sidebar } from "@/components/root/Sidebar";

export type FilterContextTypes = {
  filterTrigger: (filter: ProductQueries) => void;
  currentQuery: ProductQueries;
};
export const FilterContext = createContext<FilterContextTypes | null>(null);

export default function Home() {
  const router = useRouter();

  const { searchParams, currentQuery } = useParseSearchQuery<ProductQueries>();
  const { observerTarget, scrollTrigger } = useObserver({});
  const { products, productsLoading, hasMore } = useProduct({
    dependencies: [scrollTrigger],
    searchParams,
    currentQuery,
  });
  const { categories, categoriesLoading } = useCategories();

  // Filter
  const checkDoubleCategory = (newQuery: ProductQueries): boolean => {
    return (
      currentQuery.category === newQuery.category &&
      newQuery.category !== undefined
    );
  };

  const removeCategory = () => {
    const { category, ...rest } = currentQuery;
    const newSearchQuery = objectToSearchQuery(rest);

    if (Object.keys(rest).length === 0) {
      router.push("/");
      return;
    }

    router.push(`?${newSearchQuery}`);
  };

  const removeLocations = () => {
    const { locations, ...rest } = currentQuery;
    const newSearchParams = objectToSearchQuery(rest);
    router.push(`?${newSearchParams}`);
  };

  const addLocations = (
    currentLocations: string[],
    newQuery: ProductQueries,
  ) => {
    const query: ProductQueries = {
      ...currentQuery,
      locations: [...currentLocations!, newQuery.locations as string],
    };

    const newSearchParams = objectToSearchQuery(query);
    router.push(`?${newSearchParams}`);
  };

  const handleLocations = (newQuery: ProductQueries): boolean => {
    if (!newQuery.locations || !currentQuery.locations) return false;

    const newLocation: string = newQuery.locations as string;
    const currentLocations = currentQuery.locations;
    const currentLocationsArray = Array.isArray(currentLocations)
      ? currentLocations
      : [currentLocations];

    const filteredQuery: ProductQueries = {
      ...currentQuery,
      locations: currentLocationsArray.filter((l) => l !== newLocation),
    };

    if (filteredQuery.locations?.length === 0) {
      removeLocations();
      return true;
    }

    const newLocationAdded =
      JSON.stringify(filteredQuery.locations) ===
      JSON.stringify(currentLocationsArray);

    if (newLocationAdded) {
      addLocations(currentLocationsArray, newQuery);
      return true;
    }

    const newSearchQuery = objectToSearchQuery(filteredQuery);
    router.push(`?${newSearchQuery}`);

    return true;
  };

  const filter = (newQuery: ProductQueries): void => {
    console.log(newQuery);

    if (checkDoubleCategory(newQuery)) {
      removeCategory();
      return;
    }

    if (handleLocations(newQuery)) return;

    const newSearchQuery = objectToSearchQuery({
      ...currentQuery,
      ...newQuery,
    });

    router.push(`?${newSearchQuery}`);
  };

  return (
    <div className="flex gap-8 p-8">
      <FilterContext.Provider value={{ filterTrigger: filter, currentQuery }}>
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
