"use client";

import { Product } from "@/@types/Product";
import { Item, itemDetails } from "@/components/Item";
import { Sidebar } from "@/components/Sidebar";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ResponseSchema } from "@/@types/Response";
import api from "@/lib/api";
import { Category } from "@/@types/Category";
import { useSearchParams } from "next/navigation";
import { Filter } from "@/@types/Filters";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  let filtersTypes: string[] = ["Price", "Rating", "Location"];
  let hasMore = true;
  let cursor = "";

  const searchParams = useSearchParams();
  const filters: Filter = Object.fromEntries(searchParams.entries());
  let params = new URLSearchParams({
    ...filters,
  }).toString();

  // Fetch product

  const fetchProducts = async (): Promise<void> => {
    if (!hasMore) return;
    try {
      setLoading(true);

      console.log("fetching", params.toString());

      const res: ResponseSchema<Product[]> = await api.get(
        `/products?limit=8&cursor=${cursor}&${params}`,
      );

      if (res.data.length === 0) {
        hasMore = false;
        console.log("there is no data yet");
        return;
      }

      hasMore = res.meta.pagination!.hasMore ? true : false;
      cursor = res.meta.pagination!.cursor ?? "";
      setProducts((prev) => [...prev, ...res.data]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  //Fetch category
  const fetchCategories = async (): Promise<void> => {
    try {
      const response: ResponseSchema<Category[]> = await api.get("/categories");

      setCategories(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    cursor = "";
    hasMore = true;
    setProducts([]);
  }, [isFiltering]);

  const filter = (filter: Filter): void => {
    if (filters.category === filter.category && filter.category !== undefined) {
      const { category, ...rest } = filters;

      params = new URLSearchParams({
        ...rest,
      }).toString();

      if (Object.keys(rest).length === 0) {
        router.push("/");
        setIsFiltering(false);
        setProducts([]);
        fetchProducts();
        return;
      }

      router.push(`?${params}`);
    }

    if (filter.category !== filter) setProducts([]);

    if (isFiltering) {
      setIsFiltering(true);

      cursor = "";
      hasMore = true;
    }

    const newFilters: Filter = { ...filters, ...filter };

    params = new URLSearchParams({
      ...newFilters,
    }).toString();

    router.push(`?${params}`);
    fetchProducts();
  };

  //Observer
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = observerTarget.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchProducts();
        }
      },
      {
        rootMargin: "150px",
      },
    );

    if (target) {
      observer.observe(target);
    }
  }, []);

  //Generate jsxs
  const generateItems = (products: Product[]): ReactNode => {
    const items: itemDetails[] = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        image: "/item.jpg",
        store: product.store!.name,
        address: product.store!.address,
        price: product.variants[0].price,
        star: 5,
        sold: 5000,
      };
    });

    let generatedItems = items.map((item) => (
      <Item className="w-[calc(25%-1rem)]" {...item} key={item.id} />
    ));

    return generatedItems;
  };

  const log = (): void => {
    console.log(products);
    console.log(cursor);
  };

  return (
    <div className="flex gap-8 p-8">
      <div className="fixed h-screen w-64">
        <Sidebar
          categories={categories}
          filters={filtersTypes}
          filterFunction={filter}
        />
      </div>
      <div className="ml-[22vw] flex flex-1 flex-col gap-4">
        <div className="bg-black-4 fixed right-8 rounded-lg p-1 px-4">
          <div className="flex w-full cursor-pointer items-center justify-end gap-1">
            <p className="text-white-3 text-lg" onClick={() => log()}>
              SORT BY
            </p>
            <p className="text-white-3 text-[1.3rem]">⇌</p>
          </div>
        </div>

        <div className="mt-16 flex w-full flex-wrap justify-between gap-y-8">
          {generateItems(products)}
        </div>

        {hasMore && (
          <div
            className="flex h-12 items-center justify-center"
            ref={observerTarget}
          >
            {loading && (
              <p className="text-white-3 font-semibold">Loading items . . .</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
