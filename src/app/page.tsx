"use client";

import React from "react";

import { ProductsList } from "@/components/root/ProductsList";
import { ScrollObserver } from "@/components/public/observer/ScrollObserver";
import { Sidebar } from "@/components/root/Sidebar";

import { useProduct } from "@/hooks/root/useProduct";
import { useObserver } from "@/hooks/root/useObserver";
import { useCategories } from "@/hooks/root/useCategories";
import { useParseSearchQuery } from "@/hooks/root/useParseSearchQuery";
import { SortField } from "@/components/root/SortField";

export default function Home() {
  const { searchParams } = useParseSearchQuery();
  const { observerTarget, scrollTrigger } = useObserver([searchParams]);
  const { products, productsLoading, hasMore } = useProduct({
    dependencies: [scrollTrigger],
  });
  const { categories, categoriesLoading } = useCategories();

  return (
    <div className="flex gap-8 p-8">
      <Sidebar categories={categories} filters={["Price", "Locations"]} />
      <div className="ml-[22vw] flex flex-1 flex-col gap-4">
        <SortField></SortField>

        <ProductsList products={products} />
        <ScrollObserver
          hasMore={hasMore.current}
          observerTarget={observerTarget as React.RefObject<HTMLDivElement>}
          loading={productsLoading}
        />
      </div>
    </div>
  );
}

// To do:
// Error Handling
