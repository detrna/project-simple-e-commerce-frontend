"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Sidebar } from "@/components/public/sidebar/Sidebar";
import { ScrollObserver } from "@/components/public/ScrollObserver";
import { BtnSort } from "@/components/root/BtnSort";
import ProductsList from "@/components/root/ProductsList";

import { objectToSearchQuery } from "@/lib/objectToSearchQuery";

import { ProductQueries } from "@/@types/ProductQueries";

import useProduct from "@/hooks/root/useProduct";
import useParseSearchQuery from "@/hooks/root/useParseSearchQuery";
import useObserver from "@/hooks/root/useObserver";
import { useCategories } from "@/hooks/root/useCategories";

export default function Home() {
  const router = useRouter();

  const { searchParams, currentQuery } = useParseSearchQuery();
  const { observerTarget, scroll } = useObserver({
    dependencies: [searchParams],
  });
  const { products, productsLoading, hasMore } = useProduct({
    dependencies: [scroll.current],
    searchParams,
    currentQuery,
  });
  const { categories, categoriesLoading } = useCategories();

  // Filter
  const checkCategory = (newQuery: any): boolean => {
    return (
      currentQuery.category === newQuery.category &&
      newQuery.category !== undefined
    );
  };

  const removeCategory = (router: any, currentQuery: any) => {
    const { category, ...rest } = currentQuery;
    const newSearchQuery = objectToSearchQuery(rest);

    if (Object.keys(rest).length === 0) {
      router.push("/");
      return;
    }
    router.push(`?${newSearchQuery}`);
  };

  const filter = (newQuery: ProductQueries): void => {
    if (checkCategory(newQuery)) {
      removeCategory(router, currentQuery);
      return;
    }

    const newSearchQuery = objectToSearchQuery({
      ...currentQuery,
      ...newQuery,
    });

    router.push(`?${newSearchQuery}`);
  };

  return (
    <div className="flex gap-8 p-8">
      <Sidebar
        categories={categories}
        filters={["Price, Rating, Locations"]}
        filterFunction={filter}
      />
      <div className="ml-[22vw] flex flex-1 flex-col gap-4">
        <BtnSort log={() => {}} />

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
