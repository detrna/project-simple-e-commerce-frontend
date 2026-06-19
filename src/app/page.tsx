"use client";

import { Product } from "@/@types/Product";
import { Item, itemDetails } from "@/components/Item";
import { Sidebar } from "@/components/Sidebar";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ResponseSchema } from "@/@types/Response";
import api from "@/lib/api";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  let hasMore = true;
  let cursor = "";

  function generateItems(products: Product[]): ReactNode {
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
      // 💡 Change 2: Use item.id instead of index 'i' for stable React list updates
      <Item className="w-[calc(25%-1rem)]" {...item} key={item.id} />
    ));

    return generatedItems;
  }

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = observerTarget.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchProducts(cursor);
        }
      },
      {
        rootMargin: "200px",
      },
    );

    if (target) {
      observer.observe(target);
    }
  }, []);

  async function fetchProducts(currentCursor: string): Promise<void> {
    if (!hasMore) return;
    try {
      setLoading(true);
      const res: ResponseSchema<Product[]> = await api.get(
        `/products?limit=8&cursor=${currentCursor}`,
      );

      console.log(res.meta.pagination);
      hasMore = res.meta.pagination!.hasMore ? true : false;
      cursor = res.meta.pagination!.cursor ?? "";
      setProducts((prev) => [...prev, ...res.data]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function log(): void {
    console.log(products);
    console.log(cursor);
  }

  return (
    <div className="flex gap-8 p-8">
      <div className="fixed w-64 h-screen">
        <Sidebar />
      </div>
      <div className="flex flex-col gap-4 ml-[22vw] flex-1">
        <div className="fixed right-8 bg-black-4 p-1 px-4 rounded-lg">
          <div className="flex w-full justify-end items-center gap-1 cursor-pointer">
            <p className="text-white-3 text-lg" onClick={() => log()}>
              SORT BY
            </p>
            <p className="text-white-3 text-[1.3rem]">⇌</p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap w-full gap-y-8 justify-between">
          {generateItems(products)}
        </div>

        {hasMore && (
          <div
            className="flex justify-center h-12 items-center"
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
